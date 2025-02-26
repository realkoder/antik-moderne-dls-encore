import { TabContainer } from "~/components/admin/tabView/tabContainer";
import type { Route } from "./+types/admin";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Admin - Antik Moderne" }, { name: "description", content: "ADMIN STUFF ONLY" }];
}

export default function Admin() {
  return (
    <div className="p-4 px-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4">🗝️ ADMIN STUFF 🗝️</h1>
      <TabContainer />
    </div>
  );
}
