import type { Pokemon } from "~/types/pokemon";
import type { Route } from "./+types/posters";
import { useTheme } from "next-themes";
import { PokemonCard } from "~/components/PokemonCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Posters - Antik Moderne" },
    { name: "description", content: "Posters" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  try {
    const pokeApiRes = await fetch("https://pokeapi.co/api/v2/pokemon/3");
    if (pokeApiRes.ok) {
      const pokemon: Pokemon = await pokeApiRes.json();
      return { pokemon };
    } else {
      console.log("FETCH NOT OK");
    }
  } catch (error) {
    console.log("FETCH NOT OK");
  }
}

export default function Posters({ loaderData }: Route.ComponentProps) {
  const { theme } = useTheme();
  const pokemon = loaderData?.pokemon;

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={`h-screen w-screen flex justify-center ${
        theme && theme === "dark" ? "bg-gray-700" : "bg-amber-50"
      }`}
    >
      <PokemonCard pokemon={pokemon} />
    </div>
  );
}
