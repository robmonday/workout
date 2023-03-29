import { useRef, useState } from "react";
import Panel from "./Panel";

export default function Timer() {
  const handleStart = () => {};

  return (
    <div className="w-full">
      <Panel title="Timer">
        <div className="">Here is a Timer</div>
        <br />
        <div className="btn btn-primary" onClick={handleStart}>
          Start
        </div>
        <div className="btn btn-primary">Stop</div>
      </Panel>
    </div>
  );
}
