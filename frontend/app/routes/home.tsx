import type { Route } from "./+types/home";
import Client, { Local } from "~/lib/client";
import { useAuth } from "@clerk/react-router";
import { Button } from "~/components/ui/button";

export function meta({}: Route.MetaArgs) {
  return [{ title: "ANTIK MODERNE" }, { name: "description", content: "Welcome to Antik Moderne!" }];
}

export default function Home() {
  const { getToken } = useAuth();

  const handleFetc = async () => {
    const token = await getToken();
    new Client(Local).admin.getHelloWorld().then((res) => console.log("LOOK, helloworldRES", res));
    if (!token) return;
    // getRequestClient(token)
    //   .admin.getDashboardData()
    //   .then((res) => console.log("LOOK, AUTH CALL DASHBOARDDATE", res));
  };

  return (
    <div className="p-4 px-8 flex-row justify-center text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Antik Moderne</h1>
      <p className="text-lg mb-6">Discover a curated collection of timeless posters that blend the elegance of the past with the modern aesthetic.</p>
      <div className="flex justify-center">
        <a href="/posters" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Shop Now
        </a>
      </div>
      <Button onClick={() => handleFetc()}>NOWW</Button>
    </div>
  );
}
