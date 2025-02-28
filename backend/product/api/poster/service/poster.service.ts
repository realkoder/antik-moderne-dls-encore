import { prismaProducts } from "../../../db/database";

import { Response } from "../../../../shared/types/api.interface";
import { Format, PosterCreate, PosterDto, PosterUpdate } from "../../../types/poster.interface";
import { Format as FormatEnum } from "@prisma-db-products/client";

const PosterService = {
    count: async (): Promise<number> => {
        return await prismaProducts.poster.count();
    },

    create: async (posterCreate: PosterCreate): Promise<Response> => {
        try {
            // const poster = await prismaProducts.$transaction(async (prisma) => {
            //     const createdPoster = await prisma.poster.create({ data: posterCreate });

            //     const formatPricePromises = posterCreate.formatPrices.map(formatPrice =>
            //         prisma.formatPrice.create({
            //             data: {
            //                 ...formatPrice,
            //                 format: mapTypeScriptToPrismaFormat(formatPrice.format),
            //                 posterId: createdPoster.id
            //             }
            //         })
            //     );

            //     await Promise.all(formatPricePromises);

            //     return createdPoster;
            // });

            const poster = await prismaProducts.$transaction(async (prisma) => {
                const createdPoster = await prisma.poster.create({
                    data: {
                        name: posterCreate.name,
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

            console.log("YOYO", poster);

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
                        name: posterUpdate.name,
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

    delete: async (posterId: number): Promise<Response> => {
        try {
            await prismaProducts.$transaction([
                prismaProducts.formatPrice.deleteMany({
                    where: { posterId: posterId },
                }),
                prismaProducts.poster.delete({
                    where: { id: posterId },
                }),
            ]);

            return {
                success: true,
                result: "Poster deleted successfully",
            };
        } catch (error) {
            return {
                success: false,
                message: "Poster not existing or delete operation failed",
            };
        }
    },
};


function mapPrismaFormatToTypeScript(prismaFormat: string): Format {
    const mapping: { [key: string]: Format } = {
        "A4": "A4",
        "Size_30X30_cm": "30X30 cm",
        "Size_30X40_cm": "30X40 cm",
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
        "30X30 cm": "Size_30X30_cm",
        "30X40 cm": "Size_30X40_cm",
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