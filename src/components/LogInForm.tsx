import { useContext } from "react";
import { DispatchContext, StateContext } from "./StateProvider";

import { useNavigate, Link } from "react-router-dom";
import { loginRequest } from "../api";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LogInForm() {
  const navigate = useNavigate();

  const schema = z.object({
    email: z.string().min(6, "Email is too short").email(),
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
    console.log("data returned from login request", JSON.stringify(res));
    if (res.serverError) {
      setError("formLevelError", { type: "custom", message: res.message });
      setTimeout(() => clearErrors(), 4000);
    } else {
      window.localStorage.setItem("user", JSON.stringify(res.userObj));
      window.localStorage.setItem("token", JSON.stringify(res.token));
      navigate("/main");
    }
  };

  return (
    <div className="shaddow-xlg">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="m-5 w-auto rounded-xl bg-gradient-to-br from-gray-100 px-7 py-5 shadow-lg md:w-2/3 lg:w-1/2 2xl:w-1/3"
      >
        <div className="text-2xl">Log In</div>
        <br />

        <input
          className="input w-64"
          placeholder="Email Address"
          type="text"
          {...register("email")}
        />
        {errors.email && (
          <span className="ml-2 text-red-600">{errors.email.message}</span>
        )}
        <br />

        <input
          className="input w-64"
          placeholder="Password"
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

        <div className="mt-3">
          <input className="btn btn-primary" type="submit" value="Submit" />
          <Link to="/" className="btn btn-secondary">
            Cancel
          </Link>
        </div>
        <div className="mt-5">
          Don't have an account?&nbsp;&nbsp;&nbsp;
          <Link
            to="/signup"
            className="text-blue-500 hover:underline hover:underline-offset-8"
          >
            Sign Up!
          </Link>
        </div>
      </form>
    </div>
  );
}
