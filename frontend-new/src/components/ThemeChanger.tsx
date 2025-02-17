import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";
import { Switch } from "./ui/switch";

export const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      {theme === "dark" && <FaSun className="text-yellow-500" />}
      <Switch
        onCheckedChange={() =>
          setTheme((cur) => (cur === "light" ? "dark" : "light"))
        }
      >
        <span
          className={`${
            theme === "dark" ? "translate-x-6" : "translate-x-1"
          } inline-block w-4 h-4 transform bg-white rounded-full`}
        />
      </Switch>
      {theme === "light" && <FaMoon className="text-gray-500" />}
    </div>
  );
};
