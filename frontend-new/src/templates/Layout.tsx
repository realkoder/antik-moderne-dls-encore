import { ThemeChanger } from "@/components/ThemeChanger";

import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <div className="bg-gray-600 text-white flex justify-between items-center">
        <div className="flex">
          <Link to="/">
            <Image
              mr={4}
              p={2}
              src="/logo.png"
              height={50}
              alt="ANTIK MODERNE"
            />
          </Link>
          <ThemeChanger />
        </div>
        <div className="flex m-12">
          <div className="m-12">
            <Link to="/posters">Posters</Link>
          </div>

          <div className="p-12">
            <Link to="/genres">Genres</Link>
          </div>

          <div className="m-4">
            <Link className="m-4" to="/about">
              About
            </Link>
          </div>

          <Link className="m-4" to="/login">
            Login
          </Link>
        </div>
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
