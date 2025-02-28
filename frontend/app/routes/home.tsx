import type { Route } from "./+types/home";
import { Link, NavLink, redirect } from "react-router";
import getRequestClient from "~/lib/getRequestClient";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "~/components/ui/select";
import { useState } from "react";
import type { types } from "~/lib/client";

export function meta({}: Route.MetaArgs) {
  return [{ title: "ANTIK MODERNE" }, { name: "description", content: "Welcome to Antik Moderne!" }];
}

export function loader({}: Route.LoaderArgs) {
  return (async () => {
    const posters = await getRequestClient(undefined).product.getPosters();
    return posters;
  })();
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { posters } = loaderData;

  const [selectedFormats, setSelectedFormats] = useState<Record<string, types.FormatPriceDto>>({});

  const getCurrentFormatPrice = (posterId: number, formatPrices: types.FormatPriceDto[]): types.FormatPriceDto => {
    return selectedFormats[posterId] || formatPrices[0];
  };

  const handleViewPoster = (posterId: number) => {
    redirect(`/poster/${posterId}`);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="relative flex flex-col w-[95%] h-[700px]">
        <img key="poster-hero.jpg" src="/poster-hero.png" alt="poster-hero" className="w-full h-full object-cover" />
        <div className="absolute flex flex-col top-1/5 left-1/5">
          <h1 className="text-6xl text-white text-left font-bold mb-4">Welcome to Antik Moderne</h1>
          <p className=" pt-4 w-1/2 text-white text-left text-2xl mb-6">
            Discover a curated collection of timeless posters that blend the elegance of the past with the modern aesthetic.
          </p>
          <NavLink
            to="/posters"
            className="px-6 py-2 font-medium bg-white text-black w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
          >
            Shop Now →
          </NavLink>
        </div>
      </div>
      <div className="flex items-center w-[90%]">
        <h1 className="text-6xl text-black text-center font-bold mb-10 pt-10 mr-6">Featured Posters</h1>
        <NavLink to="/posters" className="hover:underline hover:cursor-pointer mt-2">
          See All →
        </NavLink>
      </div>
      <div className="grid grid-cols-3 gap-12 w-[90%]">
        {posters.slice(0, 3).map((poster) => {
          const currentFormatPrice = getCurrentFormatPrice(poster.id, poster.formatPrices);

          return (
            <Link
              to={`/poster/${poster.id}`}
              key={poster.id}
              className="w-[22rem] h-auto p-3 flex flex-col justify-center items-center rounded-lg hover:border hover:border-[#cfcfcf] hover:cursor-pointer"
            >
              <img src={poster.posterImageUrl} alt={poster.name} className="w-[95%] h-full rounded-lg" />
              <div className="flex justify-between w-[90%] pt-2">
                <div className="flex flex-col items-start">
                  <p className="font-semibold">{poster.name}</p>
                  <p className="italic">
                    <span className="font-semibold">Artist:</span> {poster.artistFullName}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex flex-col items-end">
                    <Select
                      onValueChange={(format) => {
                        const selectedFormat = poster.formatPrices.find((fp) => fp.format === format);
                        if (selectedFormat) {
                          setSelectedFormats((prev) => ({
                            ...prev,
                            [poster.id]: selectedFormat,
                          }));
                        }
                      }}
                      defaultValue={currentFormatPrice.format}
                    >
                      <SelectTrigger className="w-[60px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Formats:</SelectLabel>
                          {poster.formatPrices.map((formatPrice: types.FormatPriceDto) => (
                            <SelectItem key={formatPrice.format} value={formatPrice.format}>
                              {formatPrice.format}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <p className="italic text-right">{currentFormatPrice.price} dkk,-</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleViewPoster(poster.id)}
                className="border border-black bg-white p-2 font-semibold drop-shadow-mg hover:cursor-pointer hover:scale-105 mt-2"
              >
                View Poster →
              </button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
