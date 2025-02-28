import { Input } from "~/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../ui/card";
import { Label } from "@radix-ui/react-label";
import { Button } from "~/components/ui/button";
import type { types } from "~/lib/client";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Divider } from "~/components/Divider";
import { Toaster } from "sonner";
import { usePosterCreate } from "~/hooks/usePosterCreate";

const formats = ["A4", "30X30 cm", "30X40 cm", "50x50", "50x70 cm", "70x70 cm", "70x100 cm", "100x100 cm", "100x140 cm"];

interface TabCreatePosterProps {
  changeTabTo: (tab: string) => void;
}

export function TabCreatePoster({ changeTabTo }: TabCreatePosterProps) {
  const { posterCreate, setPosterCreate, isCreating, onAddCreatePoster, price, setPrice,setFormat, onAddFormatPrice, onRemoveFormatPrice } =
    usePosterCreate(changeTabTo);

  const filteredFormats = formats.filter((format) => !posterCreate.formatPrices.find((posterFormat) => posterFormat.format === format));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Poster</CardTitle>
        <CardDescription>New poster can be created to be sold on AntikModerne.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-2">
        <div className="flex">
          <div className="space-y-1">
            <Label htmlFor="posterName">Poster name</Label>
            <Input
              value={posterCreate.name}
              onChange={(event) => setPosterCreate((cur) => ({ ...cur, name: event.target.value }))}
              id="posterName"
              type="text"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="artistName">Artist name</Label>
            <Input
              value={posterCreate.artistFullName}
              onChange={(event) => setPosterCreate((cur) => ({ ...cur, artistFullName: event.target.value }))}
              id="artistName"
              type="text"
            />
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="posterImageUrl">The URL for the poster</Label>
          <Input
            value={posterCreate.posterImageUrl}
            onChange={(event) => setPosterCreate((cur) => ({ ...cur, posterImageUrl: event.target.value }))}
            id="posterImageUrl"
            type="text"
          />
        </div>
        <img
          key={posterCreate.posterImageUrl}
          className="w-40 h-40 border-4 border-gray-400 p-0.5 shadow-lg rounded-2xl"
          src={posterCreate.posterImageUrl}
          alt={posterCreate.name}
        />

        <div className="flex">
          <div>
            <Label>Format</Label>
            <Select onValueChange={(e: types.Format) => setFormat(e)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Formats</SelectLabel>
                  {filteredFormats.map((format) => (
                    <SelectItem key={format} value={format}>
                      {format}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input value={price} onChange={(event) => setPrice(Number(event.target.value))} id="price" type="number" />
          </div>
        </div>
        <Button onClick={() => onAddFormatPrice()}>Add the format with price to poster</Button>
        <Divider />
      </CardContent>
      <CardFooter className="w-full flex flex-col items-center justify-center">
        <Toaster />
        {posterCreate.formatPrices.map((formatPrice) => (
          <div key={formatPrice.format} className="w-[60%] flex items-center justify-between">
            <div className="flex flex-col">
              <p>{formatPrice.format}</p>
              <p>{formatPrice.price}</p>
            </div>
            <Button onClick={() => onRemoveFormatPrice(formatPrice.format)} className="bg-red-500">
              Remove
            </Button>
          </div>
        ))}
        <Button disabled={isCreating} onClick={() => onAddCreatePoster()}>
          Add the created poster
        </Button>
      </CardFooter>
    </Card>
  );
}
