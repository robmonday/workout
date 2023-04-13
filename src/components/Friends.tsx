import { useContext, useEffect } from "react";
import { DispatchContext, StateContext } from "./StateProvider";
import { getUsers } from "../api";
import FilterList from "./FilterList";

export default function Friends() {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    getUsers(100).then((otherUsers) =>
      dispatch({ type: "set_other_users", payload: otherUsers })
    );
  }, []);

  return (
    <>
      <div className="p-2 text-2xl">Connect with Friends</div>
      <div className="panel">
        <div className="flex flex-wrap place-content-evenly">
          <div className="w-[23rem]">
            <div className="p-2 text-xl">My Friends</div>
            <FilterList
              deleteReqFn={(id: string) => alert(`delete ${id} clicked`)}
            />
          </div>
          <div className="w-[23rem]">
            <div className="p-2 text-xl">Pending Requests</div>
            <FilterList
              deleteReqFn={(id: string) => alert(`delete ${id} clicked`)}
            />
          </div>
          <div className="w-[23rem]">
            <div className="p-2 text-xl">Find Friends</div>
            <FilterList
              deleteReqFn={(id: string) => alert(`delete ${id} clicked`)}
            />
          </div>
        </div>

        {state.findfriendList.length > 0 &&
          state.findfriendList.map((u) => (
            <div>
              {u.firstName} {u.lastName}
            </div>
          ))}
      </div>
    </>
  );
}

export function FindFriends() {}
