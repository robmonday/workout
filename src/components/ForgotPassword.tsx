import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { StateContext } from "./StateProvider";
import {
  sendEmailForgotPw,
  handleEmailForgotPwToken,
  updatePassword,
} from "../api";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ForgotPassword() {
  const state = useContext(StateContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const newPasswordToken = searchParams.get("newPasswordToken");
  return (
    <>
      {!state.token && (
        <div className="btn btn-purple fixed top-2 right-1 z-10 px-2 py-1 text-base">
          <Link to="/login">Log In / Sign Up</Link>
        </div>
      )}
      <div className="m-5 w-auto rounded-xl bg-gradient-to-br from-gray-100 px-7 py-5 shadow-lg md:w-2/3 lg:w-1/2 2xl:w-1/3">
        <div className="mb-4 flex text-lg sm:text-xl md:text-2xl">
          <span>Password Reset</span>
        </div>
        {newPasswordToken ? (
          <ReceiveToken newPasswordToken={newPasswordToken} />
        ) : (
          <SendPasswordEmail />
        )}
      </div>
    </>
  );
}

export function SendPasswordEmail() {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>();

  const [buttonActive, setButtonActive] = useState(true);
  const [firstEmailSent, setFirstEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = email && (await sendEmailForgotPw({ email }));
    console.log(`email sent: ${JSON.stringify(result)}`);
    setFirstEmailSent(true);
    setButtonActive(false);
    setTimeout(() => setButtonActive(true), 1000 * 60 * 2);
  };

  return (
    <>
      {!firstEmailSent && (
        <div>
          <div className="my-4">
            Please enter the email address for your account.
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              className="input mb-4 w-[100%] max-w-[18rem] lowercase"
              type="email"
              placeholder="email@domain.com"
              onChange={(e) => e.target.value && setEmail(e.target.value)}
            />
            <div className="mb-4 flex flex-wrap">
              <input className="btn btn-primary block" type="submit" />
              <div
                className="btn btn-secondary"
                onClick={() => navigate("/login")}
              >
                Cancel
              </div>
            </div>
          </form>
        </div>
      )}

      {firstEmailSent && (
        <div>
          <div className="mb-2 py-3">
            Please check your inbox! You should be receiving an email within the
            next minute or two. If for some reason you do not receive it, please
            check your SPAM or bulk email folder.
          </div>
          <div className="my-2">
            <div
              onClick={() => navigate("/login")}
              className="btn btn-green my-1 mr-5"
            >
              I received the email and confirmed.
            </div>
            {buttonActive ? (
              <div
                onClick={() => alert("resubmit")}
                className="btn btn-red my-1"
              >
                I didn't receive the email. Please resend.
              </div>
            ) : (
              <div
                onClick={() =>
                  alert(
                    "Please check your inbox again, and thank you for your patience!"
                  )
                }
                className="btn my-1 border-2 border-dashed "
              >
                Please wait 2 minutes to resend again.
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

type SetNewPasswordProps = {
  newPasswordToken: string;
};
export function ReceiveToken({ newPasswordToken }: SetNewPasswordProps) {
  const navigate = useNavigate();

  const [authenticated, setAuthenticated] = useState<boolean>();
  const [email, setEmail] = useState<string>();

  useEffect(() => {
    handleEmailForgotPwToken(newPasswordToken).then((result) => {
      setAuthenticated(result.authenticated);
      setEmail(result.user.email);
    });
  }, []);
  return (
    <>
      {authenticated === true && email && <ResetPasswordForm email={email} />}
      <div className="p-5">
        {authenticated === undefined && (
          <div className="animate-bounce text-gray-600">
            ...waiting for response
          </div>
        )}
        {authenticated === false && (
          <div>
            <div className="mb-5 block text-red-700">
              Sorry! We are unable to reset your password.
            </div>

            <div className="mb-5 block text-gray-800">
              If you continue to experience this issue, please email us at
              customerexperienceteam@workoutapp.com.
            </div>

            <div onClick={() => navigate("/login")} className="btn btn-purple">
              Please try again
            </div>
          </div>
        )}
      </div>
    </>
  );
}

const schema = z
  .object({
    password: z
      .string()
      .min(6, "Too short")
      .regex(
        /^(?=.*\d)(?=.*[!@#$%^&*?])(?=.*[a-z])(?=.*[A-Z]).{4,}$/,
        "Password must include uppercase, lowercase, number, and a symbol (!@#$%^&*?)"
      ),
    confirmPassword: z
      .string()
      .min(6, "Too short")
      .regex(
        /^(?=.*\d)(?=.*[!@#$%^&*?])(?=.*[a-z])(?=.*[A-Z]).{4,}$/,
        "Password must include uppercase, lowercase, number, and a symbol (!@#$%^&*?)"
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "New passwords entered do not match",
    path: ["confirmPassword"],
  });

export type ResetPwFormValues = z.infer<typeof schema>;

type ResetPasswordFormProps = {
  email: string;
};
export function ResetPasswordForm({ email }: ResetPasswordFormProps) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ResetPwFormValues>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<ResetPwFormValues> = async (data) => {
    const result = await updatePassword(email, data.password);
    console.log(JSON.stringify(result));

    navigate("/login");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-lg border-2 border-purple-500 p-6"
      >
        <div className="mb-4 text-lg sm:text-lg md:text-xl ">
          Create New Password
        </div>

        <input
          className="input mb-4 w-[100%] max-w-[18rem] "
          placeholder="password"
          type="password"
          {...register("password")}
        />
        {errors.password && (
          <div className="ml-2 text-red-600">{errors.password.message}</div>
        )}
        <br />

        <input
          className="input mb-4 w-[100%] max-w-[18rem] "
          placeholder="confirm password"
          type="password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <div className="ml-2 text-red-600">
            {errors.confirmPassword.message}
          </div>
        )}
        <br />

        <div className="">
          <input className="btn btn-primary" type="submit" value="Submit" />
          <Link to="/login" className="btn btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </>
  );
}
