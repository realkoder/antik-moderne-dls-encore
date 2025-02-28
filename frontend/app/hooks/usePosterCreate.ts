import { useSetAtom } from "jotai";
import { useState } from "react";
import { postersAtom } from "~/atoms/postersAtom";
import type { types } from "~/lib/client";
import useAuthFetch from "./useAuthFetch";
import { toast } from "sonner";

const defaultPoster: types.PosterCreate = {
    name: "",
    artistFullName: "",
    posterImageUrl: "",
    formatPrices: [],
};


export const usePosterCreate = (changeTabTo: (tab: string) => void) => {
    const setPosters = useSetAtom(postersAtom);
    const [posterCreate, setPosterCreate] = useState<types.PosterCreate>(defaultPoster);
    const [format, setFormat] = useState<types.Format | null>();
    const [price, setPrice] = useState(1000);
    const [isCreating, setIsCreating] = useState(false);

    const { authRequestClient } = useAuthFetch();

    const onAddFormatPrice = () => {
        if (!format) return;
        setPosterCreate((cur) => ({ ...cur, formatPrices: [...cur.formatPrices, { format: format, price: price }] }));
        setPrice(1000);
        setFormat(null);
    };

    const onRemoveFormatPrice = (format: types.Format) => {
        if (!format) return;
        setPosterCreate((cur) => ({ ...cur, formatPrices: [...cur.formatPrices.filter((formatPrice) => formatPrice.format !== format)] }));
    };

    const onAddCreatePoster = async () => {
        if (!isPosterCreationValid(posterCreate)) return;

        setIsCreating(true);
        const response = await authRequestClient?.product.createPoster({ posterCreate });
        if (response && response.posters) setPosters(response.posters);
        setIsCreating(false);
        changeTabTo("products");
    };

    function triggerToaster(description: string) {
        toast("Failed to create poster", {
            description,
        });
    }

    const isPosterCreationValid = (posterCreate: types.PosterCreate) => {
        if (posterCreate.artistFullName.length === 0) {
            triggerToaster("Artist name for the poster is missing");
            return false;
        } else if (posterCreate.name.length === 0) {
            triggerToaster("Poster name is missing");
            return false;
        } else if (posterCreate.formatPrices.length === 0) {
            triggerToaster("At least one format with price have to be defined");
            return false;
        }
        return true;
    }

    return { posterCreate, onAddFormatPrice, price, setPrice, onRemoveFormatPrice, setFormat, onAddCreatePoster, setPosterCreate, isCreating };
}