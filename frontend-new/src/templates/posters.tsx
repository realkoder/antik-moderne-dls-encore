import { useRef, useState } from "react";
import type { Pokemon } from "../types/pokemon";
import { useTheme } from "next-themes";
import { PokemonCard } from "@/components/PokemonCard";
import { Button } from "@/components/ui/button";

export default function PostersTemplate() {
  const { theme } = useTheme();
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const isLoading = useRef(false);

  const fetchPokemon = async (pokemonId: number) => {
    if (isLoading.current) return;
    isLoading.current = true;
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
      isLoading.current = false;
    }
  };

  const changePokemon = () => {
    const randomPokemonId = Math.floor(Math.random() * 1000);
    fetchPokemon(randomPokemonId);
  };

  return (
    <div
      className={`h-screen w-screen flex justify-center ${
        theme && theme === "dark" ? "bg-gray-700" : ""
      }`}
    >
      <Button onClick={() => changePokemon()}>Get a pokemon</Button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}
