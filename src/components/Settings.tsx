import { useEffect, useState, useContext } from "react";
import { getAllWorkoutTypes, getUser, updateUser } from "../api";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { StateContext } from "./StateProvider";
import { DispatchContext } from "./StateProvider";

export default function Settings() {
  return (
    <>
      <div className="p-2 text-xl">Settings</div>
      <div className="flex flex-wrap">
        <div className="w-1/2">
          <AccountDetails />
        </div>
        <div className="w-1/2">
          <PersonalDetails />
        </div>
        <div className="w-1/2">
          <WorkoutSettings />
        </div>
        <div className="-z-20 w-1/2">
          <div className="panel">
            <div className="flex justify-start">
              <div className="p mb-4 text-lg h-56">Sharing Settings</div>
              <div
                onClick={() => alert("Edit")}
                className="btn btn-purple -z-10 m-0 mx-2 h-fit px-2 py-0.5"
              >
                Edit
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function AccountDetails() {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const [editMode, setEditMode] = useState(false);
  const inputEditStyle = editMode ? "bg-white" : "bg-purple-100";

  useEffect(() => {
    if (state.user) {
      getUser(state.user.id).then((user) => {
        const DOB = new Date(user.DOB).toISOString().slice(0, 10);
        const payload = { ...user, DOB };
        dispatch({ type: "update_account_details", payload });
      });
    }
  }, []);

  const schema = z
    .object({
      firstName: z.string().min(2, "Too short"),
      lastName: z.string().min(2, "Too short"),
      email: z.string().email(),
      confirmEmail: z.string().email(),
    })
    .refine((data) => data.email === data.confirmEmail, {
      message: "Emails must match",
      path: ["confirmEmail"],
    });

  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const user = await updateUser(state.user.id, data);
    const DOB = new Date(user.DOB).toISOString().slice(0, 10);
    const payload = { ...user, DOB };
    dispatch({ type: "update_account_details", payload });
    reset();
    setEditMode(false);
  };

  const onCancel = () => {
    reset();
    setEditMode(false);
  };

  return (
    <div className="panel">
      <div className="flex justify-start">
        <div className="p mb-4 text-lg">Account Details</div>
        {!editMode && (
          <div
            onClick={() => setEditMode(!editMode)}
            className="btn btn-purple m-0 mx-3 h-fit px-2 py-0.5 "
          >
            Edit
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid-gap-4 grid grid-cols-3">
          <label className="input border-0">First Name</label>
          <input
            className={`input ${inputEditStyle}`}
            disabled={!editMode}
            defaultValue={state.user?.firstName}
            {...register("firstName")}
          />
          <div className="ml-2 text-red-600">
            {errors.firstName && errors.firstName.message}
          </div>

          <label className="input border-0">Last Name</label>
          <input
            className={`input ${inputEditStyle}`}
            disabled={!editMode}
            defaultValue={state.user?.lastName}
            {...register("lastName")}
          />
          <div className="ml-2 text-red-600">
            {errors.lastName && errors.lastName.message}
          </div>

          <label className="input border-0">Email</label>
          <input
            className={`input ${inputEditStyle}`}
            disabled={!editMode}
            defaultValue={state.user?.email}
            {...register("email")}
          />
          <div className="ml-2 text-red-600">
            {errors.email && errors.email.message}
          </div>

          {editMode && (
            <>
              <label className="input border-0">Confirm Email</label>
              <input
                className={`input ${inputEditStyle}`}
                disabled={!editMode}
                defaultValue={state.user?.email}
                {...register("confirmEmail")}
              />
              <div className="ml-2 text-red-600">
                {errors.confirmEmail && errors.confirmEmail.message}
              </div>
            </>
          )}
        </div>

        {editMode && (
          <div className="mt-5">
            <input
              type="submit"
              value="Save"
              className="btn btn-primary mx-2 px-3 py-1"
            />
            <div
              onClick={onCancel}
              className="btn btn-secondary mx-2 px-3 py-1"
            >
              Cancel
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export function PersonalDetails() {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const [editMode, setEditMode] = useState(false);
  const inputEditStyle = editMode ? "bg-white" : "bg-purple-100";

  useEffect(() => {
    if (state.user) {
      getUser(state.user.id).then((user) => {
        const DOB = new Date(user.DOB).toISOString().slice(0, 10);
        const payload = { ...user, DOB };
        dispatch({ type: "update_account_details", payload });
      });
    }
  }, []);

  const schema = z.object({
    inches: z
      .number()
      .min(0, "Cannot be negative")
      .max(120, "Too high")
      .optional(),
    lbs: z
      .number()
      .min(0, "Cannot be negative")
      .max(500, "Too high")
      .optional(),
    DOB: z
      .date()
      .min(new Date("1920-01-01"), { message: "Too old" })
      .max(new Date(), { message: "Too young" })
      .optional(),
    gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
  });

  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const user = await updateUser(state.user.id, data);

    const DOB = new Date(user.DOB).toISOString().slice(0, 10);
    const payload = { ...user, DOB };

    dispatch({ type: "update_account_details", payload });
    reset();
    setEditMode(false);
  };

  const onCancel = () => {
    reset();
    setEditMode(false);
  };

  return (
    <div className="panel">
      <div className="flex justify-start">
        <div className="p mb-4 text-lg">Personal Details</div>
        {!editMode && (
          <div
            onClick={() => setEditMode(!editMode)}
            className="btn btn-purple m-0 mx-3 h-fit px-2 py-0.5"
          >
            Edit
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid-gap-4 grid grid-cols-3">
          <label className="input border-0">Height (inches)</label>
          <input
            type="number"
            className={`input ${inputEditStyle}`}
            disabled={!editMode}
            defaultValue={state.user?.inches}
            {...register("inches", { valueAsNumber: true })}
          />
          <div className="ml-2 text-red-600">{errors.inches && "Invalid"}</div>

          <label className="input border-0">Weight (lbs)</label>
          <input
            type="number"
            className={`input ${inputEditStyle}`}
            disabled={!editMode}
            defaultValue={state.user?.lbs}
            {...register("lbs", { valueAsNumber: true })}
          />
          <div className="ml-2 text-red-600">{errors.lbs && "Invalid"}</div>

          <label className="input border-0">Date of Birth</label>
          <input
            type="date"
            className={`input ${inputEditStyle}`}
            disabled={!editMode}
            defaultValue={state.user?.DOB}
            {...register("DOB", { valueAsDate: true })}
          />
          <div className="ml-2 text-red-600">
            {errors.DOB && errors.DOB.message}
          </div>

          <label className="input border-0">Gender</label>
          <input
            className={`input ${inputEditStyle}`}
            disabled={!editMode}
            defaultValue={state.user?.gender}
            {...register("gender")}
          />
          <div className="ml-2 text-red-600">
            {errors.gender && errors.gender.message}
          </div>
        </div>
        {editMode && (
          <div className="mt-5">
            <input
              type="submit"
              value="Save"
              className="btn btn-primary mx-2 px-3 py-1"
            />
            <div
              onClick={onCancel}
              className="btn btn-secondary mx-2 px-3 py-1"
            >
              Cancel
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export function WorkoutSettings() {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    getAllWorkoutTypes().then((workoutTypes) => {
      dispatch({ type: "get_workout_types", payload: workoutTypes });
    });
  }, []);

  const workoutTypes = state.workoutTypes;

  return (
    <div className="panel">
      <div className="flex justify-start">
        <div className="p mb-4 text-lg">Workout Settings</div>
        <div
          onClick={() => alert("Edit")}
          className="btn btn-purple m-0 mx-3 h-fit px-2 py-0.5"
        >
          Edit
        </div>
      </div>
      <p className="p-2">Current Workout Type Categories:</p>
      <ul>
        {workoutTypes &&
          workoutTypes.map((workoutType) => (
            <div key={workoutType.id} className="py-2 pl-6">
              {workoutType.name}
            </div>
          ))}
      </ul>
    </div>
  );
}
