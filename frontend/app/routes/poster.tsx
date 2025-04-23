import getRequestClient from "~/lib/getRequestClient";
import type { Route } from "./+types/poster";
import { CiShoppingBasket } from "react-icons/ci";
import useCart from "~/hooks/useCart";

export function loader({ params }: Route.LoaderArgs) {
  const posterId = Number(params.posterId);
  if (isNaN(posterId)) {
    throw new Error("Invalid poster ID");
  }

  return (async () => {
    const poster = await getRequestClient(undefined, true).product.getPoster(posterId);
    return poster;
  })();
}

export default function Poster({ loaderData }: Route.ComponentProps) {
  const { poster } = loaderData;
  const { addItemToCart } = useCart();

  return (
    <div className="w-full h-full flex items-center justify-around mt-8">
      <div className="w-[70%] flex flex-col items-center justify-center">
        <h1 className="text-6xl text-black text-left font-bold mb-2">{poster.title}</h1>
        <p className="italic text-lg">
          By: <span className="underline">{poster.artistFullName}</span>
        </p>
        <img className="w-[50%] mt-4" src={poster.posterImageUrl} alt={poster.title} />
      </div>
      <div className="w-[30%] h-[80%] flex flex-col items-start">
        <h2 className="text-2xl font-semibold mb-6">Select size:</h2>

        {poster.formatPrices.map((formatPrice) => {
          return (
            <div key={formatPrice.id} className="w-[65%] flex items-center justify-between space-x-2 mt-4">
              <p>{formatPrice.format}</p>
              <button
                onClick={() => {
                  addItemToCart({ posterId: poster.id, quantity: 1 });
                }}
                className="flex items-center justify-center border border-black p-1 hover:cursor-pointer hover:scale-105 mt-2 relative group h-8 w-28"
              >
                <CiShoppingBasket className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
                <span className="absolute transition-opacity duration-300 ease-in-out opacity-100 group-hover:opacity-0">
                  {formatPrice.price.toFixed(2)}.-
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
