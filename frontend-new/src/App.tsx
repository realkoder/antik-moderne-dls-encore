import { Button, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ThemeChanger } from "./components/ThemeChanger";
import { AboutTemplate } from "./templates/about";
import { GenresTemplate } from "./templates/genres";
import HomeTemplate from "./templates/home";
import PostersTemplate from "./templates/posters";

function App() {
  const [showingTemplate, setShowingTemplate] = useState("");

  useEffect(() => {
    const showingTemplate = localStorage.getItem("showingTemplate");
    setShowingTemplate(showingTemplate ? showingTemplate : "home");
  }, []);

  const changeShowingTemplate = (templateToShow: string) => {
    if (showingTemplate === templateToShow) return;
    localStorage.setItem("showingTemplate", templateToShow);
    setShowingTemplate(templateToShow);
  };

  const renderTemplate = () => {
    switch (showingTemplate) {
      case "about":
        return <AboutTemplate />;
      case "genres":
        return <GenresTemplate />;
      case "home":
        return <HomeTemplate />;
      case "posters":
        return <PostersTemplate />;
      default:
        return null;
    }
  };

  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto text-white flex justify-between items-center">
          <div className="flex space-x-4">
            <Image mr={4}
              onClick={() => changeShowingTemplate("home")}
              src="/logo.png"
              width={50}
              alt="ANTIK MODERNE"
            />
            <ThemeChanger />
          </div>
          <div className="flex ">
            <Button mr={4} onClick={() => changeShowingTemplate("posters")}>
              Posters
            </Button>
            <Button mr={4} onClick={() => changeShowingTemplate("genres")}>
              Genres
            </Button>
            <Button mr={4} onClick={() => changeShowingTemplate("about")}>
              About
            </Button>
          </div>
        </div>
      </nav>
      <div>{renderTemplate()}</div>
    </div>
  );
}

export default App;
