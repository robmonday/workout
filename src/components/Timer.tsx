import { useContext, useRef, useState } from "react";
import WorkoutForm from "./WorkoutForm";
import { DispatchContext, StateContext } from "./StateProvider";

export default function Timer() {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [now, setNow] = useState<number | null>(null);
  const [timerOn, setTimerOn] = useState<boolean>(false);
  const intervalRef = useRef<number | undefined>(undefined);

  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleStart = () => {
    setTimerOn(true);
    setStartTime(Date.now());
    setNow(Date.now());
    setSubmitted(false);

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
    setSubmitted(false);
    setShowForm(false);
  };

  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
  }

  const minutesPassed = Math.floor(secondsPassed / 60);
  const hoursPassed = Math.floor(minutesPassed / 60);

  return (
    <div className="align-top ">
      <div className="p-2 text-2xl">Start Your Workout</div>
      <div className="panel p-4 pb-2">
        <div className="text-left text-lg">Workout Timer</div>
        <div className="flex justify-center">
          <div className="w-42">
            {submitted && (
              <div className="px-6 py-4 text-center text-xl font-light italic text-green-800">
                Submitted
              </div>
            )}
            {!submitted && secondsPassed === 0 && (
              <div className="px-6 py-4 text-center text-xl font-light italic text-gray-500">
                Ready?
              </div>
            )}
            {!submitted && timerOn && (
              <div className="px-6 py-4 text-center text-xl font-light italic text-green-600">
                Go!
              </div>
            )}
            {timerOn === false && secondsPassed > 0 && !submitted && (
              <div
                onClick={() => setShowForm(true)}
                className="btn btn-purple px-4"
              >
                Create Workout
              </div>
            )}
          </div>
          <div className="mb-4 w-48 rounded-md border border-purple-500 bg-purple-100 px-4 py-2 text-center text-3xl font-light">
            {hoursPassed.toString().padStart(2, "0")}:
            {(minutesPassed % 60).toString().padStart(2, "0")}:
            {(secondsPassed % 60).toFixed(2).padStart(5, "0")}
          </div>
        </div>
        <div className="flex flex-wrap justify-evenly ">
          <div className="flex justify-center ">
            {timerOn === false ? (
              <div className="btn btn-green px-6" onClick={handleStart}>
                Start
              </div>
            ) : (
              <div className="btn btn-red px-6" onClick={handleStop}>
                Stop
              </div>
            )}
            <div className="btn btn-secondary mr-0 px-4" onClick={handleClear}>
              Reset
            </div>
          </div>
        </div>
        {showForm && (
          <div className="mt-4 rounded-lg border border-purple-500 p-6 ">
            <WorkoutForm
              hide={() => setShowForm(false)}
              setSubmitted={setSubmitted}
              minutes={Math.round(secondsPassed / 60)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
