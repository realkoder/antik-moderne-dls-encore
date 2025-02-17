import { Switch } from "@heroui/react";
import { useTheme } from "next-themes";

export const ThemeChanger = () => {
  const { setTheme } = useTheme();

  return (
    <div>
      <Switch
        onChange={() => setTheme((cur) => (cur === "light" ? "dark" : "light"))}
      >
        Colormode
      </Switch>
    </div>
  );
};
