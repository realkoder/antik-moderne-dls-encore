import type { Route } from "./+types/genres";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Genres - Antik Moderne" },
    { name: "description", content: "Posters by genre" },
  ];
}

export default function Genres() {
  return (
    <div className="border-2 border-solid">
      <h1 className="text-4xl font-bold mb-4">Browse Posters by Genre</h1>
    </div>
  );
}
