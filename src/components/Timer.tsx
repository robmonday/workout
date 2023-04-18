import { useRef, useState } from "react";
import WorkoutForm from "./WorkoutForm";

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
    <div className="align-top ">
      <div className="p-2 text-2xl">Workout Timer</div>
      <div className="panel p-4">
        <div className="mb-6 flex flex-wrap justify-center rounded-lg border border-purple-500 p-2">
          <div className="px-6 py-4 text-center">
            {hoursPassed.toString().padStart(2, "0")}:
            {(minutesPassed % 60).toString().padStart(2, "0")}:
            {(secondsPassed % 60).toFixed(2).padStart(5, "0")}
          </div>
          <div>
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
        </div>
        <div className="border border-purple-500 p-6">
          <WorkoutForm />
        </div>
      </div>
    </div>
  );
}
