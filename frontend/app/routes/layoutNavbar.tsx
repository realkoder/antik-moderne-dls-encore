import { SignedIn, SignedOut, UserButton } from "@clerk/react-router";
import { useTheme } from "next-themes";
import { NavLink, Outlet, useLocation } from "react-router";
import { ThemeChanger } from "~/components/ThemeChanger";

export default function layoutNavbar() {
  const { theme } = useTheme();
  const { pathname } = useLocation();

  return (
    <div>
      <nav
        className={`py-4 ${
          theme && theme === "dark" ? "bg-neutral-950" : "bg-slate-400"
        }`}
      >
        <div className="container mx-auto text-white flex justify-between items-center">
          <div className="flex space-x-4">
            <NavLink to="/">
              <img src="/logo.png" width={50} alt="ANTIK MODERNE" />
            </NavLink>
            <ThemeChanger />
          </div>
          <div className="flex space-x-4">
            <NavLink to="/" className={`p-2 ${pathname === "/" ? `rounded-full border-2 ${theme === "light" ? "border-neutral-950" : "border-neutral-50"}` : ""}`}>
              Home
            </NavLink>
            <NavLink to="/posters" className={`p-2 ${pathname === "/posters" ? `rounded-full border-2 ${theme === "light" ? "border-neutral-950" : "border-neutral-50"}` : ""}`}>
              Posters
            </NavLink>
            <NavLink to="/genres" className={`p-2 ${pathname === "/genres" ? `rounded-full border-2 ${theme === "light" ? "border-neutral-950" : "border-neutral-50"}` : ""}`}>
              Genres
            </NavLink>
            <NavLink to="/about" className={`p-2 ${pathname === "/about" ? `rounded-full border-2 ${theme === "light" ? "border-neutral-950" : "border-neutral-50"}` : ""}`}>
              About
            </NavLink>

            <SignedOut>
              <NavLink to="/sign-in" className={`p-2 ${pathname === "/sign-in" ? `rounded-full border-2 ${theme === "light" ? "border-neutral-950" : "border-neutral-50"}` : ""}`}>
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
