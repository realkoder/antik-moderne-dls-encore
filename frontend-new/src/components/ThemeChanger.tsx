import { Switch } from "@/components/ui/switch";
import { Icon } from "@chakra-ui/react";
import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";

export const ThemeChanger = () => {
  const { setTheme } = useTheme();

  return (
    <Switch
      colorPalette="blue"
      size="lg"
      onChange={() => setTheme((cur) => (cur === "light" ? "dark" : "light"))}
      trackLabel={{
        on: (
          <Icon color="yellow.400">
            <FaSun />
          </Icon>
        ),
        off: (
          <Icon color="gray.400">
            <FaMoon />
          </Icon>
        ),
      }}
    />
  );
};
