import { useTheme } from "next-themes";
import type { Route } from "./+types/genres";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Genres - Antik Moderne" },
    { name: "description", content: "Posters by genre" },
  ];
}

export default function Genres() {
  const { theme } = useTheme();
  
  return (
    <div className={`h-screen w-screen ${theme && theme === "dark" ? "bg-gray-700" : ""}`}>
      <h1 className="text-4xl font-bold mb-4">Browse Posters by Genre</h1>
    </div>
  );
}
