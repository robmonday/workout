import { useEffect, useContext } from "react";
import { DispatchContext, StateContext } from "./StateProvider";
import { getOpenNotifications } from "../api";
import { number } from "zod";

export default function Notifications() {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  if (!state.openNotifications) {
    return <div>'No open notifications'</div>;
  }
  const openNotifications = state.openNotifications.sort(
    (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
  );

  const handleDismiss = () => {
    alert("dismiss notification");
  };

  return (
    <>
      <div className="w-1/2">
        <div className="panel">
          <div className="p-2 text-2xl">Your Notifications</div>{" "}
          {openNotifications.map((n) => (
            <div
              key={n.id}
              className="flex border-collapse justify-between border-b border-b-black p-2"
            >
              <div className="flex w-5/6">
                <span className="w-24">
                  {new Date(n.createdAt).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "numeric",
                    day: "numeric",
                  })}
                </span>
                <span className="w-full">{n.message}</span>
              </div>
              <div className="flex w-fit">
                <div
                  onClick={handleDismiss}
                  className="btn btn-purple ml-2 mr-0 px-3 py-1"
                >
                  Dismiss
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
