import type { Pokemon } from "~/types/pokemon";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";

interface PokemonCardProps {
  pokemon: Pokemon;
}

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  return (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle>Pokemon {pokemon.name}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Push Notifications
            </p>
            <p className="text-sm text-muted-foreground">
              Send notifications to device.
            </p>
            <img
              src={pokemon.sprites.front_default}
              height={60}
              width={60}
              alt="Pokemon"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p>{pokemon.abilities[0].ability.name || "No ability"}</p>
      </CardFooter>
    </Card>
  );
};
