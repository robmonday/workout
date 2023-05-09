import { useContext } from "react";
import { StateContext } from "./StateProvider";
import { Link } from "react-router-dom";

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
        <div className="m-2 grid max-w-7xl grid-cols-1 gap-10 rounded-xl border-2 border-purple-500 bg-gradient-to-br from-purple-100 to-purple-300 p-4 shadow-xl ring-2 ring-gray-200 ring-offset-2 sm:m-4 sm:p-6 md:m-10 md:grid-cols-2 md:p-10">
          <div className="rounded p-2 sm:p-4">
            <div>
              <div className="mb-3 text-xl font-light lg:text-2xl">
                Welcome to the Workout App!
              </div>
              <div className="text-justify font-light leading-8">
                The Workout App empowers a tribe of individuals committed to
                improving their physical health and wellbeing through consistent
                daily exercises and workouts. Our activity tracking tools and AI
                insights spell out your progress (and opportunities) in the
                clearest possible terms, enabling you to up your game and see
                measurable results. Connecting with other community members and
                inviting those in your own social circle plugs you into a
                community of enouragement and accountability that can also help
                you along the way. No matter where you are starting from (or
                headed toward) in your fitness journey, let the Workout App take
                you further.
              </div>
            </div>
            {!state.token && (
              <Link to="/signup">
                <div className="btn btn-purple mt-5 bg-purple-500 text-white shadow-xl">
                  Join the movement!
                </div>
              </Link>
            )}
          </div>

          <img
            className="w-full rounded opacity-80 shadow-xl "
            src="https://workout-app-static.s3.us-east-2.amazonaws.com/images/work-out.png" //{`${staticUrl}/work-out.png`}
            alt="Intro Graphic"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
