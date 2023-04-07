import { useNavigate } from "react-router-dom";
import { Mail } from "react-feather";
import { sendEmailConfirm } from "../api";
import { UserObj } from "../types";
import { useState } from "react";
import { set } from "react-hook-form";

export default function EmailConfirm() {
  const navigate = useNavigate();

  const [buttonActive, setButtonActive] = useState(true);

  const userJSON = localStorage.getItem("user");
  const userObj = userJSON && JSON.parse(userJSON);
  // console.log(userObj);

  const handleEmailConfirm = (userObj: UserObj) => {
    sendEmailConfirm(userObj);
    setButtonActive(false);
    setTimeout(() => setButtonActive(true), 1000 * 60 * 2);
  };

  return (
    <>
      <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
        <div className="panel py-5 px-6">
          <div className="mb-3 flex text-2xl">
            <span>We Just Sent You An Email</span>
            <Mail strokeWidth={0.75} size={36} className="ml-5" />
          </div>

          <div className="mb-2 py-3">
            Please check your inbox! You should be receiving an email within the
            next minute or two. If for some reason you do not receive it, please
            check your SPAM or bulk email folder.
          </div>
          <div className="my-2">
            <div
              onClick={() => navigate("/main")}
              className="btn btn-green my-1 mr-5"
            >
              I received the email and confirmed.
            </div>
            {buttonActive ? (
              <div
                onClick={() => handleEmailConfirm(userObj)}
                className="btn btn-red my-1"
              >
                I didn't receive the email. Please resend.
              </div>
            ) : (
              <div
                onClick={() =>
                  alert(
                    "Please check your inbox again.  Sorry for the delay and thank you for your patience!"
                  )
                }
                className="btn btn-secondary my-1"
              >
                Must wait 2 minutes to resend again.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
