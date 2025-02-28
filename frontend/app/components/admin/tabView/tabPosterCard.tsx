import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../ui/card";
import { Divider } from "~/components/Divider";

interface TabProductCardProps {
  productTitle: string;
  productImageUrl: string;
  artistName: string;
  price: number
}

export function TabPosterCard({ productTitle, productImageUrl, artistName, price }: TabProductCardProps) {
  return (
    <Card className="flex flex-col items-center">
      <CardHeader className="text-center flex-col justify-center items-center">
        <CardTitle>{productTitle}</CardTitle>
        <div className="flex text-sm font-serif">
          <p>Created:</p>
          <p className="ml-1 italic">{`${new Date().toISOString().split("T")[0]}`}</p>
        </div>
      </CardHeader>

      <Divider />

      <CardContent className="mt-2 flex flex-col items-center">
        <img
          key={productImageUrl}
          className="w-40 h-40 border-4 border-gray-400 p-0.5 shadow-lg rounded-2xl hover:scale-150 transition-transform duration-150"
          src={productImageUrl}
          alt={productTitle}
        />
      </CardContent>

      <Divider />
      <CardFooter className="flex-col justify-between text-sm font-serif">
        <div className="flex ">
          <p>Artist:</p>
          <p className="ml-1 italic">{`${artistName}`}</p>
        </div>
        <p>{`${price.toFixed(2)}.-`}</p>
      </CardFooter>
    </Card>
  );
}
