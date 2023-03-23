import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { signUpRequest } from "../api";
import { SignUpRequest } from "../types";

export default function SignUpForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpRequest>();

  const onSubmit: SubmitHandler<SignUpRequest> = async (data) => {
    const res = await signUpRequest(data);
    // console.log(JSON.stringify(res));
    if (res.serverError) {
      setError(
        "email",
        { type: "custom", message: res.message },
        { shouldFocus: true }
      );
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="shaddow-xlg">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="m-5 w-auto rounded-xl bg-gradient-to-br from-gray-100 px-7 py-5 shadow-lg md:w-2/3 lg:w-1/2"
      >
        <div className="text-2xl">Sign Up</div>
        <br />
        <input
          className="input"
          placeholder="First Name"
          {...register("firstName", { required: true })}
        />
        <input
          className="input"
          placeholder="Last Name"
          {...register("lastName", { required: true })}
        />
        <span className="ml-2 text-red-600">
          {(errors.firstName || errors.lastName) && (
            <span>First and last name are required</span>
          )}
        </span>
        <br />
        <input
          className="input w-64"
          placeholder="Email Address"
          type="email"
          {...register("email", { required: true })}
        />
        <span className="ml-2 text-red-600">
          {errors.email &&
            (errors.email.message ? errors.email.message : "Email is required")}
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
        <br />
        <br />
        <input className="btn btn-primary" type="submit" value="Submit" />
        <button className="btn btn-secondary" onClick={() => navigate("/")}>
          Cancel
        </button>
        <div className="mt-5">
          Already have an account?&nbsp;&nbsp;&nbsp;
          <Link
            to="/login"
            className="text-blue-500 hover:underline hover:underline-offset-8"
          >
            Log In!
          </Link>
        </div>
      </form>
    </div>
  );
}
