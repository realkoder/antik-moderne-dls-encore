import { TabContainer } from "~/components/admin/tabView/tabContainer";

import getRequestClient from "~/lib/getRequestClient";
import type { Route } from "./+types/admin";
import { useAtom } from "jotai";
import { postersAtom } from "~/atoms/postersAtom";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Admin - Antik Moderne" }, { name: "description", content: "ADMIN STUFF ONLY" }];
}

export function loader({}: Route.LoaderArgs) {
  return (async () => {
    const posters = await getRequestClient(undefined).product.getPosters();
    return posters;
  })();
}

export default function Admin({ loaderData }: Route.ComponentProps) {
  const { posters: fetchedPosters } = loaderData;
  const [posters, setPosters] = useAtom(postersAtom);

  useEffect(() => {
    if (posters.length > 0) return;
    if (fetchedPosters) {
      setPosters(fetchedPosters);
    }
  }, [fetchedPosters, setPosters]);

  return (
    <div className="p-4 px-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4">🗝️ ADMIN STUFF 🗝️</h1>
      <TabContainer />
    </div>
  );
}
