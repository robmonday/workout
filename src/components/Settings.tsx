import { useEffect, useState, useContext } from "react";
import { getUser } from "../api";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserInfo } from "../types";
import { StateContext } from "./StateProvider";
import { DispatchContext } from "./StateProvider";

export default function Settings() {
  const state = useContext(StateContext);
  return (
    <>
      <div className="p-2 text-xl">Settings</div>
      <div className="flex">
        <div className="panel w-1/3 px-4 py-3">
          <AccountDetails />
        </div>
        <div className="panel w-1/3 px-4 py-3">
          <WorkoutSettings />
        </div>
        <div className="panel w-1/3 px-4 py-3">
          <div className="flex justify-between">
            <div className="p mb-4 text-lg">Sharing Settings</div>
            <div
              onClick={() => alert("Edit")}
              className="btn btn-purple m-0 h-fit px-2 py-0.5"
            >
              Edit
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function AccountDetails() {
  const userObjJSON = localStorage.getItem("user");
  const userObj = userObjJSON && JSON.parse(userObjJSON);

  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    if (userObj) {
      getUser(userObj.id).then((userObj) => {
        console.log("user", userObj);
        dispatch({ type: "update_account_details", payload: { userObj } });
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
      message: "Email addresses entered do not match",
      path: ["confirmEmail"],
    });

  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  return (
    <>
      <div className="flex justify-between">
        <div className="p mb-4 text-lg">Account Details</div>
        <div
          onClick={() => alert("Edit")}
          className="btn btn-purple m-0 h-fit px-2 py-0.5"
        >
          Edit
        </div>
      </div>
      <div className="grid-gap-4 grid grid-cols-3">
        <label className="input">First Name</label>
        <input
          className="input col-span-2 bg-purple-200"
          value={userObj?.firstName}
          {...register("firstName")}
        />
        <label className="input">Last Name</label>
        <input
          className="input col-span-2 bg-purple-200"
          value={userObj?.lastName}
          {...register("lastName")}
        />
        <label className="input">Email</label>
        <input
          className="input col-span-2 bg-purple-200"
          value={userObj?.email}
          {...register("email")}
        />
        <label className="input">Confirm Email</label>
        <input
          className="input col-span-2 bg-purple-200"
          value={userObj?.email}
          {...register("confirmEmail")}
        />
      </div>
    </>
  );
}

export function WorkoutSettings() {
  return (
    <>
      <div className="flex justify-between">
        <div className="p mb-4 text-lg">Workout Settings</div>
        <div
          onClick={() => alert("Edit")}
          className="btn btn-purple m-0 h-fit px-2 py-0.5"
        >
          Edit
        </div>
      </div>
      Current workout types
    </>
  );
}
