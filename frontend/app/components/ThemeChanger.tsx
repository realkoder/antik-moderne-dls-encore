import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";
// import { Switch } from "./ui/switch";

export const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();
  


  const toggleTheme = () => setTheme((cur) => (cur == undefined || cur == "light") ? "dark" : "light");

  return (
    <div className="my-4">
      <div className="flex space-y-1 space-x-2">
        {theme === "dark" && <FaSun onClick={toggleTheme} className="text-yellow-500" />}
        {(theme == undefined || theme == "light") && <FaMoon onClick={toggleTheme} className="text-gray-500" />}
      </div>
    </div>
  );

  // return (
  //   <div className="flex-row items-center space-x-2">
  //     <div className="flex space-y-1 space-x-2">
  //       <FaSun className="text-yellow-500" />
  //       <FaMoon className="text-gray-500" />
  //     </div>
  //     <Switch
  //       onCheckedChange={() =>
  //         setTheme((cur) => (cur === "light" ? "dark" : "light"))
  //       }
  //     />
  //   </div>
  // );
};
