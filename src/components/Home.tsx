import { useContext } from "react";
import { StateContext } from "./StateProvider";
import { Link } from "react-router-dom";
import { baseUrl } from "../api";

const Home = () => {
  const state = useContext(StateContext);

  return (
    <>
      {!state.token && (
        <div className="btn btn-purple fixed top-2 right-1 z-10 px-2 py-1 text-base">
          <Link to="/login">Log In / Sign Up</Link>
        </div>
      )}
      <div className="flex place-content-center ">
        <div className="m-4 grid max-w-7xl grid-cols-1 gap-10 rounded-xl border-2 border-purple-500 bg-gradient-to-br from-purple-100 to-purple-300 p-10 shadow-xl ring-2 ring-gray-200 ring-offset-2 md:m-10 md:grid-cols-2">
          <div className="rounded p-2 sm:p-4">
            <div>
              <div className="mb-7 text-xl font-light lg:text-2xl">
                Welcome to the Workout App!
              </div>
              <div className="">Come be a part of our team!</div>
              <br />
            </div>
            <Link to="/signup">
              <div className="btn btn-purple mt-5 bg-purple-500 text-white shadow-xl">
                Join the movement!
              </div>
            </Link>
          </div>

          <img
            className="w-full rounded opacity-80 shadow-xl "
            src="https://cdn.pixabay.com/photo/2022/01/28/05/10/work-out-6973688_960_720.png" //{`${baseUrl}/work-out.png`}
            alt="Intro Graphic"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
