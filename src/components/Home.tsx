import { useContext } from "react";
import { StateContext, DispatchContext } from "./StateProvider";

const Home = () => {
  const state = useContext(StateContext);

  return (
    <>
      <div>This is the home page!</div>
      {/* Displays State on Page */}
      <div className="border bg-purple-400 p-2">
        <div className="p-2">{JSON.stringify(state)}</div>
      </div>
    </>
  );
};

export default Home;
