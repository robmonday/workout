import { useRef, useState } from "react";
import Panel from "./Panel";

export default function Timer() {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [now, setNow] = useState<number | null>(null);
  const [timerOn, setTimerOn] = useState<boolean>(false);
  const intervalRef = useRef<number | undefined>(undefined);

  const handleStart = () => {
    setTimerOn(true);
    setStartTime(Date.now());
    setNow(Date.now());

    clearInterval(intervalRef.current);

    const intervalId = setInterval(() => {
      setNow(Date.now());
    }, 10);
    intervalRef.current = intervalId;
  };

  const handleStop = () => {
    setTimerOn(false);
    clearInterval(intervalRef.current);
  };

  const handleClear = () => {
    setStartTime(Date.now());
    setNow(Date.now());
  };

  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
  }

  const minutesPassed = Math.floor(secondsPassed / 60);
  const hoursPassed = Math.floor(minutesPassed / 60);

  return (
    <div className="inline-flex border">
      <Panel title="Timer">
        <div className="border px-6 py-4">
          {hoursPassed.toString().padStart(2, "0")}:
          {minutesPassed.toString().padStart(2, "0")}:
          {secondsPassed.toFixed(2).padStart(5, "0")}
        </div>
        <div className="">
          {timerOn === false ? (
            <div className="btn btn-green py-2 px-6" onClick={handleStart}>
              Start
            </div>
          ) : (
            <div className="btn btn-red py-2 px-6" onClick={handleStop}>
              Stop
            </div>
          )}
          <div className="btn btn-secondary py-2 px-4" onClick={handleClear}>
            Reset
          </div>
        </div>
      </Panel>
    </div>
  );
}
