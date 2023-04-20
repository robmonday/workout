import { useContext } from "react";
import { Reaction, WorkoutWithUserReact } from "../types";
import { DispatchContext, StateContext } from "./StateProvider";
import { createReaction } from "../api";

type EmojiProps = {
  label: string;
  symbol: string;
  reactions?: Reaction[];
};

// purely a display component providing accesibility features
export function Emoji({ label, symbol }: EmojiProps) {
  return (
    <>
      <span
        className="hover:-translate-y-0.5 active:translate-y-1"
        role="img"
        aria-label={label ? label : ""}
        aria-hidden={label ? "false" : "true"}
      >
        {symbol}
      </span>
    </>
  );
}

type EmojiPlus = EmojiProps & {
  workout: WorkoutWithUserReact;
};

export function EmojiIndicator({ label, symbol, workout }: EmojiPlus) {
  const state = useContext(StateContext);
  const reactions = workout.reactions.filter(
    (r: any) => r.emojiSymbol === symbol
  );
  // console.log("reactions", reactions);
  if (reactions?.length === 0) return <></>;
  return (
    <>
      <div className="group/names  rounded-t-md pr-3 text-2xl hover:-translate-y-0.5 hover:bg-purple-100 ">
        <Emoji label={label} symbol={symbol} />
        <div className="inline text-base font-light">{reactions?.length}</div>
        <div className="hidden h-0 w-6 overflow-visible text-sm font-light group-hover/names:block ">
          <div className="w-32 rounded-b-md rounded-tr-md bg-purple-100 px-2 py-1  ">
            {reactions?.map((r) => (
              <div key={r.id}>
                {r.userId === state.user.id ? (
                  <span className="font-semibold text-purple-700">YOU</span>
                ) : (
                  <span>
                    {r.user?.firstName} {r.user?.lastName}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export function EmojiButton({ label, symbol, workout }: EmojiPlus) {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const handleReaction = async () => {
    const placeholderReaction = {
      id: "",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      seed: false,
      userId: state.user.id,
      emojiSymbol: symbol,
      workoutId: workout.id,
      workout,
    };

    const newReaction = await createReaction(symbol, workout.id);

    dispatch({
      type: "update_activity_reaction",
      payload: newReaction,
    });

    dispatch({ type: "set_latest_reaction", payload: placeholderReaction });
  };
  return (
    <>
      <div
        className="inline rounded-md border-2 border-purple-100 bg-purple-400 px-1 text-2xl hover:-translate-y-0.5 hover:scale-125 active:translate-y-0.5 active:scale-100 active:bg-purple-100"
        onClick={handleReaction}
      >
        <Emoji label={label} symbol={symbol} />
      </div>
    </>
  );
}

type EmojiDisplayProps = {
  workout: WorkoutWithUserReact;
};
export function EmojiDisplay({ workout }: EmojiDisplayProps) {
  return (
    <>
      <EmojiIndicator label="thumb up" symbol="👍" workout={workout} />
      <EmojiIndicator label="grin" symbol="😀" workout={workout} />
      <EmojiIndicator label="eye roll" symbol="🙄" workout={workout} />
      <EmojiIndicator label="tired" symbol="😫" workout={workout} />
      <EmojiIndicator label="upset" symbol="😱" workout={workout} />
    </>
  );
}

type EmojiMenuProps = {
  workout: WorkoutWithUserReact;
};
export function EmojiMenu({ workout }: EmojiMenuProps) {
  return (
    <div className="w-40 cursor-pointer rounded bg-purple-100 px-2 py-1">
      <div className="pb-1 text-sm">My Reaction: </div>
      <div className="flex flex-wrap">
        <EmojiButton label="thumb up" symbol="&#x1F44D;" workout={workout} />
        <EmojiButton label="grin" symbol="&#x1F600;" workout={workout} />
        <EmojiButton label="eye roll" symbol="&#x1F644;" workout={workout} />
        <EmojiButton label="tired" symbol="&#x1F62B;" workout={workout} />
        <EmojiButton label="upset" symbol="&#x1F631;" workout={workout} />
      </div>
    </div>
  );
}
