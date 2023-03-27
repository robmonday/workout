import { useEffect, useContext, useState, Fragment } from "react";
import { StateContext, DispatchContext } from "./StateProvider";

import {
  createWorkout,
  getAllWorkouts,
  getAllWorkoutTypes,
  deleteWorkout,
} from "../api";
import { ArrowLeft, Plus, Edit2, Trash2 } from "react-feather";

import { Workout, WorkoutType } from "../types";

import { dateToWeekdayDate, dateToTime } from "../util";

import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

export default function WorkoutHistory() {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    getAllWorkouts().then((workouts: Workout[]) => {
      const sortedWorkouts = workouts.sort(
        (a, b) => Date.parse(b.start) - Date.parse(a.start)
      );
      dispatch({ type: "set_workouts", payload: sortedWorkouts });
    });
  }, [state.updatedWorkout]);

  return (
    <div className="px-2">
      <div className="p-2 text-2xl">Workout History</div>
      <div className="flex h-auto">
        <div className="m-2 w-1/4  rounded-lg border bg-gradient-to-br from-purple-200 to-purple-300 px-2">
          <WorkoutSearchBar />
          <WorkoutHistoryList />
        </div>
        <div className="m-2 h-auto  w-3/4 rounded-lg border bg-gradient-to-br from-purple-200 to-purple-300 p-4 ">
          {state.detailPanelDisplay === "WorkoutDetail" &&
            state.workouts.length > 0 && (
              <WorkoutDetail
                workout={state.selectedWorkout || state.workouts[0]}
              />
            )}
          {state.detailPanelDisplay === "WorkoutFormAdd" && <WorkoutForm />}
          {state.detailPanelDisplay === "WorkoutFormEdit" && (
            <WorkoutForm workout={state.workoutToEdit} />
          )}
        </div>
      </div>

      {/* Displays State on Page */}
      <div className=" border bg-purple-400 p-2">
        <div className="p-2">{JSON.stringify(state)}</div>
      </div>
    </div>
  );
}

const WorkoutHistoryList = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const handleSelect = (id: string) => {
    const selectedWorkout = state.workouts.find((w) => w.id === id);
    dispatch({ type: "select_workout", payload: selectedWorkout });
  };

  const filteredWorkouts = state.workouts.filter((w) => {
    return (
      w.notes?.toLowerCase().includes(state.filterText.toLowerCase()) ||
      w.workoutType?.name
        .toLowerCase()
        .includes(state.filterText.toLowerCase()) ||
      w.location?.toLowerCase().includes(state.filterText.toLowerCase())
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
      <div className="h-60 overflow-y-auto ">
        {filteredWorkouts.map((w) => (
          <div
            key={w.id}
            onClick={() => handleSelect(w.id)}
            className="my-2 rounded-lg border border-purple-500 p-2 hover:bg-purple-300 active:translate-y-0.5 active:bg-purple-400"
          >
            <div className="inline-block">
              <div className="inline-block">{w.workoutType?.name}</div>
              <div className="inline-block font-light text-purple-700">
                <div className="ml-3 inline">
                  {w.start && dateToWeekdayDate(w.start)}
                </div>
              </div>
            </div>
            <div className="float-right inline-block">
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
                onClick={() => {
                  deleteWorkout(w.id);
                  dispatch({ type: "delete_workout", payload: w.id });
                }}
                className="text-gray-00 ml-1 inline-block rounded hover:bg-purple-500 hover:text-white active:bg-purple-700"
              >
                <Trash2 className="inline-block" strokeWidth={0.75} />
              </div>
            </div>
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
          value={state.filterText}
          onChange={(e) =>
            dispatch({ type: "update_filter_text", payload: e.target.value })
          }
          placeholder="Start typing to filter..."
          className="input mt-4 w-full py-2 px-2 text-gray-500"
        />
      </form>
    </>
  );
};

type WorkoutDetailProps = {
  workout: Workout;
};

const WorkoutDetail = ({ workout }: WorkoutDetailProps) => {
  const dispatch = useContext(DispatchContext);
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
          onClick={() =>
            dispatch({ type: "delete_workout", payload: workout.id })
          }
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

type FormData = {
  location: string;
  distance: string;
  steps: string;
  calories: string;
  notes: string | null;
  workoutTypeId: string;
};

type WorkoutFormProps = {
  workout?: Workout;
};

const WorkoutForm = ({ workout }: WorkoutFormProps) => {
  const dispatch = useContext(DispatchContext);
  const navigate = useNavigate();

  const [workoutTypes, setWorkoutTypes] = useState<WorkoutType[]>([]);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    dispatch({ type: "hide_workout_form" });
    // console.log(data);
    const { workoutTypeId, location, distance, steps, calories, notes } = data;
    const parsedData = {
      workoutTypeId,
      location,
      distance: parseInt(distance),
      steps: parseInt(steps),
      calories: parseInt(calories),
      notes,
    };
    // console.log(parsedData);
    const newRecord = await createWorkout(parsedData);
    console.log(newRecord);
    dispatch({ type: "add_workout", payload: newRecord });
  };

  useEffect(() => {
    getAllWorkoutTypes().then((workoutTypes: WorkoutType[]) => {
      setWorkoutTypes(workoutTypes);
    });
  }, []);

  return (
    <>
      <div
        onClick={() => dispatch({ type: "hide_workout_form" })}
        className="text-gray-00 mb-2 inline-block rounded py-1 pl-1 pr-2 hover:bg-purple-500 hover:text-white active:bg-purple-700"
      >
        <ArrowLeft className="inline-block" strokeWidth={0.75} />
        <div className="inline-block font-light">Go Back</div>
      </div>
      <div className="mt-3 text-2xl font-light">
        {workout ? "Edit Workout" : "Add Workout"}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="my-5">
        <label className="inline-block w-20">Type</label>
        <select
          className="input w-52"
          {...register("workoutTypeId", { required: true })}
          value={workout?.workoutType?.id}
        >
          {workoutTypes.map((t: WorkoutType) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
        <span className="ml-2 text-red-600">
          {errors.workoutTypeId && <span>Type is required</span>}
        </span>
        <br />

        <label className="inline-block w-20">Location</label>
        <input
          className="input "
          placeholder=""
          {...register("location", { required: true })}
          type="text"
          value={workout?.location}
        />
        <span className="ml-2 text-red-600">
          {errors.location && <span>Location is required</span>}
        </span>
        <br />
        <label className="inline-block w-20">Steps</label>
        <input
          className="input "
          {...register("steps", { required: false, min: 0, max: 20000 })}
          type="text"
          value={workout?.steps}
        />
        <span className="ml-2 text-red-600">
          {errors.steps && <span>Steps are required</span>}
        </span>
        <br />
        <label className="inline-block w-20">Distance</label>
        <input
          className="input "
          {...register("distance", { required: false, min: 0, max: 10000 })}
          type="text"
          step="0.01"
          value={workout?.distance}
        />
        <span className="ml-2 text-red-600">
          {errors.distance && <span>Distance is required</span>}
        </span>
        <br />
        <label className="inline-block w-20">Calories</label>
        <input
          className="input "
          {...register("calories", { required: false, min: 0, max: 2000 })}
          type="text"
          value={workout?.calories}
        />
        <span className="ml-2 text-red-600">
          {errors.calories && <span>Calories is required</span>}
        </span>
        <br />
        <label className="inline-block w-20 align-top">Notes</label>
        <textarea
          className="input "
          placeholder="optional"
          rows={4}
          cols={50}
          {...register("notes", { required: false })}
        >
          {workout?.notes}
        </textarea>
        <span className="ml-2 text-red-600">
          {errors.notes && <span>Notes is required</span>}
        </span>
        <div className="mt-3">
          <input
            className="btn text-gray-00 ml-1 inline-block bg-purple-400 py-2 hover:bg-purple-500 hover:text-white active:bg-purple-700"
            type="submit"
            value="Submit"
          />
          <button
            className="btn btn-secondary py-2 "
            onClick={() => dispatch({ type: "hide_workout_form" })}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};
