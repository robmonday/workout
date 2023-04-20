import { Outlet, Link, useNavigate } from "react-router-dom";
import { User, Users, LogOut, Settings, MessageSquare } from "react-feather";
import { useContext, useEffect } from "react";
import { DispatchContext, StateContext } from "./StateProvider";

import { getOpenNotifications, getWorkoutFeed } from "../api";

const Layout = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const navigate = useNavigate();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedWorkoutAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch({ type: "log_in_set_user", payload: user });
    }
    const loggedToken = window.localStorage.getItem("loggedWorkoutAppToken");
    if (loggedToken) {
      dispatch({ type: "log_in_set_token", payload: loggedToken });
    }
  }, []);

  useEffect(() => {
    state.token &&
      getOpenNotifications().then((openNotifications) => {
        openNotifications &&
          dispatch({
            type: "set_open_notifications",
            payload: openNotifications,
          });
      });
  }, [state.token]);

  useEffect(() => {
    state.token &&
      getWorkoutFeed().then((data) => {
        const payload = data.length > 0 && data.slice(0, 30);
        payload && dispatch({ type: "set_activity_feed", payload });
      });
  }, [state.latestReaction]);

  const handleLogout = () => {
    localStorage.removeItem("loggedWorkoutAppUser");
    localStorage.removeItem("loggedWorkoutAppToken");
    dispatch({ type: "log_out" });
    navigate("login");
  };

  const notificationStyle =
    state.openNotifications && state.openNotifications.length > 0
      ? "border-2 border-red-600 text-red-600 hover:text-black py-2"
      : "hover:text-purple-800";

  return (
    <>
      <div className="text-md fixed top-0 z-10 flex w-full justify-between bg-purple-300 px-5 py-3">
        <Link to="/" className="text-2xl">
          <div className="h-10 overflow-hidden">Workout App</div>
        </Link>
        {state.token && (
          <div className="">
            <nav className="h-15 flex justify-around ">
              <Link to="/main" className="nav-link">
                Home
              </Link>
              {/* <Link to="/workout" className="nav-link">
                Workout
              </Link> */}
              <Link to="/data" className="nav-link">
                My Data
              </Link>
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
              <Link to="/social" className="nav-link">
                Friends
              </Link>
              <Link to="/badges" className="nav-link">
                Badges
              </Link>
            </nav>
          </div>
        )}
        {state.token && (
          <div className="flex py-1">
            <div className="hidden overflow-hidden truncate pr-4 italic sm:block sm:w-24 md:w-fit">
              {<span>Welcome {state.user?.firstName}!</span>}
            </div>
            <div className="btn group flex bg-purple-500 py-1 ">
              <div className="relative cursor-pointer px-2 text-white ">
                <User />
                {state.openNotifications &&
                  state.openNotifications.length > 0 && (
                    <div>
                      <div className="fixed left-16 bottom-4 animate-ping rounded-md bg-white px-2 text-sm font-semibold">
                        1
                      </div>
                      <div className="fixed left-16 bottom-4 rounded-md border-2 border-red-600 bg-white px-2 text-sm font-semibold text-red-600 ring-2 ring-white">
                        {state.openNotifications.length}
                      </div>
                    </div>
                  )}
                <div className="absolute -right-5 top-7  hidden h-auto group-hover:block group-focus:block group-active:block">
                  <ul className="top-0 w-56 rounded-md bg-white px-6 py-4 shadow">
                    <li className="py-1">
                      <Link
                        to="/notifications"
                        className="block cursor-pointer text-base text-black hover:text-white"
                      >
                        <div
                          className={`flex rounded-md  px-2 ${notificationStyle}`}
                        >
                          <MessageSquare strokeWidth={0.75} />
                          <span className="ml-4">Notifications</span>
                        </div>
                      </Link>
                    </li>

                    <li className="py-1">
                      <Link
                        to="/social"
                        className="block cursor-pointer text-base text-gray-800 hover:text-purple-800"
                      >
                        <div className="flex px-2 py-1">
                          <Users strokeWidth={0.75} />
                          <span className="ml-4">Find Friends</span>
                        </div>
                      </Link>
                    </li>

                    <li className="py-1">
                      <Link
                        to="/settings"
                        className="block cursor-pointer text-base text-gray-800 hover:text-purple-800"
                      >
                        <div className="flex px-2 py-1">
                          <Settings strokeWidth={0.75} />
                          <span className="ml-4">Settings</span>
                        </div>
                      </Link>
                    </li>

                    <li
                      onClick={handleLogout}
                      className="block cursor-pointer py-1 px-2 text-base text-gray-800 hover:text-purple-800"
                    >
                      <div className="flex">
                        <LogOut strokeWidth={0.75} />
                        <span className="ml-4">Log Out</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mx-6 mt-20 mb-6">
        <Outlet />

        {/* Displays State on Page */}
        {/* <div className="border bg-purple-400 p-2">
          <div className="overflow-y-auto break-words p-2">
            {JSON.stringify(state)}
          </div>
        </div> */}
      </div>

      <footer className="fixed bottom-2 right-2 w-full text-end text-sm">
        &copy; 2023 Workout App
      </footer>
    </>
  );
};

export default Layout;
