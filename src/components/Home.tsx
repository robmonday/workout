import { useContext } from "react";
import { StateContext, DispatchContext } from "./StateProvider";

const Home = () => {
  const state = useContext(StateContext);

  return (
    <>
      <div>This is the home page!</div>
      <br />
    </>
  );
};

export default Home;
