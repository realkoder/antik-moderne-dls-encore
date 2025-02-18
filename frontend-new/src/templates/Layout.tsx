import { ThemeChanger } from "@/components/ThemeChanger";

import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <div className="bg-gray-600 text-white flex justify-between items-center">
        <div className="flex space-x-4">
          <Link to="/">
            <img className="m-2"
              src="/logo.png"
              width={60}
              height={60}
              alt="ANTIK MODERNE"
            />
          </Link>
          <ThemeChanger />
        </div>
        <div className="flex space-x-4 mr-8">
          <Link to="/posters">Posters</Link>
          <Link to="/genres">Genres</Link>

          <Link to="/about">About</Link>

          <Link to="/login">Login</Link>
        </div>
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
