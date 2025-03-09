import { api, APIError } from "encore.dev/api";
import { getAuthData } from "~encore/auth";
import { BasketDto, BasketItemCreate } from "../../types/basket.interface";
import BasketService from "../service/basket.service";

export const getBasket = api<{ guid?: string }, { basket: BasketDto }>(
    { auth: false, expose: true, method: "GET", path: "/basket" },
    async ({ guid }): Promise<{ basket: BasketDto }> => {
        let userId: string | undefined;

        try {
            userId = getAuthData().userID;
            console.log("HEY GOT USERID", userId);
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

export const createBasket = api<{ guid?: string }, { basket: BasketDto }>(
    { auth: false, expose: true, method: "POST", path: "/basket" },
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

        const basket = await BasketService.createBasket({ userId, guid });

        return { basket };
    }
);

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