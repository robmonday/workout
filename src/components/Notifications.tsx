import { useContext } from "react";
import { DispatchContext, StateContext } from "./StateProvider";
import { dismissNotification } from "../api";
import { useNavigate } from "react-router-dom";

export default function Notifications() {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const navigate = useNavigate();

  if (!state.openNotifications || state.openNotifications.length === 0) {
    return (
      <div className="w-1/2">
        <div className="panel">
          <div className="p-2 text-2xl">Your Notifications</div>
          <div className="px-4 py-2 text-lg font-light">
            No notifications pending
          </div>
        </div>
      </div>
    );
  }
  const openNotifications = state.openNotifications.sort(
    (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
  );

  const handleDismiss = (id: string, dismissable: boolean) => {
    if (dismissable) {
      dismissNotification(id);
      dispatch({ type: "dismiss_notification", payload: { id } });
    }
  };

  return (
    <>
      <div className="w-1/2">
        <div className="panel">
          <div className="p-2 text-2xl">Your Notifications</div>
          {openNotifications.map((n) => (
            <div
              key={n.id}
              className="flex border-collapse justify-between border-b  border-b-purple-400 p-2 hover:bg-purple-300"
            >
              <div className="flex w-5/6">
                <span className="w-24 font-light">
                  {new Date(n.createdAt).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "numeric",
                    day: "numeric",
                  })}
                </span>
                <span className="w-full">{n.message}</span>
              </div>
              <div className="flex w-fit">
                {n.dismissable && (
                  <div
                    onClick={() => handleDismiss(n.id, n.dismissable)}
                    className="btn btn-purple ml-2 mr-0 px-3 py-1"
                  >
                    Dismiss
                  </div>
                )}
                {n.buttonUrl && (
                  <div
                    onClick={() => navigate("/emailconfirm")}
                    className="btn btn-green ml-2 mr-0 animate-pulse px-3 py-1 "
                  >
                    Do it!
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
