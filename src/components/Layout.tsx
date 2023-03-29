import { PropsWithChildren } from "react";
import { Outlet, Link } from "react-router-dom";

const Layout = ({ name = "App" }) => {
  return (
    <>
      <div className="text-md fixed top-0 flex w-full bg-purple-300 px-5 py-3">
        <Link to="/" className="w-1/3 border text-2xl">
          <div>{name}</div>
        </Link>
        <nav className="h-15 flex w-full justify-evenly border">
          <div className="btn">
            <a href="/login">Login/Signup</a>
          </div>
        </nav>
      </div>

      <div className="mx-6 mt-20 mb-6">
        <Outlet />
      </div>

      <footer className="fixed bottom-2 right-2 w-full text-end text-sm">
        &copy; 2023 Workout App
      </footer>
    </>
  );
};

export default Layout;
