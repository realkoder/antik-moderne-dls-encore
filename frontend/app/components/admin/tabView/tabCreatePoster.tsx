import { Input } from "~/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../ui/card";
import { Label } from "@radix-ui/react-label";
import { Button } from "~/components/ui/button";
import type { types } from "~/lib/client";
import { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Divider } from "~/components/Divider";
import useAuthFetch from "~/hooks/useAuthFetch";

const defaultFormatPrices: types.FormatPriceCreate[] = [{ format: "100x100 cm", price: 2500 }];

const defaultPoster: types.PosterCreate = {
  name: "SKULL",
  artistFullName: "Chait Goli",
  posterImageUrl: "https://images.pexels.com/photos/1918290/pexels-photo-1918290.jpeg?auto=compress&cs=tinysrgb&w=1200",
  formatPrices: defaultFormatPrices,
};

const formats = ["A4", "30X30 cm", "30X40 cm", "50x50", "50x70 cm", "70x70 cm", "70x100 cm", "100x100 cm", "100x140 cm"];

export function TabCreatePoster() {
  const [posterCreate, setPosterCreate] = useState<types.PosterCreate>(defaultPoster);
  const [format, setFormat] = useState<types.Format | null>();
  const [price, setPrice] = useState(1000);

  const { authRequestClient } = useAuthFetch();

  const filteredFormats = formats.filter((format) => !posterCreate.formatPrices.find((posterFormat) => posterFormat.format === format));

  const onAddFormatPrice = () => {
    if (!format) return;
    setPosterCreate((cur) => ({ ...cur, formatPrices: [...cur.formatPrices, { format: format, price: price }] }));
    setPrice(1000);
    setFormat(null);
  };

  const onRemoveFormatPrice = (format: types.Format) => {
    if (!format) return;
    setPosterCreate((cur) => ({ ...cur, formatPrices: [...cur.formatPrices.filter((formatPrice) => formatPrice.format !== format)] }));
  };

  const onAddCreatePoster = async () => {
    if (posterCreate.formatPrices.length === 0 || posterCreate.name.length === 0 || posterCreate.artistFullName.length === 0) return;
    const posters = await authRequestClient?.product.createPoster({ posterCreate });
    console.log("POSTERS", posters);
  };

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
          className="w-40 h-40 border-4 border-gray-400 p-0.5 shadow-lg rounded-2xl hover:scale-150 transition-transform duration-150"
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
        <Button onClick={() => onAddCreatePoster()}>Add the created poster</Button>
      </CardFooter>
    </Card>
  );
}
