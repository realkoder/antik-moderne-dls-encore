import { Image } from "@heroui/react";
import { NavLink, Outlet } from "react-router";
import { ThemeChanger } from "~/components/ThemeChanger";

export default function layoutNavbar() {
  return (
    <div>
      <nav className="bg-gray-800 py-4">
        <div className="container mx-auto text-white flex justify-between items-center">
          <NavLink to="/" className=" font-bold text-xl">
            <Image src="/logo.png" width={50} alt="ANTIK MODERNE" />
          </NavLink>
          <ThemeChanger />
          <div className="flex space-x-4">
            <NavLink to="/posters" className=" ">
              Posters
            </NavLink>
            <NavLink to="/genres" className="">
              Genres
            </NavLink>
            <NavLink to="/about" className="">
              About
            </NavLink>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
