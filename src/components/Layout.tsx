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
      <div className="text-md fixed top-0 z-10 flex w-full bg-purple-300 px-2 py-3 sm:px-5">
        <Link to="/">
          <div className="sm:28 mr-1 h-10 w-20 text-lg md:w-36 md:text-xl lg:text-2xl">
            Workout App
          </div>
        </Link>
        {state.token && (
          <nav className="h-15 mx-1 mr-14 flex-grow overflow-x-auto py-1 md:w-full">
            <Link to="/start" className="nav-link">
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
        )}

        {state.token && (
          <div className="group fixed right-2 flex py-1 sm:right-5">
            <div className="hidden overflow-hidden truncate pr-2 italic sm:w-24 md:block md:w-fit md:pr-4">
              {<span>Welcome {state.user?.firstName}!</span>}
            </div>
            <div className=" mt-0 mr-0 flex rounded border-2 border-white bg-purple-500 px-3 py-1">
              <div className=" cursor-pointer text-white">
                <User />
                {state.openNotifications &&
                  state.openNotifications.length > 0 && (
                    <div className="relative">
                      <div className="absolute left-6 bottom-4 animate-ping rounded-md bg-white px-2 text-sm font-semibold">
                        1
                      </div>
                      <div className="absolute left-6 bottom-4 rounded-md border-2 border-red-600 bg-white px-2 text-sm font-semibold text-red-600 ring-2 ring-white">
                        {state.openNotifications.length}
                      </div>
                    </div>
                  )}
                <div className="absolute right-0 top-10 hidden h-auto group-hover:block group-focus:block group-active:block ">
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

      <div className="px-2 pt-20 pb-6 sm:px-6 md:pt-14 ">
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
