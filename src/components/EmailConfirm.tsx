import { useNavigate, useSearchParams } from "react-router-dom";
import { Mail } from "react-feather";
import {
  handleEmailConfirmToken,
  sendEmailConfirm,
} from "../api";
import { UserInfo } from "../types";
import { useState, useContext, useEffect } from "react";
import { DispatchContext, StateContext } from "./StateProvider";

export default function EmailConfirm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const emailConfirmToken = searchParams.get("emailConfirmToken");

  return (
    <>
      <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
        <div className="panel py-5 px-6">
          <div className="mb-3 flex text-lg sm:text-xl md:text-2xl">
            <span>Email Address Confirmation</span>
            <Mail strokeWidth={0.75} size={36} className="ml-5" />
          </div>
          {emailConfirmToken ? (
            <ReceiveConfirmToken emailConfirmToken={emailConfirmToken} />
          ) : (
            <SendConfirmEmail />
          )}
        </div>
      </div>
    </>
  );
}

export function SendConfirmEmail() {
  const navigate = useNavigate();

  const state = useContext(StateContext);

  const [buttonActive, setButtonActive] = useState(true);
  const [firstEmailSent, setFirstEmailSent] = useState(false);

  const handleEmailConfirm = async (userInfo: UserInfo) => {
    const sendEmailResult = await sendEmailConfirm(userInfo);

    // if(sendEmailResult.success) {
    if (true) {
      setFirstEmailSent(true);
      setButtonActive(false);
      setTimeout(() => setButtonActive(true), 1000 * 60 * 2);
    } else {
      console.log("problem sending email confirmation"); // need to create temp notification for user
    }
  };
  return (
    <>
      <div>
        {!firstEmailSent && (
          <div className="mb-2 py-3">
            When you are ready we will send you an email containing a link or a
            code to confirm your email address.
          </div>
        )}

        {firstEmailSent && (
          <div className="mb-2 py-3">
            Please check your inbox! You should be receiving an email within the
            next minute or two. If for some reason you do not receive it, please
            check your SPAM or bulk email folder.
          </div>
        )}

        {!firstEmailSent && (
          <div className="mt-2">
            <div
              onClick={() => handleEmailConfirm(state.user)}
              className="btn btn-purple my-1"
            >
              Send email to {state.user?.email}
            </div>
          </div>
        )}

        {firstEmailSent && (
          <div className="my-2">
            <div
              onClick={() => navigate("/start")}
              className="btn btn-green my-1 mr-5"
            >
              I received the email and confirmed.
            </div>
            {buttonActive ? (
              <div
                onClick={() => handleEmailConfirm(state.user)}
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
        )}
      </div>
    </>
  );
}

type ReceiveCTokenProps = {
  emailConfirmToken: string;
};
export function ReceiveConfirmToken({ emailConfirmToken }: ReceiveCTokenProps) {
  const navigate = useNavigate();

  const [authenticated, setAuthenticated] = useState<boolean>();
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    handleEmailConfirmToken(emailConfirmToken).then((result) => {
      setAuthenticated(result.authenticated);
      dispatch({ type: "log_in_set_user", payload: result.user });
    });
  }, []);

  return (
    <>
      <div className="p-5">
        {authenticated === true && (
          <div>
            <div className="mb-5 text-green-700">
              Your email address is now confirmed!
            </div>
            <div onClick={() => navigate("/start")} className="btn btn-purple">
              Back to the Start Page
            </div>
          </div>
        )}
        {authenticated === false && (
          <div>
            <div className="mb-5 block text-red-700">
              Your email address did not confirm.{" "}
            </div>

            <div className="mb-5 block text-gray-800">
              If you continue to experience this issue, please email us at
              customerexperienceteam@workoutapp.com.
            </div>

            <div
              onClick={() => navigate("/emailconfirm")}
              className="btn btn-purple"
            >
              Please try again
            </div>
          </div>
        )}
      </div>
    </>
  );
}
