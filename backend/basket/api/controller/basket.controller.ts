import { api, APIError } from "encore.dev/api";
import { getAuthData } from "~encore/auth";
import { BasketDto, BasketItemCreate } from "../../types/basket.interface";
import BasketService from "../service/basket.service";

export const getBasketUserId = api<{}, { basket: BasketDto }>(
    { auth: true, expose: true, method: "GET", path: "/basket-userid" },
    async (): Promise<{ basket: BasketDto }> => {
        const userId = getAuthData().userID;

        if (!userId) throw APIError.permissionDenied("userid is missing");

        const basket = await BasketService.findBasket({ userId });

        return { basket };
    }
);

export const getBasketByGuid = api<{ guid: string }, { basket: BasketDto }>(
    { auth: false, expose: true, method: "GET", path: "/basket-guid/:guid" }, // Path includes :guid
    async ({ guid }): Promise<{ basket: BasketDto }> => {

        console.log("HEY", guid);
        const basket = await BasketService.findBasket({ guid });

        return { basket };
    }
);

export const createBasketByUserId = api<{}, { basket: BasketDto }>(
    { auth: true, expose: true, method: "POST", path: "/basket-userid" },
    async (): Promise<{ basket: BasketDto }> => {
        const userId: string = getAuthData().userID;

        if (!userId) throw APIError.permissionDenied("userid is missing");

        console.log("CALLED", userId);

        return { basket: await BasketService.createBasket({ userId }) }
    }
);

export const createBasketByGuid = api<{ guid: string }, { basket: BasketDto }>(
    { auth: false, expose: true, method: "POST", path: "/basket-guid" },
    async ({ guid }): Promise<{ basket: BasketDto }> => {
        return { basket: await BasketService.createBasket({ guid }) };
    }
);

export const addItemToBasketByUserId = api<{ basketItemCreate: BasketItemCreate }, { basket: BasketDto }>(
    { auth: true, expose: true, method: "POST", path: "/basket-userid-add" },
    async ({ basketItemCreate }): Promise<{ basket: BasketDto }> => {
        const userId: string = getAuthData().userID;

        if (!userId) throw APIError.permissionDenied("userid is missing");

        return { basket: await BasketService.addItemToBasket({ userId }, basketItemCreate) }
    }
);

export const addItemToBasketByGuid = api<{ guid: string, basketItemCreate: BasketItemCreate }, { basket: BasketDto }>(
    { auth: false, expose: true, method: "POST", path: "/basket-guid-add" },
    async ({ guid, basketItemCreate }): Promise<{ basket: BasketDto }> => {
        return { basket: await BasketService.addItemToBasket({ guid }, basketItemCreate) };
    }
);

export const removeItemFromBasketByUserId = api<{ basketItemId: number }, { basket: BasketDto }>(
    { auth: true, expose: true, method: "DELETE", path: "/basket-userid-remove" },
    async ({ basketItemId }): Promise<{ basket: BasketDto }> => {
        const userId: string = getAuthData().userID;

        if (!userId) throw APIError.permissionDenied("userid is missing");

        return { basket: await BasketService.removeItemFromBasket({ userId }, basketItemId) }
    }
);

export const removeItemFromBasketByGuid = api<{ guid: string, basketItemId: number }, { basket: BasketDto }>(
    { auth: false, expose: true, method: "DELETE", path: "/basket-guid-remove" },
    async ({ guid, basketItemId }): Promise<{ basket: BasketDto }> => {
        return { basket: await BasketService.removeItemFromBasket({ guid }, basketItemId) };
    }
);