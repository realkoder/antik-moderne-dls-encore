import PosterService from "../../../product/api/poster/service/poster.service";
import { prismaBaskets } from "../../db/database";
import { BasketDto, BasketItemCreate } from "../../types/basket.interface";
import { APIError } from "encore.dev/api";

const BasketService = {

    createBasket: async (identifier: { userId?: string; guid?: string }): Promise<BasketDto> => {
        if (!identifier.userId && !identifier.guid) {
            throw APIError.invalidArgument("Either userId or guid must be provided");
        }

        // Always check for already existing client basket
        try {
            const basket = await BasketService.findBasket(identifier);
            if (basket) {
                return basket;
            }
        } catch (error) {
            console.error("Error caught finding basket, now trying to create basket", error);
        }


        await prismaBaskets.basket.create({
            data: {
                userId: identifier.userId || null,
                guid: identifier.guid || null,
            },
        });

        return await BasketService.findBasket(identifier);
    },

    findBasket: async (identifier: { userId?: string; guid?: string }): Promise<BasketDto> => {
        const basket = await prismaBaskets.basket.findFirst({
            where: {
                OR: [
                    { userId: identifier.userId },
                    { guid: identifier.guid }
                ],
            },
            include: {
                basketItems: true
            },
        });

        if (!basket) throw APIError.aborted("Something went wrong finding basket");

        if (basket.basketItems && basket.basketItems.length > 0) {
            const basketItemsWithPosters = await Promise.all(basket.basketItems.map(async (item) => {
                const poster = await PosterService.findOne(item.posterId);
                if (!poster) {
                    throw new Error(`Poster with ID ${item.posterId} not found`);
                }
                return {
                    ...item,
                    poster,
                };
            }));
            return {
                ...basket,
                basketItems: basketItemsWithPosters,
            };
        }

        return {
            ...basket,
            basketItems: [],
        };

    },

    addItemToBasket: async (identifier: { userId?: string; guid?: string }, basketItemCreate: BasketItemCreate): Promise<BasketDto> => {
        if (!identifier.userId && !identifier.guid) {
            throw APIError.invalidArgument("Either userId or guid must be provided");
        }

        const basket = await BasketService.findBasket(identifier);

        await prismaBaskets.basketItem.create({
            data: {
                basketId: basket.id,
                posterId: basketItemCreate.posterId,
                quantity: basketItemCreate.quantity,
            }
        })

        return await BasketService.findBasket(identifier);
    },

    removeItemFromBasket: async (identifier: { userId?: string; guid?: string }, basketItemId: number): Promise<BasketDto> => {
        if (!identifier.userId && !identifier.guid) {
            throw APIError.invalidArgument("Either userId or guid must be provided");
        }

        const basket = await BasketService.findBasket(identifier);

        await prismaBaskets.basketItem.delete({
            where: {
                basketId: basket.id,
                id: basketItemId
            }
        })

        return await BasketService.findBasket(identifier);
    }
};

export default BasketService;