import { useNavigate } from "react-router-dom";
import { Mail } from "react-feather";
import { sendEmailConfirm } from "../api";
import { UserObj } from "../types";
import { useState, useContext } from "react";
import { StateContext } from "./StateProvider";

export default function EmailConfirm() {
  const navigate = useNavigate();

  const state = useContext(StateContext);

  const [buttonActive, setButtonActive] = useState(true);
  const [firstEmailSent, setFirstEmailSent] = useState(false);

  const handleEmailConfirm = (userObj: UserObj) => {
    sendEmailConfirm(userObj);
    setFirstEmailSent(true);
    setButtonActive(false);
    setTimeout(() => setButtonActive(true), 1000 * 60 * 2);
  };

  return (
    <>
      <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
        <div className="panel py-5 px-6">
          <div className="mb-3 flex text-lg sm:text-xl md:text-2xl">
            <span>Please Confirm Email Address</span>
            <Mail strokeWidth={0.75} size={36} className="ml-5" />
          </div>

          {!firstEmailSent && (
            <div className="mb-2 py-3">
              When you are ready we will send you an email containing a link or
              a code to confirm your email address.
            </div>
          )}

          {firstEmailSent && (
            <div className="mb-2 py-3">
              Please check your inbox! You should be receiving an email within
              the next minute or two. If for some reason you do not receive it,
              please check your SPAM or bulk email folder.
            </div>
          )}

          {!firstEmailSent && (
            <div className="mt-2">
              <div
                onClick={() => handleEmailConfirm(state.user)}
                className="btn btn-purple my-1"
              >
                Send email to {state.user.email}
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
      </div>
    </>
  );
}
