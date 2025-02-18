import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/react-router";
import { useTheme } from "next-themes";
import { NavLink, Outlet } from "react-router";
import { ThemeChanger } from "~/components/ThemeChanger";

export default function layoutNavbar() {
  const { theme } = useTheme();
  return (
    <div>
      <nav
        className={`py-4 ${
          theme && theme === "dark" ? "bg-neutral-950" : "bg-slate-400"
        }`}
      >
        <div className="container mx-auto text-white flex justify-between items-center">
          <div className="flex space-x-4">
            <NavLink to="/" className=" font-bold text-xl">
              <img src="/logo.png" width={50} alt="ANTIK MODERNE" />
            </NavLink>
            <ThemeChanger />
          </div>
          <div className="flex space-x-4">
            <NavLink to="/" className=" ">
              Home
            </NavLink>
            <NavLink to="/posters" className=" ">
              Posters
            </NavLink>
            <NavLink to="/genres" className="">
              Genres
            </NavLink>
            <NavLink to="/about" className="">
              About
            </NavLink>

            <SignedOut>
              <NavLink to="/sign-in" className="">
                Sign in
              </NavLink>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </nav>
      <div
        className={`h-screen w-screen ${
          theme && theme === "dark" ? "bg-gray-800" : ""
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
}
