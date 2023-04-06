import DataEntryMode from "./DataEntryMode";
import WorkoutMode from "./WorkoutMode";

import Dashboard from "./Dashboard";
import { useContext } from "react";
import { StateContext } from "./StateProvider";

import Notification from "./ToastMessage";
import Badges from "./Badges";

export default function Main() {
  const state = useContext(StateContext);
  return (
    <div className="flex justify-between">
      <div className="w-1/3">
        <div className="p-2 text-2xl">Announcements</div>
        <div className="panel min-h-[100px]">
          {!state.userObj?.emailConfirmed && (
            <Notification>Please confirm email</Notification>
          )}
          <div>one</div>
          <div>one</div>
          <div>one</div>
          <div>one</div>
        </div>
      </div>
      <div className="w-2/3">
        <Badges />
      </div>
    </div>
  );
}
