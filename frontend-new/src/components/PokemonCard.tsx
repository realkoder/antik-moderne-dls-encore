import { Card, Image } from "@chakra-ui/react";
import type { Pokemon } from "../types/pokemon";

interface PokemonCardProps {
  pokemon: Pokemon;
}

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  return (
    <div className="">
      <Card.Root m={4}>
        <Card.Body gap="2">
          <Card.Title mt="2">{pokemon.name}</Card.Title>
          <Card.Description>{pokemon.name}</Card.Description>
          <Image src={pokemon.sprites.front_default} alt="Pokemon" />
          <p>ID {pokemon.id}</p>
        </Card.Body>
        <Card.Footer justifyContent="flex-end">
          {/* <Button onClick={() => changePokemon(pokemon.id + 1)}>Next</Button> */}
          <p>{pokemon.abilities[0].ability.name || "No ability"}</p>
        </Card.Footer>
      </Card.Root>
    </div>
  );
};
