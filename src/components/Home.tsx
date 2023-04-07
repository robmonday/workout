import { useContext } from "react";
import { StateContext, DispatchContext } from "./StateProvider";

const Home = () => {
  const state = useContext(StateContext);

  return (
    <>
      <div>Welcome to the Workout App!</div>

      <br />
    </>
  );
};

export default Home;
