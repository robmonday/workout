import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { signUpRequest, createNotification } from "../api";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignUpForm() {
  const navigate = useNavigate();

  const schema = z
    .object({
      firstName: z.string().min(2, "Too short"),
      lastName: z.string().min(2, "Too short"),
      email: z.string().email(),
      confirmEmail: z.string().email(),
      password: z
        .string()
        .min(6, "Too short")
        .regex(
          /^(?=.*\d)(?=.*[!@#$%^&*?])(?=.*[a-z])(?=.*[A-Z]).{4,}$/,
          "Password must include uppercase, lowercase, number, and a symbol (!@#$%^&*?)"
        ),
    })
    .refine((data) => data.email === data.confirmEmail, {
      message: "Email addresses entered do not match",
      path: ["confirmEmail"],
    });

  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const signupRes = await signUpRequest(data);
    // console.log(JSON.stringify(res));
    if (signupRes.serverError) {
      setError(
        "email",
        { type: "custom", message: signupRes.message },
        { shouldFocus: true }
      );
    }
    navigate("/login");
  };

  return (
    <div className="shaddow-xlg">
      <div></div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="m-5 w-auto rounded-xl bg-gradient-to-br from-gray-100 px-7 py-5 shadow-lg md:w-2/3 lg:w-1/2"
      >
        <div className="text-lg sm:text-xl md:text-2xl">Sign Up</div>
        <br />

        <input
          className="input"
          placeholder="First Name"
          {...register("firstName")}
        />
        <input
          className="input"
          placeholder="Last Name"
          {...register("lastName")}
        />
        <span className="ml-2 text-red-600">
          {(errors.firstName || errors.lastName) && (
            <span>{errors.firstName?.message || errors.lastName?.message}</span>
          )}
        </span>
        <br />

        <input
          className="input w-64"
          placeholder="Email"
          type="text"
          {...register("email")}
        />
        {errors.email && (
          <span className="ml-2 text-red-600">{errors.email.message}</span>
        )}
        <br />

        <input
          className="input w-64"
          placeholder="Confirm Email"
          type="text"
          {...register("confirmEmail")}
        />
        {errors.confirmEmail && (
          <span className="ml-2 text-red-600">
            {errors.confirmEmail.message}
          </span>
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
        <br />

        <input className="btn btn-primary" type="submit" value="Submit" />
        <Link to="/" className="btn btn-secondary">
          Cancel
        </Link>
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
