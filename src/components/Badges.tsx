import { useContext, useEffect } from "react";
import { getAllBadges } from "../api";
import { DispatchContext, StateContext } from "./StateProvider";

export default function Badges() {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    getAllBadges().then((badges) => {
      // console.log(badges);
      dispatch({ type: "set_badges", payload: badges });
    });
  }, []);

  return (
    <>
      <div className="p-2 text-2xl">Badges</div>
      <div className="panel">
        <div className="m-2 flex flex-wrap place-content-evenly rounded-lg bg-gradient-to-br from-purple-200 to-purple-300 px-2">
          {state.badges.map((b) => (
            <Badge key={b.id} type={b.type} />
          ))}
        </div>
      </div>
    </>
  );
}

const Badge = ({ type = "Badge" }) => {
  return (
    <div className="m-3 rounded-full  bg-orange-200 p-4 text-center hover:shadow-lg active:translate-y-1">
      {type}
    </div>
  );
};
