import { useContext, useEffect } from "react";
import { getAllBadges } from "../api";
import { DispatchContext, StateContext } from "./StateProvider";

import Panel from "./Panel";

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
    <div>
      <Panel title="Badges">
        <div className="m-2 flex w-full flex-wrap place-content-evenly rounded-lg bg-gradient-to-br from-purple-200 to-purple-300 px-2 ">
          {state.badges.map((b) => (
            <Badge key={b.id} type={b.type} />
          ))}
        </div>
      </Panel>
    </div>
  );
}

const Badge = ({ type = "Badge" }) => {
  return (
    <>
      <div className="m-5 w-auto rounded-lg border bg-orange-200 p-4 text-center hover:shadow-lg active:translate-y-1">
        {type}
      </div>
    </>
  );
};
