import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "../../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Button } from "../../ui/button";
import { TabProductCard } from "./tabProductCard";
import { useState } from "react";

const products = [
  {
    productTitle: "SKULL",
    productImageUrl: "https://images.pexels.com/photos/1918290/pexels-photo-1918290.jpeg?auto=compress&cs=tinysrgb&w=1200",
    artistName: "Chait Goli",
    price: 100,
    createdDate: new Date().toISOString().split("T")[0],
  },
  {
    productTitle: "PENCILS",
    productImageUrl: "https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=1200",
    artistName: "Ann H",
    price: 190,
    createdDate: new Date().toISOString().split("T")[0],
  },
  {
    productTitle: "CANVA",
    productImageUrl: "https://images.pexels.com/photos/1572386/pexels-photo-1572386.jpeg?auto=compress&cs=tinysrgb&w=1200",
    artistName: "Peter Falaz",
    price: 100,
    createdDate: new Date().toISOString().split("T")[0],
  },
  {
    productTitle: "COLORS",
    productImageUrl: "https://images.pexels.com/photos/1170576/pexels-photo-1170576.jpeg?auto=compress&cs=tinysrgb&w=1200",
    artistName: "Steve joh",
    price: 1001,
    createdDate: new Date().toISOString().split("T")[0],
  },
];

export function TabContainer() {
  const [searchString, setSearchString] = useState("");

  return (
    <Tabs defaultValue="products" className="p-4 border border-black rounded-2xl">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="products">Products</TabsTrigger>
        <TabsTrigger value="add">Add Product</TabsTrigger>
      </TabsList>
      <TabsContent value="products">
        <Input
          placeholder="Filter products..."
          value={searchString}
          onChange={(event) => setSearchString(event.target.value.toLowerCase())}
          className="max-w-sm my-4"
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {products
            .filter(
              (product) =>
                product.artistName.toLowerCase().includes(searchString) ||
                product.productTitle.toLowerCase().includes(searchString) ||
                product.createdDate.includes(searchString)
            )
            .map((product) => (
              <TabProductCard
                key={product.productTitle}
                productTitle={product.productTitle}
                productImageUrl={product.productImageUrl}
                artistName={product.artistName}
                price={product.price}
              />
            ))}
        </div>
      </TabsContent>

      <TabsContent value="add">
        <Card>
          <CardHeader>
            <CardTitle>Add New Product</CardTitle>
            <CardDescription>Change your password here. After saving, you'll be logged out.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
