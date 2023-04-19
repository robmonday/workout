import { useEffect, useContext } from "react";
import { getWorkoutFeed } from "../api";

import { dateToWeekdayDate } from "../util";
import { DispatchContext, StateContext } from "./StateProvider";

import { EmojiIndicator, EmojiMenu } from "./Emoji";
import { WorkoutWithUserReact } from "../types";

import { ChevronRight } from "react-feather";

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
          <div key={w.id || 0}>
            <Activity workout={w} />
          </div>
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
    workout.user?.id === state.user.id
      ? "YOU"
      : `${workout.user?.firstName} ${workout.user?.lastName}`;

  return (
    <div key={workout.id} className="border-b p-2 hover:shadow-lg">
      <span className="text-purple-700">{name}</span>
      &nbsp;completed&nbsp;
      <span className="text-purple-700">{workout.workoutType?.name}</span>
      &nbsp;
      <span className="text-purple-700">
        ({workout.steps?.toLocaleString()} steps)
      </span>
      <span> at {workout.location}.</span>
      {workout.notes && <div>({workout.notes})</div>}
      <div className="  flex justify-between pt-1 text-purple-700">
        <div className="group flex">
          <ChevronRight
            className="btn m-0 rounded-sm border p-0"
            strokeWidth={1.5}
            size={18}
          />
          <div className="hidden group-hover:block group-focus:block group-active:block">
            <EmojiMenu workout={workout} />
          </div>

          <div className="inline group-hover:hidden group-focus:hidden group-active:hidden">
            <EmojiIndicator
              label="thumb up"
              symbol="👍"
              reactions={workout.reactions?.filter(
                (r) => r.emojiSymbol === "👍"
              )}
            />
            <EmojiIndicator
              label="grin"
              symbol="😀"
              reactions={workout.reactions?.filter(
                (r) => r.emojiSymbol === "😀"
              )}
            />
            <EmojiIndicator
              label="eye roll"
              symbol="🙄"
              reactions={workout.reactions?.filter(
                (r) => r.emojiSymbol === "🙄"
              )}
            />
            <EmojiIndicator
              label="tired"
              symbol="😫"
              reactions={workout.reactions?.filter(
                (r) => r.emojiSymbol === "😫"
              )}
            />
            <EmojiIndicator
              label="upset"
              symbol="😱"
              reactions={workout.reactions?.filter(
                (r) => r.emojiSymbol === "😱"
              )}
            />
          </div>
        </div>
        <div className="relative right-0 text-right font-light">
          {/* {dateToWeekdayDate(workout?.start)} */}
        </div>
      </div>
    </div>
  );
}
