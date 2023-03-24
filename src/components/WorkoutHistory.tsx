import { useEffect, useContext } from "react";
import { StateContext, DispatchContext } from "./StateProvider";

import { getAllWorkouts, createWorkout, deleteWorkout } from "../api";
import { Plus, Edit2, Trash2 } from "react-feather";

import { Workout } from "../types";

import { dateToWeekdayDate, dateToTime, enumToTitleCase } from "../util";

export default function WorkoutHistory() {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    getAllWorkouts().then((w: Workout[]) => {
      const sortedWorkouts = w.sort(
        (a: Workout, b: Workout) => Date.parse(b.start) - Date.parse(a.start)
      );
      dispatch({ type: "set_workouts", payload: sortedWorkouts });
    });
  }, []);

  return (
    <div className="px-2">
      <div className="p-2 text-2xl">Workout History</div>
      <div className="flex h-96">
        <div className="min-h-96 m-2 w-1/4  rounded-lg border bg-gradient-to-br from-purple-200 to-purple-300 px-2 ">
          <WorkoutSearchBar />
          <WorkoutHistoryList />
        </div>
        <div className="m-2 h-auto  w-3/4 rounded-lg border bg-gradient-to-br from-purple-200 to-purple-300 p-4 ">
          {state.workouts.length > 0 && (
            <WorkoutDetail
              workout={state.selectedWorkout || state.workouts[0]}
            />
          )}
        </div>
      </div>

      <div className="border bg-purple-400 p-2">
        <div className="p-2">{JSON.stringify(state)}</div>
      </div>
    </div>
  );
}

const WorkoutHistoryList = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const handleClick = (id: string) => {
    const selectedWorkout = state.workouts.find((w) => w.id === id);
    dispatch({ type: "select_workout", payload: selectedWorkout });
  };
  return (
    <>
      <div
        onClick={() => dispatch({ type: "add_workout" })}
        className="text-gray-00 ml-1 inline-block rounded hover:bg-purple-500 hover:text-white active:bg-purple-700"
      >
        <Plus strokeWidth={0.75} />
      </div>
      <div className="overflow-y-scroll">
        {state.workouts.map((w) => (
          <div
            key={w.id}
            onClick={() => handleClick(w.id)}
            className="my-2 rounded-lg border border-purple-500 p-2 hover:bg-purple-300 active:translate-y-0.5 active:bg-purple-400"
          >
            <div className="inline-block">
              <div className="inline-block">
                {w.type && enumToTitleCase(w.type)}
              </div>
              <div className="inline-block font-light text-purple-700">
                <div className="ml-3 inline">
                  {w.start && dateToWeekdayDate(w.start)}
                </div>
              </div>
            </div>
            <div className="float-right inline-block">
              <div
                onClick={() =>
                  dispatch({ type: "edit_workout", payload: w.id })
                }
                className="text-gray-00 ml-1 inline-block rounded hover:bg-purple-500 hover:text-white active:bg-purple-700"
              >
                <Edit2 className="inline" strokeWidth={0.75} />
              </div>
              <div
                onClick={() =>
                  dispatch({ type: "delete_workout", payload: w.id })
                }
                className="text-gray-00 ml-1 inline-block rounded hover:bg-purple-500 hover:text-white active:bg-purple-700"
              >
                <Trash2 className="inline-block" strokeWidth={0.75} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const WorkoutSearchBar = () => {
  return (
    <>
      <div className="text-md my-4 border bg-gray-50 py-2 px-2 text-gray-500">
        Search Bar
      </div>
    </>
  );
};

type WorkoutDetailProps = {
  workout: Workout;
};

const WorkoutDetail = ({ workout }: WorkoutDetailProps) => {
  const minutes = Math.floor(
    (Date.parse(workout.end) - Date.parse(workout.start)) / (1000 * 60)
  );
  return (
    <>
      <div className="mb-3">
        <div className="inline text-2xl font-light">
          {enumToTitleCase(workout.type)}
        </div>
        <div className="ml-4 inline text-purple-800">
          {dateToTime(workout.start)}
        </div>
      </div>
      <div className="">
        <div className="my-2 text-gray-900">{workout.notes}</div>
        <div className="my-2 text-gray-900">
          {minutes > 0 && <span>{minutes} minutes</span>}
        </div>
        <div className="my-2 text-gray-900">
          {workout.steps && `${workout.steps.toLocaleString("en-US")} steps`}
        </div>
        <div className="my-2 text-gray-900">
          {workout.distance && `${workout.distance} miles`}
        </div>
        <div className="my-2 text-gray-900">
          {workout.calories &&
            `${workout.calories.toLocaleString("en-US")} calories`}
        </div>
      </div>
    </>
  );
};
