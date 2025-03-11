import { prismaProducts } from "../../../db/database";

import { Response } from "../../../../shared/types/api.interface";
import { Format, PosterCreate, PosterDto, PosterUpdate } from "../../../types/poster.interface";
import { Format as FormatEnum, RemovedPoster } from "@prisma-db-products/client";

const PosterService = {
    create: async (posterCreate: PosterCreate): Promise<Response> => {
        try {
            await prismaProducts.$transaction(async (prisma) => {
                const createdPoster = await prisma.poster.create({
                    data: {
                        title: posterCreate.title,
                        artistFullName: posterCreate.artistFullName,
                        posterImageUrl: posterCreate.posterImageUrl,
                        formatPrices: {
                            create: posterCreate.formatPrices.map(({ format, price }) => ({
                                format: mapTypeScriptToPrismaFormat(format),
                                price,
                            })),
                        },
                    },
                });

                return createdPoster;
            });

            return {
                success: true,
                message: "Product created",
            };
        } catch (error) {
            console.error("Transactional usercreation failed: ", error);

            return {
                success: false,
                message: "Error with adding new poster",
            };
        }
    },

    update: async (id: number, posterUpdate: PosterUpdate): Promise<Response> => {
        try {
            await prismaProducts.$transaction(async (prisma) => {
                const existingFormatPrices = await prisma.formatPrice.findMany({
                    where: { posterId: id },
                });

                const existingFormatPriceIds = existingFormatPrices.map(fp => fp.id);

                const providedFormatPriceIds = posterUpdate.formatPrices
                    .filter(fp => fp.id !== undefined)
                    .map(fp => fp.id);

                const formatPriceIdsToDelete = existingFormatPriceIds.filter(id => !providedFormatPriceIds.includes(id));

                await Promise.all(formatPriceIdsToDelete.map(id =>
                    prisma.formatPrice.delete({ where: { id } })
                ));

                const formatPriceUpdates = posterUpdate.formatPrices.map(formatPrice => {
                    if (formatPrice.id) {
                        return prisma.formatPrice.update({
                            where: { id: formatPrice.id },
                            data: {
                                format: mapTypeScriptToPrismaFormat(formatPrice.format),
                                price: formatPrice.price,
                            },
                        });
                    } else {
                        return prisma.formatPrice.create({
                            data: {
                                format: mapTypeScriptToPrismaFormat(formatPrice.format),
                                price: formatPrice.price,
                                posterId: id,
                            },
                        });
                    }
                });

                await Promise.all(formatPriceUpdates);

                await prisma.poster.update({
                    where: { id: id },
                    data: {
                        title: posterUpdate.title,
                        artistFullName: posterUpdate.artistFullName,
                    },
                });
            });

            return {
                success: true,
                message: "Poster updated successfully."
            };
        } catch (error) {
            console.error("Error thrown while updating", error);
            return {
                success: false,
                message: "Error updating poster",
            };
        }
    },

    findAll: async (): Promise<PosterDto[]> => {
        const posters = await prismaProducts.poster.findMany({
            include: {
                formatPrices: true, // Eager load the formatPrices relation
            },
        });

        const postersWithFormattedPrices = posters.map(poster => ({
            ...poster,
            formatPrices: poster.formatPrices.map(formatPrice => ({
                ...formatPrice,
                format: mapPrismaFormatToTypeScript(formatPrice.format),
            })),
        }));

        return postersWithFormattedPrices;
    },

    findOne: async (id: number): Promise<PosterDto | null> => {
        const poster = await prismaProducts.poster.findFirst({
            where: { id: id },
            include: { formatPrices: true }
        });

        if (!poster) {
            return null;
        }

        const formatPricesFixed = poster.formatPrices.map(formatPrice => ({ ...formatPrice, format: mapPrismaFormatToTypeScript(formatPrice.format) }))

        return { ...poster, formatPrices: formatPricesFixed };
    },

    // delete: async (posterId: number): Promise<Response> => {
    //     try {
    //         await prismaProducts.$transaction([
    //             prismaProducts.formatPrice.deleteMany({
    //                 where: { posterId: posterId },
    //             }),
    //             prismaProducts.poster.delete({
    //                 where: { id: posterId },
    //             }),
    //         ]);

    //         return {
    //             success: true,
    //             result: "Poster deleted successfully",
    //         };
    //     } catch (error) {
    //         return {
    //             success: false,
    //             message: "Poster not existing or delete operation failed",
    //         };
    //     }
    // },

    delete: async (posterId: number): Promise<Response> => {
        try {
            await prismaProducts.$transaction(async (prisma) => {
                const poster = await prisma.poster.findUnique({
                    where: { id: posterId },
                    include: { formatPrices: true },
                });

                if (!poster) {
                    throw new Error("Poster not found");
                }

                for (const formatPrice of poster.formatPrices) {
                    await prisma.removedFormatPrice.create({
                        data: {
                            format: formatPrice.format,
                            price: formatPrice.price,
                            posterId: formatPrice.posterId,
                        },
                    });
                }

                await prisma.removedPoster.create({
                    data: {
                        posterId: poster.id,
                        title: poster.title,
                        artistFullName: poster.artistFullName,
                        posterImageUrl: poster.posterImageUrl,
                    },
                });

                await prisma.formatPrice.deleteMany({
                    where: { posterId: posterId },
                });

                await prisma.poster.delete({
                    where: { id: posterId },
                });
            });

            return {
                success: true,
                message: "Poster moved to RemovedPoster and deleted successfully",
            };
        } catch (error) {
            console.error("Error moving poster to RemovedPoster", error);
            return {
                success: false,
                message: "Error moving poster to RemovedPoster",
            };
        }
    },

    restorePoster: async (posterId: number): Promise<Response> => {
        try {
            await prismaProducts.$transaction(async (prisma) => {
                const removedPoster = await prisma.removedPoster.findFirst({
                    where: { posterId: posterId },
                });

                if (!removedPoster) {
                    throw new Error("Removed poster not found");
                }

                await prisma.poster.create({
                    data: {
                        id: removedPoster.posterId,
                        title: removedPoster.title,
                        artistFullName: removedPoster.artistFullName,
                        posterImageUrl: removedPoster.posterImageUrl,
                    },
                });

                const removedFormatPrices = await prisma.removedFormatPrice.findMany({
                    where: { posterId: posterId },
                });

                for (const removedFormatPrice of removedFormatPrices) {
                    await prisma.formatPrice.create({
                        data: {
                            format: removedFormatPrice.format,
                            price: removedFormatPrice.price,
                            posterId: removedFormatPrice.posterId,
                        },
                    });
                }

                await prisma.removedPoster.delete({
                    where: { id: removedPoster.id },
                });

                await prisma.removedFormatPrice.deleteMany({
                    where: { posterId: posterId },
                });
            });

            return {
                success: true,
                message: "Poster restored successfully",
            };
        } catch (error) {
            console.error("Error restoring poster", error);
            return {
                success: false,
                message: "Error restoring poster",
            };
        }
    },

    getRemovedPoster: async (posterId: number): Promise<RemovedPoster | null> => {
        try {
            return await prismaProducts.removedPoster.findFirst({
                where: { posterId }
            });

        } catch (e) {
            console.error("Error with retrieving ", e)
            return null;
        }
    }
};


function mapPrismaFormatToTypeScript(prismaFormat: string): Format {
    const mapping: { [key: string]: Format } = {
        "A4": "A4",
        "Size_30x30_cm": "30x30 cm",
        "Size_30x40_cm": "30x40 cm",
        "Size_50x50": "50x50",
        "Size_50x70_cm": "50x70 cm",
        "Size_70x70_cm": "70x70 cm",
        "Size_70x100_cm": "70x100 cm",
        "Size_100x100_cm": "100x100 cm",
        "Size_100x140_cm": "100x140 cm",
    };
    return mapping[prismaFormat] || prismaFormat as Format;
}

function mapTypeScriptToPrismaFormat(typeScriptFormat: Format): FormatEnum {
    const mapping: { [key in Format]: FormatEnum } = {
        "A4": "A4",
        "30x30 cm": "Size_30x30_cm",
        "30x40 cm": "Size_30x40_cm",
        "50x50": "Size_50x50",
        "50x70 cm": "Size_50x70_cm",
        "70x70 cm": "Size_70x70_cm",
        "70x100 cm": "Size_70x100_cm",
        "100x100 cm": "Size_100x100_cm",
        "100x140 cm": "Size_100x140_cm",
    };
    return mapping[typeScriptFormat] as FormatEnum;
}

export default PosterService;