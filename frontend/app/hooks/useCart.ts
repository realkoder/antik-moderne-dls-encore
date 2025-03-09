import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useAtom } from "jotai";
import { cartAtom } from "~/atoms/cartAtom";
import getRequestClient from "~/lib/getRequestClient";
import { type types } from "~/lib/client";
import useAuthFetch from "./useAuthFetch";
import { useAuth } from "@clerk/react-router";

const useCart = () => {
    const { authRequestClient } = useAuthFetch();
    const { userId } = useAuth();
    const [guid, setGuid] = useState<string | null>();
    const [cart, setCart] = useAtom(cartAtom);

    useEffect(() => {
        let localstorageGuid = localStorage.getItem("cartguid")
        if (!localstorageGuid) {
            const generatedGuid = uuidv4();
            localStorage.setItem("cartguid", generatedGuid);
        }
        setGuid(localstorageGuid);

        if (cart && cart.userId === userId) return;
        (async () => {
            if (authRequestClient && userId) {
                const response = await authRequestClient.basket.createBasketByUserId();
                if (response) {
                    setCart(response.basket);
                }
            } else {
                if (localstorageGuid) {
                    const response = await getRequestClient(undefined).basket.createBasketByGuid({ guid: localstorageGuid });
                    if (response) {
                        setCart(response.basket);
                    }
                }
            }
        })();
    }, [authRequestClient]);

    const addItemToCart = async (basketItemCreate: types.BasketItemCreate) => {
        let response;
        if (userId) {
            if (!authRequestClient) return;
            response = await authRequestClient.basket.addItemToBasketByUserId({ basketItemCreate });
        } else {
            console.log("GUID", guid);
            if (guid) {
                response = await getRequestClient(undefined).basket.addItemToBasketByGuid({ guid, basketItemCreate });
            }
        }

        if (response && response.basket) {
            setCart(response.basket);
        }
    }

    const removeItemFromCart = async (cartItemId: number) => {
        let response;
        if (userId) {
            if (!authRequestClient) return;
            response = await authRequestClient.basket.removeItemFromBasketByUserId({ basketItemId: cartItemId });
        } else {
            const guid = localStorage.getItem("cartguid");
            console.log("GUID", guid);
            if (guid) {
                response = await getRequestClient(undefined).basket.removeItemFromBasketByGuid({ guid, basketItemId: cartItemId });
            }
        }

        if (response && response.basket) {
            setCart(response.basket);
        }
    }

    return { addItemToCart, removeItemFromCart };
}

export default useCart;