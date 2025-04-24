import { api, APIError } from "encore.dev/api";
import { getAuthData } from "~encore/auth";
import { BasketDto, BasketItemCreate } from "../../types/basket.interface";
import BasketService from "../service/basket.service";

/**
 * Endpoint for receiving the basket.
 * It checks for the user ID using `getAuthData()`.
 * If the user is not signed in, a GUID is expected for idempotent handling of basket logic.
 * 
 * @param {Object} params - The parameters for the request.
 * @param {string} [params.guid] - The GUID of the basket, which is optional.
 * @returns {Promise<{ basket: BasketDto }>} The basket data.
 * 
 * ### @example
 * ```javascript
 * // Example request
 * GET /basket?guid=your-guid-here
 * ```
 */
export const getBasket = api<{ guid?: string }, { basket: BasketDto }>(
    { auth: false, expose: true, method: "GET", path: "/basket" },
    async ({ guid }): Promise<{ basket: BasketDto }> => {
        let userId: string | undefined;

        try {
            userId = getAuthData().userID;
        } catch (error) {
            console.error("Error getting the authData", error);
        }

        if (!userId && !guid) {
            throw APIError.invalidArgument("Either userId or guid must be provided");
        }

        const basket = await BasketService.findBasket({ userId, guid });

        if (!basket) {
            throw APIError.notFound("Basket not found");
        }

        return { basket };
    }
);

/**
 * Endpoint for creating a new basket.
 * 
 * It checks for the user ID using `getAuthData()`.
 * If the user is not signed in, a GUID is expected for idempotent handling of basket logic.
 * 
 * @param {Object} params - The parameters for the request.
 * @param {string} [params.guid] - The GUID of the basket. This is optional and is used for identifying the basket 
 *                                  when the user is not authenticated.
 * @returns {Promise<{ basket: BasketDto }>} A promise that resolves to the created basket data.
 * 
 * ### @example
 * ```javascript
 * // Example request to create a new basket
 * // POST /basket
 * // Content-Type: application/json
 * 
 * {
 *   "guid": "your-guid-here" // Optional GUID for the basket
 * }
 * ```
 * 
 * ### @example
 *  ```javascript
 * // Example response for a successful basket creation
 * {
 *   "basket": {
 *     "id": "new-basket-id",
 *     "items": [] // Initially empty basket
 *   }
 * }
 * ```
 * 
 * @throws {APIError.invalidArgument} If neither userId nor guid is provided.
 */
export const createBasket = api<{ guid?: string }, { basket: BasketDto }>(
    { auth: false, expose: true, method: "POST", path: "/basket" },
    async ({ guid }): Promise<{ basket: BasketDto }> => {
        let userId: string | undefined;

        try {
            userId = getAuthData().userID;
        } catch (error) {
            // console.error("Error getting the authData", error);
        }

        if (!userId && !guid) {
            throw APIError.invalidArgument("Either userId or guid must be provided");
        }

        const basket = await BasketService.createBasket({ userId, guid });

        return { basket };
    }
);

/**
 * Endpoint for adding an item to the client basket.
 * 
 * It checks for the user ID using `getAuthData()`.
 * If the user is not signed in, a GUID is expected for idempotent handling of basket logic.
 * 
 * @param {Object} params - The parameters for the request.
 * @param {string} [params.guid] - The GUID of the basket. This is optional and is used for identifying the basket 
 *                                  when the user is not authenticated.
 * @param {BasketItemCreate} params.basketItemCreate - The item to be added to the basket, containing details such as 
 *                                                     item ID and quantity.
 * @returns {Promise<{ basket: BasketDto }>} A promise that resolves to the updated basket data after the item is added.
 * 
 * @example
 * ```javascript
 * // Example request to add an item to the basket
 * POST /basket/add-item
 * Content-Type: application/json
 * 
 * {
 *   "guid": "your-guid-here", // Optional GUID for the basket
 *   "basketItemCreate": {
 *     "itemId": "item-id",     // ID of the item to add
 *     "quantity": 1            // Quantity of the item
 *   }
 * }
 * ```
 * 
 * @example
 * ```javascript
 * // Example response for a successful item addition
 * {
 *   "basket": {
 *     "id": "basket-id",
 *     "items": [
 *       {
 *         "itemId": "item-id",
 *         "quantity": 1
 *       }
 *     ]
 *   }
 * }
 * ```
 * 
 * @throws {APIError.invalidArgument} If neither userId nor guid is provided.
 */
export const addItemToBasket = api<{ guid?: string, basketItemCreate: BasketItemCreate }, { basket: BasketDto }>(
    { auth: false, expose: true, method: "POST", path: "/basket/add-item" },
    async ({ guid, basketItemCreate }): Promise<{ basket: BasketDto }> => {

        let userId: string | undefined;

        try {
            userId = getAuthData().userID;
        } catch (error) {
            console.error("Error getting the authData", error);
        }

        if (!userId && !guid) {
            throw APIError.invalidArgument("Either userId or guid must be provided");
        }

        return { basket: await BasketService.addItemToBasket({ userId, guid }, basketItemCreate) }
    }
);

/**
 * Endpoint for removing an item from the basket.
 * 
 * It checks for the user ID using `getAuthData()`.
 * If the user is not signed in, a GUID is expected for idempotent handling of basket logic.
 * 
 * @param {Object} params - The parameters for the request.
 * @param {string} [params.guid] - The GUID of the basket. This is optional and is used for identifying the basket 
 *                                  when the user is not authenticated.
 * @param {number} params.basketItemId - The ID of the item to be removed from the basket.
 * @returns {Promise<{ basket: BasketDto }>} A promise that resolves to the updated basket data after the item is removed.
 * 
 * @example
 * ```javascript
 * // Example request to remove an item from the basket
 * // DELETE /basket/remove-item
 * // Content-Type: application/json
 * 
 * {
 *   "guid": "your-guid-here", // Optional GUID for the basket
 *   "basketItemId": 123       // ID of the item to remove
 * }
 * ```
 * 
 * @example
 * ```javascript
 * // Example response for a successful item removal
 * {
 *   "basket": {
 *     "id": "basket-id",
 *     "items": [] // The item has been removed
 *   }
 * }
 * ```
 * 
 * @throws {APIError.invalidArgument} If neither userId nor guid is provided.
 */
export const removeItemFromBasket = api<{ guid?: string, basketItemId: number }, { basket: BasketDto }>(
    { auth: false, expose: true, method: "DELETE", path: "/basket/remove-item" },
    async ({ guid, basketItemId }): Promise<{ basket: BasketDto }> => {
        let userId: string | undefined;

        try {
            userId = getAuthData().userID;
        } catch (error) {
            console.error("Error getting the authData", error);
        }

        if (!userId && !guid) {
            throw APIError.invalidArgument("Either userId or guid must be provided");
        }

        return { basket: await BasketService.removeItemFromBasket({ userId, guid }, basketItemId) }
    }
);