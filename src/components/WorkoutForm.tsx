import { useEffect, useContext, useState } from "react";
import { DispatchContext } from "./StateProvider";

import { createWorkout, updateWorkout, getAllWorkoutTypes } from "../api";

import { ArrowLeft } from "react-feather";

import { Workout, WorkoutType } from "../types";

import { setLocalDTString } from "../util";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  workoutTypeId: z.string().min(1, "Please choose"),
  location: z.string().min(3, "Too short"),
  end: z
    .date()
    .min(new Date(Date.now() - 5 * 365 * 24 * 60 * 60 * 1000), {
      message: "Too far in the past",
    })
    .max(new Date(Date.now() + 24 * 60 * 60 * 1000), {
      message: "Too far in the future",
    }),
  minutes: z.number().min(0, "Can't be negative").max(750, "Number too high"),
  steps: z.number().min(0, "Can't be negative").max(100000, "Number too high"),
  distance: z.number().min(0, "Can't be negative").max(50, "Number too high"),
  calories: z
    .number()
    .min(0, "Can't be negative")
    .max(20000, "Number too high"),
  notes: z.string().optional(),
});

export type workoutFormValues = z.infer<typeof schema>;

type WorkoutFormProps = {
  hide: () => void;
  setSubmitted?: (status: boolean) => void;
  workout?: Workout;
  minutes?: number;
};

export default function WorkoutForm({
  hide,
  setSubmitted,
  workout,
  minutes,
}: WorkoutFormProps) {
  const dispatch = useContext(DispatchContext);

  const [workoutTypes, setWorkoutTypes] = useState<WorkoutType[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<workoutFormValues>({ resolver: zodResolver(schema) });

  const onSubmitNew: SubmitHandler<workoutFormValues> = async (data) => {
    hide();
    setSubmitted && setSubmitted(true);
    // console.log("data from form", data);
    const newWorkout = await createWorkout(data);
    // console.log("newWorkout", newWorkout);
    dispatch({ type: "add_workout", payload: newWorkout });
  };

  const onSubmitEdit: SubmitHandler<workoutFormValues> = async (data) => {
    hide();
    setSubmitted && setSubmitted(true);
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
        onClick={() => hide()}
        className="text-gray-00 float-left mr-3 rounded py-1 pl-1 pr-2 hover:bg-purple-500 hover:text-white active:bg-purple-700"
      >
        <ArrowLeft className="inline-block" strokeWidth={0.75} />
        <div className="inline-block font-light">Back</div>
      </div>
      <div className="text-lg font-light sm:text-xl md:text-2xl">
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
        <label className="inline-block w-28">Type</label>
        <select
          className="input mb-4 w-52 "
          {...register("workoutTypeId")}
          value={workout?.workoutTypeId}
        >
          <option key="default" value={""}>
            Select type...
          </option>
          {workoutTypes
            .sort((a, b) => a.sortOrder - b.sortOrder)
            .map((t: WorkoutType) => (
              <option
                key={t.id}
                value={t.id}
                // selected={t.name === workout?.workoutType?.name}
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

        <label className="inline-block w-28">Location</label>
        <input
          className="input mb-4 "
          placeholder=""
          {...register("location")}
          type="text"
          defaultValue={workout?.location}
        />
        {errors.location && (
          <span className="ml-2 text-red-600">{errors.location.message}</span>
        )}
        <br />

        <label className="inline-block w-28">Time</label>
        <input
          className="input mb-4 "
          {...register("end", { valueAsDate: true })}
          type="datetime-local"
          defaultValue={
            workout
              ? setLocalDTString(new Date(workout?.end))
              : setLocalDTString(new Date())
          }
        />
        {errors.end && (
          <span className="ml-2 text-red-600">{errors.end.message}</span>
        )}
        <br />

        <label className="inline-block w-28">Minutes</label>
        <input
          className="input mb-4 "
          {...register("minutes", { valueAsNumber: true })}
          type="number"
          defaultValue={
            (workout &&
              Math.round(
                (Date.parse(workout.end) - Date.parse(workout.start)) /
                  1000 /
                  60
              )) ||
            minutes ||
            0
          }
        />
        {errors.minutes && (
          <span className="ml-2 text-red-600">{errors.minutes.message}</span>
        )}
        <br />

        <label className="inline-block w-28">Steps</label>
        <input
          className="input mb-4 "
          {...register("steps", { valueAsNumber: true })}
          placeholder="optional"
          type="number"
          defaultValue={workout?.steps || 0}
        />
        {errors.steps && (
          <span className="ml-2 text-red-600">{errors.steps.message}</span>
        )}
        <br />

        <label className="inline-block w-28">Distance</label>
        <input
          className="input mb-4 "
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

        <label className="inline-block w-28">Calories</label>
        <input
          className="input mb-4 "
          {...register("calories", { valueAsNumber: true })}
          placeholder="optional"
          type="number"
          defaultValue={workout?.calories || 0}
        />
        {errors.calories && (
          <span className="ml-2 text-red-600">{errors.calories.message}</span>
        )}
        <br />

        <label className="inline-block w-28 align-top">Notes</label>
        <textarea
          className="input mb-4 "
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
          <button className="btn btn-secondary py-2 " onClick={() => hide()}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
