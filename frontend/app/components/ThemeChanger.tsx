import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";
import { Switch } from "./ui/switch";

export const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex-row items-center space-x-2">
      <div className="flex space-y-1 space-x-2">
        <FaSun className="text-yellow-500" />
        <FaMoon className="text-gray-500" />
      </div>
      <Switch
        onCheckedChange={() =>
          setTheme((cur) => (cur === "light" ? "dark" : "light"))
        }
      />
    </div>
  );
};
