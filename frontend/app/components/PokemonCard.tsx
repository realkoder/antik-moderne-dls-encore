import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
} from "@heroui/react";
import type { Pokemon } from "~/types/pokemon";

interface PokemonCardProps {
  pokemon: Pokemon;
}

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  return (
    // <Card className="max-w-[400px]">
    //   <CardHeader className="flex gap-3">
    //     <Image
    //       alt="heroui logo"
    //       height={40}
    //       radius="sm"
    //       src={pokemon.sprites.front_default}
    //       width={40}
    //     />
    //     <div className="flex flex-col">
    //       <p className="text-md">{pokemon.name}</p>
    //       <p className="text-small text-default-500">heroui.com</p>
    //     </div>
    //   </CardHeader>
    //   <Divider />
    //   <CardBody>
    //     {pokemon.abilities &&
    //       pokemon.abilities.map((ability) => <p>{ability.ability.name}</p>)}
    //   </CardBody>
    //   <Divider />
    //   <CardFooter>
    //     <p>FOOTERR FOR POKEMON CARD!</p>
    //   </CardFooter>
    // </Card>
    <Card>
      <CardBody>
        <p>Make beautiful websites regardless of your design experience.</p>
      </CardBody>
    </Card>
  );
};
