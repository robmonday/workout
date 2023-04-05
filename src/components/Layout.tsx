import { Outlet, Link, useNavigate } from "react-router-dom";
import { User, LogOut, Settings } from "react-feather";
import { useContext, useEffect } from "react";
import { DispatchContext, StateContext } from "./StateProvider";

const Layout = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const navigate = useNavigate();

  useEffect(() => {
    const userJSON = localStorage.getItem("user");
    if (userJSON) {
      const parsedUserObj = userJSON && JSON.parse(userJSON);
      dispatch({ type: "log_in", payload: parsedUserObj });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "log_out" });
    navigate("login");
  };

  return (
    <>
      <div className="text-md fixed top-0 flex w-full bg-purple-300 px-5 py-3">
        <Link to="/" className="w-1/3 text-2xl">
          <div>Workout App</div>
        </Link>
        <nav className="h-15 flex w-full justify-between ">
          <Link to="/home" className="nav-link">
            Home
          </Link>
          <Link to="/workout" className="nav-link">
            Workout
          </Link>
          <Link to="/data" className="nav-link">
            My Data
          </Link>
          <Link to="/dashboard" className="nav-link">
            Dashboard
          </Link>

          {state.userObj ? (
            <div className="flex py-1">
              <div className="pr-4 italic">
                Welcome, {state.userObj.firstName}!
              </div>
              <div className="btn group flex bg-purple-500 py-1 ">
                <div className="relative cursor-pointer px-2 text-white ">
                  <User />
                  <div className="absolute -right-5 top-7 hidden h-auto group-hover:block group-focus:block group-active:block">
                    <ul className="top-0 w-48 bg-white px-6 py-2 shadow">
                      <li className="py-1">
                        <Link
                          to="/settings"
                          className="block cursor-pointer text-base text-gray-800 hover:text-purple-800"
                        >
                          <div className="flex">
                            <Settings strokeWidth={0.75} />
                            <span className="ml-4">Settings</span>
                          </div>
                        </Link>
                      </li>
                      <li
                        onClick={handleLogout}
                        className="block cursor-pointer py-1 text-base text-gray-800 hover:text-purple-800"
                      >
                        <div className="flex">
                          <LogOut strokeWidth={0.75} />
                          <span className="ml-4">Log Out</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Account */}
              </div>
            </div>
          ) : (
            <div className="btn bg-purple-500 px-2 py-1 text-base text-white ">
              <Link to="/login">Log In / Sign Up</Link>
            </div>
          )}
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
