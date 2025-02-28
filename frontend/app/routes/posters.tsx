import { useAtom } from "jotai";
import type { Route } from "./+types/posters";
import getRequestClient from "~/lib/getRequestClient";
import { postersAtom } from "~/atoms/postersAtom";
import { useEffect } from "react";
import { PosterDisplayer } from "~/components/posters/postersDisplayer";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Posters - Antik Moderne" }, { name: "description", content: "Posters" }];
}

export function loader({}: Route.LoaderArgs) {
  return (async () => {
    const posters = await getRequestClient(undefined).product.getPosters();
    return posters;
  })();
}

// export default function Posters({ loaderData }: Route.ComponentProps) {
export default function Posters({ loaderData }: Route.ComponentProps) {
  const { posters: fetchedPosters } = loaderData;
  const [posters, setPosters] = useAtom(postersAtom);

  useEffect(() => {
    if (posters.length > 0) return;
    if (fetchedPosters) {
      setPosters(fetchedPosters);
    }
  }, [fetchedPosters, setPosters]);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="text-6xl font-bold mb-4">Antik Moderne Posters</h1>
      <p className=" text-2xl mb-6">
        Discover a curated collection of timeless posters that blend the elegance of the past with the modern aesthetic.
      </p>
      <PosterDisplayer />
    </div>
  );
}
