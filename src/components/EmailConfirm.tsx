import { useNavigate } from "react-router-dom";
import { Mail } from "react-feather";

export default function EmailConfirm() {
  const navigate = useNavigate();

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
            <div onClick={() => alert("click")} className="btn btn-red my-1">
              I didn't receive the email. Please resend.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
