import { useContext } from "react";
import { DispatchContext, StateContext } from "./StateProvider";
import { dismissNotification } from "../api";
import { useNavigate } from "react-router-dom";
import { sendEmailConfirm } from "../api";

import { Notification, UserObj } from "../types";

export default function Notifications() {
  const state = useContext(StateContext);

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

  return (
    <>
      <div className="w-1/2">
        <div className="panel">
          <div className="p-2 text-2xl">Your Notifications</div>
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

  const userJSON = localStorage.getItem("user");
  const userObj = userJSON && JSON.parse(userJSON);
  // console.log(userObj);

  const navigate = useNavigate();

  const handleDismiss = (id: string, dismissable: boolean) => {
    if (dismissable) {
      dismissNotification(id);
      dispatch({ type: "dismiss_notification", payload: { id } });
    }
  };

  const handleEmailConfirm = (userObj: UserObj) => {
    sendEmailConfirm(userObj);
    navigate("/emailconfirm");
  };

  return (
    <>
      <div className="flex border-collapse justify-between border-b  border-b-purple-400 p-2 hover:bg-purple-300">
        <div className="flex w-5/6">
          <span className="w-24 font-light">
            {new Date(notification.createdAt).toLocaleDateString("en-US", {
              weekday: "short",
              month: "numeric",
              day: "numeric",
            })}
          </span>
          <span className="w-full">{notification.message}</span>
        </div>
        <div className="flex w-fit">
          {notification.dismissable && (
            <div
              onClick={() =>
                handleDismiss(notification.id, notification.dismissable)
              }
              className="btn btn-purple ml-2 mr-0 px-3 py-1"
            >
              Dismiss
            </div>
          )}
          {notification.buttonUrl && (
            <div
              onClick={() => handleEmailConfirm(userObj)}
              className="btn btn-green ml-2 mr-0 animate-pulse px-3 py-1 "
            >
              Do it!
            </div>
          )}
        </div>
      </div>
    </>
  );
};
