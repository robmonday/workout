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

export function EmojiIndicator({ label, symbol, reactions }: EmojiProps) {
  if (reactions?.length === 0) return <></>;
  return (
    <>
      <div className="inline pl-3 text-2xl hover:-translate-y-0.5">
        <Emoji label={label} symbol={symbol} />
        <div className="inline text-base font-light">{reactions?.length}</div>
      </div>
    </>
  );
}

type EmojiButtonProps = EmojiProps & {
  workout: WorkoutWithUserReact;
};
export function EmojiButton({ label, symbol, workout }: EmojiButtonProps) {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const handleReaction = () => {
    const newReaction = createReaction(symbol, workout.id);
    dispatch({type: 'create_activity_reaction', payload: newReaction})

    alert("handleReaction() called");
    // const newReaction = {
    //   id: "",
    //   createdAt: "",
    //   updatedAt: "",
    //   emojiSymbol: symbol,
    //   seed: "",
    //   userId: state.user.id,
    //   workoutId: "",
    // };
    // dispatch({
    //   type: "set_activity_reaction",
    //   payload: { newReaction, workout },
    // });
  };
  return (
    <>
      <div
        className="mx-2 inline-flex rounded-md bg-purple-400 px-1 text-2xl hover:-translate-y-1 active:translate-y-0.5"
        onClick={handleReaction}
      >
        <Emoji label={label} symbol={symbol} />
      </div>
    </>
  );
}

type EmojiMenuProps = {
  workout: WorkoutWithUserReact;
};
export function EmojiMenu({ workout }: EmojiMenuProps) {
  return (
    <div className="cursor-pointer">
      <EmojiButton label="thumb up" symbol="&#x1F44D;" workout={workout} />
      <EmojiButton label="grin" symbol="&#x1F600;" workout={workout} />
      <EmojiButton label="eye roll" symbol="&#x1F644;" workout={workout} />
      <EmojiButton label="tired" symbol="&#x1F62B;" workout={workout} />
      <EmojiButton label="upset" symbol="&#x1F631;" workout={workout} />
    </div>
  );
}
