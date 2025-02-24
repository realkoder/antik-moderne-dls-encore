import type { Pokemon } from "~/types/pokemon";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface PokemonCardProps {
  pokemon: Pokemon;
}

const gameVersionsLink: { [key: string]: string } = {
  "black-2":
    "https://assets1.ignimgs.com/2019/05/17/pokemon-black---button-1558054992405.jpg?width=300&crop=1%3A1%2Csmart&auto=webp",
  ruby: "https://m.media-amazon.com/images/M/MV5BOTQyMWM3NWQtZTk4Yi00MDljLTlmY2ItNGVjMmM4NzFkZDZkXkEyXkFqcGc@._V1_.jpg",
  sapphire:
    "https://www.nintendo.com/eu/media/images/10_share_images/games_15/game_boy_advance_7/SI_GBA_PokemonSapphire_enGB_image1600w.jpg",
  emerald:
    "https://www.nintendo.com/eu/media/images/10_share_images/games_15/game_boy_advance_7/H2x1_GBA_PokemonEmerald_enGB_image1280w.jpg",
  firered:
    "https://m.media-amazon.com/images/M/MV5BYjViMDU3MmItMzM0ZC00OWNmLWEyZWYtMWEyNjAyNjg1YWU4XkEyXkFqcGc@._V1_.jpg",
  leafgreen: "https://i.ytimg.com/vi/oBuA3SN0dtw/sddefault.jpg",
  diamond:
    "https://assets-prd.ignimgs.com/2022/01/31/pokemon-diamond-button-crop-1643616517892.jpg",
  pearl:
    "https://assets-prd.ignimgs.com/2022/01/31/pokemon-pearl-button-crop1-1643617138694.jpg",
  platinum:
    "https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_ds_22/H2x1_NDS_PokemonPlatinum_enGB_image1600w.jpg",
  heartgold:
    "https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_ds_22/SI_NDS_PokemonHeartGold_enGB_image1600w.jpg",
  soulsilver:
    "https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_ds_22/SI_NDS_PokemonSoulSilver_enGB_image1600w.jpg",
  black:
    "https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_ds_22/SI_NDS_PokemonBlack_enGB_image1600w.jpg",
  white:
    "https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_ds_22/SI_NDS_PokemonWhite_enGB_image1600w.jpg",
  "white-2":
    "https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_ds_22/SI_NDS_PokemonBlackAndWhite2_White_enGB.jpg",
  gold: "https://www.nintendo.com/eu/media/images/10_share_images/games_15/game_boy_color_5/H2x1_GBC_PokemonGold_enGB.jpg",
  silver:
    "https://assets1.ignimgs.com/2019/05/17/pokemon-silver---button-1558057647925.jpg",
  crystal:
    "https://www.nintendo.com/eu/media/images/10_share_images/games_15/game_boy_color_5/H2x1_GBC_PokemonCrystal_enGB_image1600w.jpg",
  red: "https://i.ytimg.com/vi/pvH5hWc7Mes/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDn5ncbOpIfgiffChsWepk63SbuFw",
  blue: "https://www.nintendo.com/eu/media/images/10_share_images/games_15/game_boy_4/H2x1_GB_PokemonBlue_enGB_image1600w.jpg",
  yellow: "https://assets1.ignimgs.com/2019/05/17/pokemon-yellow---button-1558057648010.jpg",
};

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  return (
    <Card className="w-full text-center">
      <CardHeader className="text-center flex-col justify-center items-center">
        <CardTitle>Pokemon {pokemon.name}</CardTitle>
        <img
          src={pokemon.sprites.front_default}
          className="w-35 h-35 hover:scale-150 transition-transform duration-150 rounded shadow-lg border-2 border-gray-200"
          alt="Pokemon"
        />
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <div className="space-y-1">
            {pokemon.game_indices && pokemon.game_indices.length > 0 ? (
              <p className="text-sm font-bold leading-none">
                Included in following versions
              </p>
            ) : (
              <p className="text-sm font-bold leading-none">
                Not included in any versions
              </p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
              {pokemon.game_indices.map((gameIndice) => {
                const versionName = gameIndice.version.name as string;
                const versionImageUrl = gameVersionsLink[versionName];
                if (versionImageUrl) {
                  return (
                    <img
                      key={versionImageUrl}
                      className="w-12 h-12 hover:scale-300 transition-transform duration-150 rounded shadow-lg border-2 border-gray-200"
                      src={versionImageUrl}
                      alt={versionName}
                    />
                  );
                }
                return <p>{gameIndice.version.name}</p>;
              })}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col justify-between">
        <p>{pokemon.abilities[0].ability.name || "No ability"}</p>
      </CardFooter>
    </Card>
  );
};
