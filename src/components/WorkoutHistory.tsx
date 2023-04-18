import { useEffect, useContext } from "react";
import { StateContext, DispatchContext } from "./StateProvider";

import { getAllWorkouts, deleteWorkout } from "../api";

import WorkoutForm from "./WorkoutForm";

import { Plus, Edit2, Trash2 } from "react-feather";

import { Workout } from "../types";

import { dateToWeekdayDate, dateToTime } from "../util";

export default function WorkoutHistory() {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const handleDeleteWorkout = (id: string) => {
    deleteWorkout(id);
    dispatch({ type: "delete_workout", payload: id });
    dispatch({ type: "select_workout" });
  };

  return (
    <>
      <div className="p-2 text-2xl">My Data</div>
      <div className="panel flex">
        <div className="flex w-1/2 lg:w-1/3 ">
          <div className="flex w-full flex-col rounded-lg border-2 border-purple-400 py-1 px-3">
            <WorkoutSearchBar />
            <WorkoutHistoryList handleDeleteWorkout={handleDeleteWorkout} />
          </div>
        </div>
        <div className="w-1/2 align-top lg:w-2/3">
          <div className="px-6 py-4">
            {state.detailPanelDisplay === "WorkoutDetail" &&
              state.workouts?.length > 0 && (
                <WorkoutDetail
                  workoutId={state.selectedWorkout || state.workouts[0].id}
                  handleDeleteWorkout={handleDeleteWorkout}
                />
              )}
            {state.detailPanelDisplay === "WorkoutFormAdd" && (
              <WorkoutForm
                hide={() => dispatch({ type: "hide_workout_form" })}
              />
            )}
            {state.detailPanelDisplay === "WorkoutFormEdit" && (
              <WorkoutForm
                hide={() => dispatch({ type: "hide_workout_form" })}
                workout={state.workoutToEdit}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

type WorkoutHistoryListProps = {
  handleDeleteWorkout: (id: string) => void;
};

const WorkoutHistoryList = ({
  handleDeleteWorkout,
}: WorkoutHistoryListProps) => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    getAllWorkouts().then((workouts: Workout[]) => {
      const sortedWorkouts =
        workouts &&
        workouts.sort(
          (a: Workout, b: Workout) => Date.parse(b.start) - Date.parse(a.start)
        );
      dispatch({ type: "set_workouts", payload: sortedWorkouts });
      dispatch({ type: "select_workout" });
    });
  }, [state.updatedWorkout]);

  const filteredWorkouts = state.workouts?.filter((w) => {
    return (
      w.notes?.toLowerCase().includes(state.workoutFilterText.toLowerCase()) ||
      w.workoutType?.name
        .toLowerCase()
        .includes(state.workoutFilterText.toLowerCase()) ||
      w.location?.toLowerCase().includes(state.workoutFilterText.toLowerCase())
    );
  });

  return (
    <div className="">
      <div
        onClick={() => dispatch({ type: "show_workout_form_blank" })}
        className="text-gray-00 ml-1 inline-block rounded hover:bg-purple-500 hover:text-white active:bg-purple-700"
      >
        <Plus strokeWidth={0.75} />
      </div>
      <div className="h-[60vh] overflow-y-auto">
        {filteredWorkouts?.map((w) => (
          <div
            key={w.id}
            className={`my-2 flex justify-between rounded-lg border border-purple-500 p-2 hover:bg-purple-300 focus:bg-purple-500 active:translate-y-0.5 active:bg-purple-400 ${
              w.id === state.selectedWorkout && "bg-purple-400 font-semibold"
            }`}
          >
            <span
              className="flex-grow"
              onClick={() =>
                dispatch({ type: "select_workout", payload: w.id })
              }
            >
              <div className="inline-block">{w.workoutType?.name}</div>
              <div className="hidden font-light text-purple-700 sm:inline-block">
                <div className="ml-3 inline">
                  {w.start && dateToWeekdayDate(w.start)}
                </div>
              </div>
            </span>
            <span className="flex-none">
              <div
                onClick={() =>
                  dispatch({
                    type: "show_workout_form_populated",
                    payload: w,
                  })
                }
                className="text-gray-00 ml-1 inline-block rounded hover:bg-purple-500 hover:text-white active:bg-purple-700"
              >
                <Edit2 className="inline" strokeWidth={0.75} />
              </div>
              <div
                onClick={() => handleDeleteWorkout(w.id)}
                className="text-gray-00 ml-1 inline-block rounded hover:bg-purple-500 hover:text-white active:bg-purple-700"
              >
                <Trash2 className="inline-block" strokeWidth={0.75} />
              </div>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const WorkoutSearchBar = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  return (
    <>
      <form>
        <input
          type="text"
          value={state.workoutFilterText}
          onChange={(e) =>
            dispatch({ type: "update_workout_filter", payload: e.target.value })
          }
          placeholder="Start typing to filter..."
          className="input mt-2 w-full text-gray-500"
        />
      </form>
    </>
  );
};

type WorkoutDetailProps = {
  workoutId: string;
  handleDeleteWorkout: (id: string) => void;
};

const WorkoutDetail = ({
  workoutId,
  handleDeleteWorkout,
}: WorkoutDetailProps) => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const workout = state.workouts.find((w) => w.id === workoutId);
  if (!workout) {
    return <div>No Workout Selected</div>;
  }
  const minutes = Math.floor(
    (Date.parse(workout.end) - Date.parse(workout.start)) / (1000 * 60)
  );
  return (
    <>
      <div className="mb-3">
        <div className="mb-4 inline text-2xl font-light">
          {workout?.workoutType?.name}
        </div>
        <div
          onClick={() => handleDeleteWorkout(workout.id)}
          className="text-gray-00 float-right ml-1 inline rounded hover:bg-purple-500 hover:text-white active:bg-purple-700"
        >
          <Trash2 className="inline-block" strokeWidth={0.75} />
        </div>
        <div
          onClick={() =>
            dispatch({
              type: "show_workout_form_populated",
              payload: workout,
            })
          }
          className="text-gray-00 float-right ml-1 inline rounded hover:bg-purple-500 hover:text-white active:bg-purple-700"
        >
          <Edit2 className="inline" strokeWidth={0.75} />
        </div>
      </div>
      <div>
        <div className="my-2 inline text-purple-800">
          {dateToTime(workout.start)}
        </div>
        <div className="ml-4 inline text-purple-800">{workout.location}</div>
      </div>
      <div className="">
        <div className="my-2 text-gray-900">{workout.notes}</div>
        <div className="my-2 text-gray-900">
          {minutes > 0 && <span>{minutes} minutes</span>}
        </div>
        <div className="my-2 text-gray-900">
          {workout.steps > 0 &&
            `${workout.steps.toLocaleString("en-US")} steps`}
        </div>
        <div className="my-2 text-gray-900">
          {workout.distance > 0 && `${workout.distance} miles`}
        </div>
        <div className="my-2 text-gray-900">
          {workout.calories > 0 &&
            `${workout.calories.toLocaleString("en-US")} calories`}
        </div>
      </div>
    </>
  );
};
