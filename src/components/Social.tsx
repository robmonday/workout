import { useContext, useEffect } from "react";
import { DispatchContext, StateContext } from "./StateProvider";
import { getPotentialFriends } from "../api";
import FriendList, {
  PotentialFriend,
  IncomingFriendRequest,
  Friend
} from "./FriendList";

export default function Friends() {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    getPotentialFriends(100).then((items) =>
      dispatch({ type: "set_potential_friends", payload: items })
    );
  }, []);

  return (
    <>
      <div className="p-2 text-2xl">Connect with Friends</div>
      <div className="panel">
        <div className="flex flex-wrap place-content-evenly">
          <div className="w-[23rem]">
            <div className="p-2 text-xl">Find Friends</div>
            <FriendList items={state.potentialFriends}>
              <PotentialFriend />
            </FriendList>
          </div>
          <div className="w-[23rem]">
            <div className="p-2 text-xl">Incoming Friend Requests</div>
            <FriendList items={state.potentialFriends.slice(1,3)}>
              <IncomingFriendRequest />
            </FriendList>
          </div>
          <div className="w-[23rem]">
            <div className="p-2 text-xl">My Friends</div>
            <FriendList items={state.potentialFriends.slice(-1)}>
              <Friend />
            </FriendList>
          </div>
        </div>
      </div>
    </>
  );
}

export function FindFriends() {}
