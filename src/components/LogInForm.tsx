import { useContext } from "react";
import { DispatchContext } from "./StateProvider";

import { useNavigate, Link } from "react-router-dom";
import { loginRequest } from "../api";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LogInForm() {
  const navigate = useNavigate();

  const dispatch = useContext(DispatchContext);

  const schema = z.object({
    email: z.string().min(6, "Email is too short").email().toLowerCase(),
    password: z
      .string()
      .min(6, "Password is too short")
      .regex(
        /^(?=.*\d)(?=.*[!@#$%^&*?])(?=.*[a-z])(?=.*[A-Z]).{4,}$/,
        "Password must include uppercase, lowercase, number, and a symbol (!@#$%^&*?)"
      ),
  });

  type FormValues = z.infer<typeof schema> & {
    formLevelError: string;
  };

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const res = await loginRequest(data);
    // console.log("data returned from login request", JSON.stringify(res));
    if (res.serverError) {
      setError("formLevelError", { type: "custom", message: res.message });
      setTimeout(() => clearErrors(), 4000);
    } else {
      window.localStorage.setItem(
        "loggedWorkoutAppUser",
        JSON.stringify(res.userObj)
      );
      window.localStorage.setItem("loggedWorkoutAppToken", res.token);
      dispatch({ type: "log_in_set_user", payload: res.userObj });
      dispatch({ type: "log_in_set_token", payload: res.token });
      navigate("/start");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="m-5 w-auto rounded-xl bg-gradient-to-br from-gray-100 px-7 py-5 shadow-lg md:w-2/3 lg:w-1/2 2xl:w-1/3"
      >
        <div className="mb-4 text-lg sm:text-xl md:text-2xl ">Log In</div>

        <input
          className="input mb-4 w-[100%] max-w-[18rem] lowercase"
          placeholder="email"
          type="text"
          {...register("email")}
        />
        {errors.email && (
          <span className="ml-2 text-red-600">{errors.email.message}</span>
        )}
        <br />

        <input
          className="input mb-4 w-[100%] max-w-[18rem] "
          placeholder="password"
          type="password"
          {...register("password")}
        />
        {errors.password && (
          <span className="ml-2 text-red-600">{errors.password.message}</span>
        )}

        {errors.formLevelError && (
          <div>
            <span className="mx-2 mb-4 text-red-600">
              {errors.formLevelError.message}
            </span>
            <span className="text-blue-500 hover:underline hover:underline-offset-8">
              <Link to="/forgot">Forgot password?</Link>
            </span>
          </div>
        )}

        <div className="">
          <input className="btn btn-primary" type="submit" value="Submit" />
          <Link to="/" className="btn btn-secondary">
            Cancel
          </Link>
        </div>
        <div className="my-4">
          Don't have an account?&nbsp;&nbsp;&nbsp;
          <Link
            to="/signup"
            className="text-blue-500 hover:underline hover:underline-offset-8"
          >
            <div className="sm:inline">Sign Up!</div>
          </Link>
        </div>
      </form>
    </>
  );
}
