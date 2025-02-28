import type { types } from "~/lib/client";
import { MdRemoveCircle } from "react-icons/md";
import { useSetAtom } from "jotai";
import { cartPostersAtom } from "~/atoms/cartPostersAtom";

interface CartItemProps {
  poster: types.PosterDto;
}

export const CartItem = ({ poster }: CartItemProps) => {
    const setCartPosters = useSetAtom(cartPostersAtom);

  return (
    <div className="relative flex items-center justify-start w-full mt-2">
      <MdRemoveCircle onClick={() => setCartPosters(cur => [...cur.filter(cartPoster => cartPoster.id !== poster.id)])} className="absolute -left-1 -top-1 bg-white rounded-full w-4 h-4 text-red-500 cursor-pointer font-semibold z-50" />
      <img src={poster.posterImageUrl} alt={poster.title} className="rounded-md w-12 h-12" />
      <div className="flex flex-col items-start justify-start w-full ml-2">
        <h2 className="text-sm font-semibold">{poster.title}</h2>
        <h2 className="text-sm">Format</h2>
      </div>
      <p className="text-xs">Price {poster.formatPrices[0].price} DKK,-</p>
    </div>
  );
};
