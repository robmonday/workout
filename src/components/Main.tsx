import { useEffect, useState } from "react";
import { getAllWorkouts } from "../api";
import { Link } from "react-router-dom";

export default function Main() {
  return (
    <>
      <WorkoutHistory />
    </>
  );
}

enum WORKOUT_TYPE {
  WALK_OUTDOORS,
  WALK_INDOORS,
  RUN_OUTDOORS,
  RUN_INDOORS,
  BICYCLE,
  SWIM,
  WEIGHT_LIFT,
  YOGA,
  OTHER,
}

type Workout = {
  id: string;
  createdAt: string;
  updatedAt: string;
  type: WORKOUT_TYPE;
  start: string;
  end: string;
  distance: string;
  steps: number;
  notes: string | null;
  description?: string;
};

function WorkoutHistory() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    getAllWorkouts().then((workouts) => setWorkouts(workouts));
  }, []);

  return (
    <div className="p-2">
      <div className="p-2 text-2xl">Workout History</div>
      <div className="flex">
        <div className="m-2 h-60 w-1/3 rounded-lg border bg-gradient-to-br from-purple-200 to-purple-300 px-2">
          {workouts.map((w) => (
            <div
              key={w.id}
              className="my-2 rounded-lg border border-purple-500 p-2 hover:bg-purple-300 active:translate-y-0.5 active:bg-purple-400"
            >
              {w.notes}
            </div>
          ))}
        </div>
        <div className="m-2 h-60 w-2/3 rounded-lg border bg-gradient-to-br from-purple-200 to-purple-300 p-4">
          Detail for a single entry
        </div>
      </div>
    </div>
  );
}
