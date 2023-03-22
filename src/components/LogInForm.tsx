import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../api";
import { LogInRequest } from "../types";

type FormValues = LogInRequest & {
  formLevelError: string;
};

export default function LogInForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const res = await loginRequest(data);
    if (res.serverError) {
      setError("formLevelError", { type: "custom", message: res.message });
      setTimeout(() => clearErrors(), 3000);
    } else {
      navigate("/user/dashboard");

      window.localStorage.setItem("userToken", res.token);
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
          type="email"
          {...register("email", { required: true })}
        />
        <span className="ml-2 text-red-600">
          {errors.email && <span>Email is required</span>}
        </span>
        <br />
        <input
          className="input w-64"
          placeholder="Password"
          type="password"
          {...register("password", { required: true })}
        />
        <span className="ml-2 text-red-600">
          {errors.password && <span>Password is required</span>}
        </span>
        <p className="ml-2 mb-4 text-red-600">
          {errors.formLevelError && errors.formLevelError.message}
        </p>
        <div className="mt-3">
          <input className="btn btn-primary" type="submit" value="Submit" />
          <button className="btn btn-secondary" onClick={() => navigate("/")}>
            Cancel
          </button>
        </div>
        <div className="mt-5">
          Don't have an account?&nbsp;&nbsp;&nbsp;
          <a
            href="/user/signup"
            className="text-blue-500 hover:underline hover:underline-offset-8"
          >
            Sign Up!
          </a>
        </div>
      </form>
    </div>
  );
}
