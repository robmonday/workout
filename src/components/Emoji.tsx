import { useState } from "react";
import { Reaction } from "../types";

type EmojiProps = {
  label: string;
  symbol: string;
  reactions: Reaction[];
};

export function EmojiButton(props: EmojiProps) {
  if (props.reactions.length === 0) return <></>;
  return (
    <>
      <div
        // onClick={() => alert("click")}
        className="pl-3 inline text-2xl hover:-translate-y-0.5 active:translate-y-1"
      >
        <Emoji {...props} />
        <div className="inline text-base font-light">
          {props.reactions.length}
        </div>
      </div>
    </>
  );
}

// purely a display component providing accesibility features
export function Emoji({ label, symbol }: EmojiProps) {
  return (
    <>
      <span
        className="emoji"
        role="img"
        aria-label={label ? label : ""}
        aria-hidden={label ? "false" : "true"}
      >
        {symbol}
      </span>
    </>
  );
}
