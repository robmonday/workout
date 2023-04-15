import {
  useEffect,
  useState,
  useContext,
  PropsWithChildren,
  createContext,
} from "react";

import { DispatchContext, StateContext } from "./StateProvider";
import { getPotentialFriends } from "../api";

import { dateToWeekdayDate } from "../util";
import { Plus, Edit2, Trash2, X, Check } from "react-feather";

import { Friend } from "../types";

export default function Social() {
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
            <FriendList items={state.potentialFriends.slice(1, 3)}>
              <IncomingFriendRequest />
            </FriendList>
          </div>
          <div className="w-[23rem]">
            <div className="p-2 text-xl">My Friends</div>
            <FriendList items={state.friends}>
              <Friend />
            </FriendList>
          </div>
        </div>
      </div>
    </>
  );
}

const FriendContext = createContext<Friend>({
  id: "",
  firstName: "",
  lastName: "",
  email: "",
});

type FriendListProps = {
  items: Friend[];
};

export function FriendList({
  items,
  children,
}: PropsWithChildren<FriendListProps>) {
  const [filter, setFilter] = useState("");

  const filteredItems = items.filter((i: any) => {
    return (
      i.firstName?.toLowerCase().includes(filter.toLowerCase()) ||
      i.lastName?.toLowerCase().includes(filter.toLowerCase()) ||
      i.city?.toLowerCase().includes(filter.toLowerCase()) ||
      i.state?.toLowerCase().includes(filter.toLowerCase())
    );
  });

  return (
    <>
      <div className="flex w-full flex-col rounded-lg border-2 border-purple-400 py-1 px-3">
        <form>
          <input
            type="text"
            placeholder="Start typing to filter..."
            onChange={(e) => setFilter(e.target.value)}
            className="input mt-2 w-full text-gray-500"
          />
        </form>

        <div className="h-96 overflow-y-auto">
          {filteredItems?.map((f: Friend) => {
            return (
              <FriendContext.Provider value={f} key={f.id}>
                {children}
              </FriendContext.Provider>
            );
          })}
        </div>
      </div>
    </>
  );
}

export function PotentialFriend() {
  const [btnSelected, setBtnSelected] = useState(false);
  const friend = useContext(FriendContext);

  const handleRequest = () => {
    setBtnSelected(true);
    // request to backend needed here
  };

  const handleRequestCancel = () => {
    setBtnSelected(false);
    // request to backend needed here
  };

  return (
    <>
      <div
        className={`my-2 flex justify-between rounded-lg border border-purple-500 p-2 pr-3 hover:bg-purple-300 focus:bg-purple-500 active:translate-y-0.5`}
      >
        <div className="flex h-16 w-16 flex-col place-content-center rounded-full border border-purple-500 bg-purple-100 text-center ">
          <span className="">pic</span>
        </div>
        <div className="flex-grow pl-2 ">
          <div className="">
            {friend.firstName} {friend.lastName}
          </div>
          <div className="font-light text-purple-700 ">
            <div className="">
              {friend.city || "City"}, {friend.state || "State"}
            </div>
          </div>
        </div>
        <span className="">
          {btnSelected ? (
            <div onClick={handleRequestCancel} className="h-full">
              <div className="float-right ml-1 rounded border border-purple-500 bg-purple-100 hover:bg-purple-500 hover:text-white active:bg-purple-700 ">
                <X className="inline" strokeWidth={0.75} />
                <div className="hidden pr-2 text-sm sm:inline">Cancel</div>
              </div>
              <div className="relative top-3 text-right font-semibold italic text-purple-700">
                Requested
              </div>
            </div>
          ) : (
            <div
              onClick={handleRequest}
              className="ml-1 rounded border border-purple-500 bg-purple-300 hover:bg-purple-500 hover:text-white active:bg-purple-700"
            >
              <Plus className="inline" strokeWidth={0.75} />
              <span className="hidden pr-2 text-sm sm:inline-block">
                Request
              </span>
            </div>
          )}
        </span>
      </div>
    </>
  );
}

export function IncomingFriendRequest() {
  const [status, setStatus] = useState<boolean | undefined>(undefined);
  const friend = useContext(FriendContext);

  const dispatch = useContext(DispatchContext);

  const handleAccept = (friend: Friend) => {
    setStatus(true);
    dispatch({ type: "accept_friend_request", payload: friend });
    // request to backend needed here
  };

  const handleUndo = (friend: Friend) => {
    setStatus(undefined);
    status === true &&
      dispatch({ type: "undo_accept_friend_request", payload: friend });
    // request to backend needed here
  };

  const handleReject = () => {
    setStatus(false);
    // request to backend needed here
  };

  let selection;
  if (status === true) {
    selection = (
      <div onClick={() => handleUndo(friend)} className="h-full">
        <div className="float-right ml-1 rounded border border-gray-400 bg-purple-100 hover:bg-gray-500 hover:text-white active:bg-gray-700 ">
          <X className="inline" strokeWidth={0.75} />
          <div className="hidden pr-2 text-sm sm:inline">Undo</div>
        </div>
        <div className="relative top-3 text-right font-semibold italic text-green-700">
          Accepted
        </div>
      </div>
    );
  }
  if (status === false) {
    selection = (
      <div onClick={() => handleUndo(friend)} className="h-full">
        <div className="float-right ml-1 rounded border border-gray-400 bg-purple-100 hover:bg-gray-500 hover:text-white active:bg-gray-700 ">
          <X className="inline" strokeWidth={0.75} />
          <div className="hidden pr-2 text-sm sm:inline">Undo</div>
        </div>
        <div className="relative top-3 text-right font-semibold italic text-red-700">
          Rejected
        </div>
      </div>
    );
  }

  const buttons = (
    <div>
      <div
        onClick={() => handleAccept(friend)}
        className="ml-1 rounded border border-green-400 bg-green-200 hover:bg-green-500 hover:text-white active:bg-green-700"
      >
        <Check className="inline" strokeWidth={0.75} />
        <span className="hidden pr-2 text-sm sm:inline-block">Accept</span>
      </div>

      <div onClick={handleReject} className="mt-2 h-full">
        <div className="float-right ml-1 rounded border border-red-400 bg-red-200 hover:bg-red-500 hover:text-white active:bg-red-700 ">
          <X className="inline" strokeWidth={0.75} />
          <div className="hidden pr-2 text-sm sm:inline">Reject</div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div
        className={`my-2 flex justify-between rounded-lg border border-purple-500 p-2 pr-3 hover:bg-purple-300 focus:bg-purple-500 active:translate-y-0.5`}
      >
        <div className="flex h-16 w-16 flex-col place-content-center rounded-full border border-purple-500 bg-purple-100 text-center ">
          <span className="">pic</span>
        </div>
        <div className="flex-grow pl-2 ">
          <div className="">
            {friend.firstName} {friend.lastName}
          </div>
          <div className="font-light text-purple-700 ">
            <div className="">
              {friend.city || "City"}, {friend.state || "State"}
            </div>
            <div className="">Request {dateToWeekdayDate(Date())}</div>
          </div>
        </div>
        {status === undefined ? buttons : selection}
      </div>
    </>
  );
}

export function Friend() {
  const [btnSelected, setBtnSelected] = useState(false);
  const friend = useContext(FriendContext);

  const handleUnfriend = () => {
    setBtnSelected(true);
    // request to backend needed here
  };

  const handleRequestCancel = () => {
    setBtnSelected(false);
    // request to backend needed here
  };

  return (
    <>
      <div
        className={`my-2 flex justify-between rounded-lg border border-purple-500 p-2 pr-3 hover:bg-purple-300 focus:bg-purple-500 active:translate-y-0.5`}
      >
        <div className="flex h-16 w-16 flex-col place-content-center rounded-full border border-purple-500 bg-purple-100 text-center ">
          <span className="">pic</span>
        </div>
        <div className="flex-grow pl-2 ">
          <div className="">
            {friend.firstName} {friend.lastName}
          </div>
          <div className="font-light text-purple-700 ">
            <div className="">
              {friend.city || "City"}, {friend.state || "State"}
            </div>
            <div className="">Since {dateToWeekdayDate(Date())}</div>
          </div>
        </div>
        <span className="">
          {btnSelected ? (
            <div onClick={handleRequestCancel} className="h-full">
              <div className="float-right ml-1 rounded border border-purple-500 bg-purple-100 hover:bg-purple-500 hover:text-white active:bg-purple-700 ">
                <X className="inline" strokeWidth={0.75} />
                <div className="hidden pr-2 text-sm sm:inline">Cancel</div>
              </div>
              <div className="relative top-3 text-right font-semibold italic text-gray-600">
                Unfriended
              </div>
            </div>
          ) : (
            <div
              onClick={handleUnfriend}
              className="ml-1 rounded border border-purple-500 bg-purple-300 hover:bg-purple-500 hover:text-white active:bg-purple-700"
            >
              <Plus className="inline" strokeWidth={0.75} />
              <span className="hidden pr-2 text-sm sm:inline-block">
                Unfriend
              </span>
            </div>
          )}
        </span>
      </div>
    </>
  );
}
