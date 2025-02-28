import getRequestClient from "~/lib/getRequestClient";
import type { Route } from "./+types/poster";

export function loader({ params }: Route.LoaderArgs) {
  const posterId = Number(params.posterId);
  if (isNaN(posterId)) {
    throw new Error("Invalid poster ID");
  }

  return (async () => {
    const poster = await getRequestClient(undefined).product.getPoster(posterId);
    return poster;
  })();
}

export default function Poster({ loaderData }: Route.ComponentProps) {
  const { poster } = loaderData;

  return (
    <div className="w-full h-full flex items-center justify-around mt-8">
      <div className="w-[70%] flex flex-col items-center justify-center">
        <h1 className="text-6xl text-black text-left font-bold mb-2">{poster.name}</h1>
        <p className="italic text-lg">By: <span className="underline">{poster.artistFullName}</span></p>
        <img className="w-[50%] mt-4" src={poster.posterImageUrl} alt={poster.name} />
      </div>
      <div className="w-[30%] h-[80%] flex flex-col items-start">
        <h2 className="text-2xl font-semibold mb-6">Select size:</h2>

          {poster.formatPrices.map((formatPrice) => {
            return (
              <div key={formatPrice.id} className="w-[45%] flex items-center justify-between space-x-2 mt-4">
                  <p>{formatPrice.format}</p>
                  <button className="border border-black bg-white p-1 font-semibold drop-shadow-mg hover:cursor-pointer hover:scale-105 mt-2">Add to cart</button>
              </div>
            );
          })}
      </div>
    </div>
  );
}
