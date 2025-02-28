import { SignedIn, SignedOut, UserButton } from "@clerk/react-router";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router";

import { ThemeChanger } from "~/components/ThemeChanger";
import useUserRole from "~/hooks/useUserRole";

export default function layoutNavbar() {
  const { theme, setTheme } = useTheme();
  const { pathname } = useLocation();
  const { userRole } = useUserRole();

  useEffect(() => {
    setTheme("light");
  }, []);

  const navLinkClassName = (linkPath: string) =>
    `${pathname === linkPath ? `border-black border-b ${theme == undefined || theme == "light" ? "border-neutral-950" : "border-neutral-50"}` : ""}`;

  return (
    <div className="h-screen text-center flex flex-col">
      <nav className="flex items-center justify-center">
        <div className="w-[95%] p-4 px-8 flex justify-between items-center">
          <div className="flex space-x-4">
            <NavLink to="/">
              <img className="border border-black grayscale rounded-full" src="/logo.png" width={50} alt="ANTIK MODERNE" />
            </NavLink>
            <ThemeChanger />
          </div>
          <div className="flex space-x-4 items-center">
            <NavLink to="/" className={navLinkClassName("/")}>
              Home
            </NavLink>
            <NavLink to="/posters" className={navLinkClassName("/posters")}>
              Posters
            </NavLink>
            <NavLink to="/genres" className={navLinkClassName("/genres")}>
              Genres
            </NavLink>
            <NavLink to="/about" className={navLinkClassName("/about")}>
              About
            </NavLink>

            <SignedOut>
              <NavLink to="/sign-in" className={navLinkClassName("/sign-in")}>
                Sign in
              </NavLink>
            </SignedOut>
            <SignedIn>
              {userRole === "ADMIN" && (
                <NavLink to="/admin" className={navLinkClassName("/admin")}>
                  Admin
                </NavLink>
              )}

              <UserButton />
            </SignedIn>
          </div>
        </div>
      </nav>
      <div className={"flex-1"}>
        <Outlet />
      </div>
      <div>
        <footer className="flex flex-col items-center p-4 mt-6">
        <img className="border border-black grayscale rounded-full" src="/logo.png" width={50} alt="ANTIK MODERNE" />
          <p className="italic mt-3">© 2025 ANTIK MODERNE</p>
        </footer>
        </div>
    </div>
  );
}
