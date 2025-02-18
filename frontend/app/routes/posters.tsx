import type { Pokemon } from "~/types/pokemon";
import type { Route } from "./+types/posters";
import { PokemonCard } from "~/components/PokemonCard";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { SpinnerRoundOutlined } from "spinners-react/lib/esm/SpinnerRoundOutlined";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Posters - Antik Moderne" },
    { name: "description", content: "Posters" },
  ];
}

// export async function loader({ params }: Route.LoaderArgs) {
//   try {
//     const pokeApiRes = await fetch("https://pokeapi.co/api/v2/pokemon/3");
//     if (pokeApiRes.ok) {
//       const pokemon: Pokemon = await pokeApiRes.json();
//       return { pokemon };
//     } else {
//       console.log("FETCH NOT OK");
//     }
//   } catch (error) {
//     console.log("FETCH NOT OK");
//   }
// }

// export default function Posters({ loaderData }: Route.ComponentProps) {
export default function Posters() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPokemon = async (pokemonId: number) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const pokeApiRes = await fetch(
        "https://pokeapi.co/api/v2/pokemon/" + pokemonId
      );
      if (pokeApiRes.ok) {
        const pokemon: Pokemon = await pokeApiRes.json();
        pokemon.id = pokemonId;
        setPokemons((cur) => [...cur, pokemon]);
      } else {
        console.log("FETCH NOT OK");
      }
    } catch (error) {
      console.log("FETCH NOT OK", error);
    } finally {
      setIsLoading(false);
    }
  };

  const changePokemon = () => {
    const randomPokemonId = Math.floor(Math.random() * 1000);
    fetchPokemon(randomPokemonId);
  };

  return (
    <div>
      <div className="p-4">
        <SpinnerRoundOutlined
          enabled={isLoading}
          size={50}
          thickness={100}
          speed={100}
          color="#36ad47"
        />
        <Button
          hidden={isLoading}
          className="m-2"
          onClick={() => changePokemon()}
        >
          Get a pokemon
        </Button>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      </div>
    </div>
  );
}
