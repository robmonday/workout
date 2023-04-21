import { useEffect, useContext, useState } from "react";
import { getWorkoutFeed } from "../api";

import { dateToWeekdayDate } from "../util";
import { DispatchContext, StateContext } from "./StateProvider";

import { EmojiMenu, EmojiDisplay } from "./Emoji";
import { WorkoutWithUserReact } from "../types";

import { ChevronRight } from "react-feather";

export default function ActivityFeed() {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    getWorkoutFeed().then((data) => {
      const payload = data.slice(0, 30);
      payload && dispatch({ type: "set_activity_feed", payload });
    });
  }, [state.latestReaction]);
  // console.log("state.activityFeed", state.activityFeed);
  return (
    <>
      <div className="md:text-2xl-2xl p-2 text-lg sm:text-xl">
        Activity Feed
      </div>
      <div className="panel min-h-[60%] max-h-[70vh] overflow-y-auto">
        {state.activityFeed.length > 0 ? (
          state.activityFeed.map((w) => <Activity key={w.id} workout={w} />)
        ) : (
          <div className="px-4 py-2 text-lg font-light">No recent info</div>
        )}
      </div>
    </>
  );
}

type ActivityProps = {
  workout: WorkoutWithUserReact;
};
export function Activity({ workout }: ActivityProps) {
  const [expanded, setExpanded] = useState(false);
  const state = useContext(StateContext);
  const name =
    workout.user?.id === state.user.id
      ? "YOU"
      : `${workout.user?.firstName} ${workout.user?.lastName}`;
  // console.log("Activity component workout prop", workout);
  const styleNotesHeight = expanded ? "h-fit" : "h-8 truncate";
  return (
    <div key={workout.id} className="border-b px-2 py-1 hover:shadow-lg">
      <span className="text-purple-700">{name}</span>
      &nbsp;completed&nbsp;
      <span className="text-purple-700">{workout.workoutType?.name}</span>
      &nbsp;
      <span className="text-purple-700">
        ({workout.steps?.toLocaleString()} steps)
      </span>
      <span> at {workout.location}.</span>
      {workout.notes && (
        <div
          className={`ml-5 w-[85%] cursor-pointer overflow-hidden rounded-lg bg-purple-200 px-2 py-1 text-gray-600 ${styleNotesHeight}`}
          onClick={() => {
            setExpanded(!expanded);
          }}
        >
          {workout.notes.slice(0, 1).toUpperCase() + workout.notes.slice(1)}
        </div>
      )}
      <div className="flex justify-between">
        <div className="flex flex-grow">
          <div className="group/buttons flex align-bottom">
            <ChevronRight
              className="btn m-0 mr-2 mt-1 rounded border bg-purple-400 p-0 text-purple-100"
              strokeWidth={2}
              size={18}
            />
            <div className="relative top-1 -left-0 hidden h-8 w-0 overflow-visible group-hover/buttons:inline group-focus/buttons:inline group-active/buttons:inline">
              <EmojiMenu workout={workout} />
            </div>
          </div>
          <EmojiDisplay workout={workout} />
        </div>

        <div className="text-right font-light">
          {dateToWeekdayDate(workout?.start)}
        </div>
      </div>
    </div>
  );
}
