import type { Pokemon } from "~/types/pokemon";
import type { Route } from "./+types/posters";
import { Image } from "@heroui/react";



export function meta({}: Route.MetaArgs) {
  return [
    { title: "Posters - Antik Moderne" },
    { name: "description", content: "Posters" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  try {
    const pokeApiRes = await fetch("https://pokeapi.co/api/v2/pokemon/2");
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
  
  const pokemon = loaderData?.pokemon;

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center">
      <h2>{`${pokemon.name}`}</h2>
      <Image src={pokemon.sprites.front_default}/>
    </div>
  );
}
