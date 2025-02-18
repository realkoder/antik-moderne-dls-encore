// import Client, { Local } from "@/lib/client";
import { useTheme } from "next-themes";
// import { useEffect } from "react";

export default function HomeTemplate() {
  const { theme } = useTheme();

  // const client = new Client(Local);

  // useEffect(() => {
  //   (async () => {
  //     const res = await client.admin.getHelloWorld();
  //     console.log(res);
  //   })();
  // });

  return (
    <div
      className={`h-screen w-screen ${
        theme && theme === "dark" ? "bg-gray-700" : ""
      }`}
    >
      <h1 className="text-4xl font-bold mb-4">Welcome to Antik Moderne</h1>
      <p className="text-lg mb-6">
        Discover a curated collection of timeless posters that blend the
        elegance of the past with the modern aesthetic.
      </p>
      <div className="flex justify-center">
        <a
          href="/posters"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Shop Now
        </a>
      </div>
    </div>
  );
}
