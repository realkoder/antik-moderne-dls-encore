import { Switch } from "@heroui/react";
import { useTheme } from "next-themes";

export const ThemeChanger = () => {
  const { setTheme } = useTheme();

  return (
    <Switch
      onChange={() => setTheme((cur) => (cur === "light" ? "dark" : "light"))}
    >
      Colormode
    </Switch>
  );
};
