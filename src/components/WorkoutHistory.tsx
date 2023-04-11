import { useEffect, useContext, useState } from "react";
import { StateContext, DispatchContext } from "./StateProvider";

import {
  createWorkout,
  getAllWorkouts,
  deleteWorkout,
  updateWorkout,
  getAllWorkoutTypes,
} from "../api";

import { ArrowLeft, Plus, Edit2, Trash2 } from "react-feather";

import { Workout, WorkoutType } from "../types";

import { dateToWeekdayDate, dateToTime } from "../util";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
            {state.detailPanelDisplay === "WorkoutFormAdd" && <WorkoutForm />}
            {state.detailPanelDisplay === "WorkoutFormEdit" && (
              <WorkoutForm workout={state.workoutToEdit} />
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
      <div className="h-72 overflow-y-auto">
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
              <div className="hidden sm:inline-block font-light text-purple-700">
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
          value={state.filterText}
          onChange={(e) =>
            dispatch({ type: "update_filter_text", payload: e.target.value })
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

type WorkoutFormProps = {
  workout?: Workout;
};

const WorkoutForm = ({ workout }: WorkoutFormProps) => {
  const dispatch = useContext(DispatchContext);

  const [workoutTypes, setWorkoutTypes] = useState<WorkoutType[]>([]);

  const schema = z.object({
    workoutTypeId: z.string(),
    location: z.string().min(3, "Location name is too short"),
    steps: z
      .number()
      .min(0, "Can't be negative")
      .max(100000, "Number too high"),
    distance: z.number().min(0, "Can't be negative").max(50, "Number too high"),
    calories: z
      .number()
      .min(0, "Can't be negative")
      .max(20000, "Number too high"),
    notes: z.string().optional(),
  });

  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmitNew: SubmitHandler<FormValues> = async (data) => {
    dispatch({ type: "hide_workout_form" });
    // console.log("data from form", data);
    const newWorkout = await createWorkout(data);
    // console.log("newWorkout", newWorkout);
    dispatch({ type: "add_workout", payload: newWorkout });
  };

  const onSubmitEdit: SubmitHandler<FormValues> = async (data) => {
    dispatch({ type: "hide_workout_form" });
    // console.log("data from form", data);
    if (workout) {
      const editedWorkout = await updateWorkout(workout.id, data);
      // console.log("editedWorkout", editedWorkout);
      dispatch({ type: "edit_workout", payload: editedWorkout });
      // dispatch({ type: "select_workout", payload: editedWorkout.id });
    }
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
        className="text-gray-00 float-left mr-3 rounded py-1 pl-1 pr-2 hover:bg-purple-500 hover:text-white active:bg-purple-700"
      >
        <ArrowLeft className="inline-block" strokeWidth={0.75} />
        <div className="inline-block font-light">Back</div>
      </div>
      <div className="text-2xl font-light">
        {workout ? "Edit Workout" : "Add Workout"}
      </div>

      <form
        onSubmit={
          workout
            ? handleSubmit((workout) => onSubmitEdit(workout))
            : handleSubmit(onSubmitNew)
        }
        className="my-5"
      >
        <label className="inline-block w-20">Type</label>
        <select
          className="input w-52"
          {...register("workoutTypeId")}
          defaultValue="Outdoor Walk"
        >
          {workoutTypes.map((t: WorkoutType) => (
            <option
              key={t.id}
              value={t.id}
              selected={t.name === workout?.workoutType?.name}
            >
              {t.name}
            </option>
          ))}
        </select>
        {errors.workoutTypeId && (
          <span className="ml-2 text-red-600">
            {errors.workoutTypeId.message}
          </span>
        )}
        <br />

        <label className="inline-block w-20">Location</label>
        <input
          className="input "
          placeholder=""
          {...register("location")}
          type="text"
          defaultValue={workout?.location}
        />
        {errors.location && (
          <span className="ml-2 text-red-600">{errors.location.message}</span>
        )}
        <br />

        <label className="inline-block w-20">Steps</label>
        <input
          className="input "
          {...register("steps", { valueAsNumber: true })}
          placeholder="optional"
          type="number"
          defaultValue={workout?.steps || 0}
        />
        {errors.steps && (
          <span className="ml-2 text-red-600">{errors.steps.message}</span>
        )}
        <br />

        <label className="inline-block w-20">Distance</label>
        <input
          className="input "
          {...register("distance", { valueAsNumber: true })}
          placeholder="optional"
          type="number"
          step="0.1"
          defaultValue={workout?.distance || 0}
        />
        {errors.distance && (
          <span className="ml-2 text-red-600">{errors.distance.message}</span>
        )}
        <br />

        <label className="inline-block w-20">Calories</label>
        <input
          className="input "
          {...register("calories", { valueAsNumber: true })}
          placeholder="optional"
          type="number"
          defaultValue={workout?.calories || 0}
        />
        {errors.calories && (
          <span className="ml-2 text-red-600">{errors.calories.message}</span>
        )}
        <br />

        <label className="inline-block w-20 align-top">Notes</label>
        <textarea
          className="input "
          placeholder="optional"
          rows={1}
          cols={30}
          defaultValue={workout?.notes}
          {...register("notes")}
        />
        {errors.notes && (
          <span className="ml-2 text-red-600">{errors.notes.message}</span>
        )}
        <br />

        <div>
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
