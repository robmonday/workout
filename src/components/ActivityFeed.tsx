import { useEffect, useContext } from "react";
import { getWorkoutFeed } from "../api";

import { dateToWeekdayDate } from "../util";
import { DispatchContext, StateContext } from "./StateProvider";

import { EmojiButton } from "./Emoji";
import { WorkoutWithUserReact } from "../types";

export default function ActivityFeed() {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    getWorkoutFeed().then((data) => {
      const payload = data.slice(0, 30);
      dispatch({ type: "set_activity_feed", payload });
    });
  }, []);
  return (
    <>
      <div className="p-2 text-2xl">Activity Feed</div>
      <div className="panel h-fit max-h-[70vh] overflow-y-auto">
        {state.activityFeed.map((w) => (
          <Activity key={w.id} workout={w} />
        ))}
      </div>
    </>
  );
}

type ActivityProps = {
  workout: WorkoutWithUserReact;
};
export function Activity({ workout }: ActivityProps) {
  const state = useContext(StateContext);
  const name =
    workout.user.id === state.user.id
      ? "YOU"
      : `${workout.user.firstName} ${workout.user.lastName}`;

  workout.reactions;

  return (
    <div key={workout.id} className="border-b p-2 hover:shadow-lg">
      <span className="text-purple-700">{name}</span>
      &nbsp;completed&nbsp;
      <span className="text-purple-700">{workout.workoutType?.name}</span>
      &nbsp;
      <span className="text-purple-700">
        ({workout.steps.toLocaleString()} steps)
      </span>
      <span> at {workout.location}.</span>
      {workout.notes && <div>({workout.notes})</div>}
      <div className=" flex justify-between pt-1 text-purple-700">
        <div>
          <EmojiButton
            label="thumb up"
            symbol="&#x1F44D;"
            reactions={workout.reactions.filter(
              (r) => r.emojiSymbol === "&#x1F44D;"
            )}
          />
          <EmojiButton
            label="grin"
            symbol="&#x1F600;"
            reactions={workout.reactions.filter(
              (r) => r.emojiSymbol === "&#x1F600;"
            )}
          />
          <EmojiButton
            label="eye roll"
            symbol="&#x1F644;"
            reactions={workout.reactions.filter(
              (r) => r.emojiSymbol === "&#x1F644;"
            )}
          />
          <EmojiButton
            label="tired"
            symbol="&#x1F62B;"
            reactions={workout.reactions.filter(
              (r) => r.emojiSymbol === "&#x1F62B;"
            )}
          />
          <EmojiButton
            label="afraid"
            symbol="&#x1F631;"
            reactions={workout.reactions.filter(
              (r) => r.emojiSymbol === "&#x1F631;"
            )}
          />
        </div>
        <div className="relative right-0 inline text-right font-light">
          {dateToWeekdayDate(workout.start)}
        </div>
      </div>
    </div>
  );
}
