import { useTheme } from "next-themes";

export const GenresTemplate = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`h-screen w-screen ${
        theme && theme === "dark" ? "bg-gray-700" : ""
      }`}
    >
      <h1 className="text-4xl font-bold mb-4">Browse Posters by Genre</h1>
    </div>
  );
};
