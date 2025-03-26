import PosterService from "../../../product/api/poster/service/poster.service";
import { prismaBaskets } from "../../db/database";
import { BasketDto, BasketItemCreate } from "../../types/basket.interface";
import { APIError } from "encore.dev/api";

/**
 * BasketService
 * @public
 * 
 * The `BasketService` class provides methods for managing clients shopping baskets in an idempotent way.
 * It allows for creating, finding, adding items to, and removing items from baskets.
 * This service interacts with the database through Prisma and integrates with the `PosterService`
 * to fetch poster details associated with basket items.
 * 
 * @example
 * const basket = await basketService.createBasket({ userId: "123" });
 *
 */
const BasketService = {

    /**
    * Creates a new basket for signedin user or a guest.
    * If a basket already exists for the given userId or guid, it returns the existing basket.
    * 
    * @param {Object} identifier - The identifier for the basket.
    * @param {string} [identifier.userId] - The ID of the user that's signed in else `GUID` must be provided.
    * @param {string} [identifier.guid] - The GUID for guest users. Will not be needed if user is authenticated.
    * @returns {Promise<BasketDto>} The created or existing basket.
    * @throws {APIError} Throws an error if neither userId nor guid is provided.
    * @throws {APIError} Throws an error if there is an issue finding the basket.
    * 
    * @example
    * const basket = await basketService.createBasket({ userId: "123" });
    * // If the basket already exists, it will return the existing basket.
    * 
    * @example
    * const guestBasket = await basketService.createBasket({ guid: "guest-unique-id" });
    * // This creates a basket for a guest user.
    */
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


    /**
    * Finds a basket based on the provided userId or guid.
    * 
    * @param {Object} identifier - The identifier for the basket.
    * @param {string} [identifier.userId] - The ID of the user. This is optional for authenticated users.
    * @param {string} [identifier.guid] - The GUID for guest users. This is optional for unauthenticated users.
    * @returns {Promise<BasketDto>} The found basket, including its items with associated poster details.
    * @throws {APIError} Throws an error if the basket cannot be found.
    * @throws {Error} Throws an error if a poster associated with a basket item cannot be found.
    * 
    * @example
    * const basket = await basketService.findBasket({ userId: "123" });
    * // This retrieves the basket for the authenticated user.
    * 
    * @example
    * const guestBasket = await basketService.findBasket({ guid: "guest-unique-id" });
    * // This retrieves the basket for a guest user.
    */
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

    /**
    * Adds an item to the user's basket.
    * 
    * @param {Object} identifier - The identifier for the basket.
    * @param {string} [identifier.userId] - The ID of the user. This is optional for authenticated users.
    * @param {string} [identifier.guid] - The GUID for guest users. This is optional for unauthenticated users.
    * @param {BasketItemCreate} basketItemCreate - The item to add to the basket, including poster ID and quantity.
    * @returns {Promise<BasketDto>} The updated basket after adding the item.
    * @throws {APIError} Throws an error if neither userId nor guid is provided.
    * @throws {APIError} Throws an error if the basket cannot be found.
    * 
    * @example
    * const updatedBasket = await basketService.addItemToBasket(
    *   { userId: "123" },
    *   { posterId: 1, quantity: 2 }
    * );
    * // This adds an item to the authenticated user's basket.
    * 
    * @example
    * const guestUpdatedBasket = await basketService.addItemToBasket(
    *   { guid: "guest-unique-id" },
    *   { posterId: 2, quantity: 1 }
    * );
    * // This adds an item to the guest user's basket.
    */
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

    /**
    * Removes an item from the user's basket.
    * 
    * @param {Object} identifier - The identifier for the basket.
    * @param {string} [identifier.userId] - The ID of the user. This is optional for authenticated users.
    * @param {string} [identifier.guid] - The GUID for guest users. This is optional for unauthenticated users.
    * @param {number} basketItemId - The ID of the basket item to remove.
    * @returns {Promise<BasketDto>} The updated basket after removing the item.
    * @throws {APIError} Throws an error if neither userId nor guid is provided.
    * @throws {APIError} Throws an error if the basket cannot be found.
    * 
    * @example
    * const updatedBasket = await basketService.removeItemFromBasket(
    *   { userId: "123" },
    *   1
    * );
    * // This removes the item with ID 1 from the authenticated user's basket.
    * 
    * @example
    * const guestUpdatedBasket = await basketService.removeItemFromBasket(
    *   { guid: "guest-unique-id" },
    *   2
    * );
    * // This removes the item with ID 2 from the guest user's basket.
    */
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