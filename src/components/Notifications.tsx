import { useContext } from "react";
import { DispatchContext, StateContext } from "./StateProvider";
import { dismissNotification } from "../api";
import { useNavigate } from "react-router-dom";

import { Notification } from "../types";

export default function Notifications() {
  const state = useContext(StateContext);

  if (!state.openNotifications || state.openNotifications.length === 0) {
    return (
      <div className="xl:w-2/3">
        <div className="panel">
          <div className="p-2 text-lg sm:text-xl md:text-2xl">
            Your Notifications
          </div>
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

  return (
    <>
      <div className="xl:w-2/3">
        <div className="panel">
          <div className="p-2 text-xl sm:text-2xl">Your Notifications</div>
          {openNotifications.map((n) => (
            <div key={n.id}>
              <NotificationLine notification={n} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

type NotificationProps = {
  notification: Notification;
};

export const NotificationLine = ({ notification }: NotificationProps) => {
  const dispatch = useContext(DispatchContext);

  const navigate = useNavigate();

  const handleDismiss = (id: string, dismissable: boolean) => {
    if (dismissable) {
      dismissNotification(id);
      dispatch({ type: "dismiss_notification", payload: { id } });
    }
  };

  return (
    <>
      <div className="flex border-collapse flex-wrap justify-between border-b  border-b-purple-400 p-2 hover:bg-purple-300">
        <div className="inline-flex text-sm sm:text-base">
          <div className="mr-1 w-24 font-light">
            {new Date(notification.createdAt).toLocaleDateString("en-US", {
              weekday: "short",
              month: "numeric",
              day: "numeric",
            })}
          </div>

          <div className="flex-shrink flex-grow text-sm sm:text-base">
            {notification.message}
          </div>
        </div>
        <div className="ml-auto block md:inline">
          {notification.dismissable && (
            <div
              onClick={() =>
                handleDismiss(notification.id, notification.dismissable)
              }
              className="btn btn-purple ml-2 mr-0 px-3 py-1 text-sm sm:text-base"
            >
              Dismiss
            </div>
          )}
          {notification.buttonUrl && (
            <div
              onClick={() => navigate(notification.buttonUrl)}
              className="btn btn-green ml-2 mr-0 animate-pulse px-3 py-1 text-sm sm:text-base"
            >
              Go
            </div>
          )}
        </div>
      </div>
    </>
  );
};
