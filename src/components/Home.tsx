import { useContext } from "react";
import { StateContext } from "./StateProvider";
import { Link } from "react-router-dom";

const Home = () => {
  const state = useContext(StateContext);

  return (
    <>
      {!state.token && (
        <div className="btn fixed top-2 right-1 bg-purple-500 px-2 py-1 text-base text-white ">
          <Link to="/login">Log In / Sign Up</Link>
        </div>
      )}

      <div>Welcome to the Workout App!</div>

      <br />
    </>
  );
};

export default Home;
