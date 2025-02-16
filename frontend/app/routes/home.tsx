import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ANTIK MODERNE" },
    { name: "description", content: "Welcome to Antik Moderne!" },
  ];
}

export default function Home() {
  return (
    <div className="border-2 border-solid">
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
