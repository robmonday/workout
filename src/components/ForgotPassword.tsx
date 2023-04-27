import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useState, useContext } from "react";
import { StateContext } from "./StateProvider";

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
          <SetNewPassword newPasswordToken={newPasswordToken} />
        ) : (
          <SendPasswordEmail />
        )}
      </div>
    </>
  );
}

export function SendPasswordEmail() {
  const navigate = useNavigate();

  const [buttonActive, setButtonActive] = useState(true);
  const [firstEmailSent, setFirstEmailSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("email sent");
  };

  return (
    <>
      <div className="my-4">
        Please enter the email address for your account.
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          className="input mb-4 w-[100%] max-w-[18rem] lowercase"
          type="email"
          placeholder="email@domain.com"
        />
        <div className="mb-4 flex flex-wrap">
          <input className="btn btn-primary block" type="submit" />
          <div className="btn btn-secondary" onClick={() => navigate("/login")}>
            Cancel
          </div>
        </div>
      </form>
    </>
  );
}

type SetNewPasswordProps = {
  newPasswordToken: string;
};
export function SetNewPassword({ newPasswordToken }: SetNewPasswordProps) {
  return (
    <>
      <div>
        Now that you've clicked the link in your email, you can set a new
        password!
      </div>
      <div>newPasswordToken: {newPasswordToken}</div>
    </>
  );
}
