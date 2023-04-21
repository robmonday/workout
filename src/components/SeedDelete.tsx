import { useNavigate } from "react-router-dom";
import { deleteWorkoutSeedData } from "../api";
import { UserObj } from "../types";
import { useContext } from "react";
import { StateContext } from "./StateProvider";

export default function EmailConfirm() {
  const navigate = useNavigate();
  const state = useContext(StateContext);

  const handleDeleteSeed = (userObj: UserObj) => {
    deleteWorkoutSeedData(userObj.id);
    navigate("/notifications");
  };

  return (
    <>
      <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
        <div className="panel py-5 px-6">
          <div className="mb-3 flex text-lg sm:text-xl md:text-2xl">
            <span>Would you like to delete seed data?</span>
          </div>

          <div className="mb-2 py-3">
            <p className="mb-3">
              This account was created in demo mode. For convenience, it was
              created with fictional workouts ("seed data"). Having seed data
              provides an opportunity for the user to try out the website,
              without having to create any data.
            </p>
            <p className="mb-3">
              Once you are ready to begin using this website, it is recommended
              to delete the seed data so that it will not skew your results. Are
              you ready to delete any data from this account that you have not
              entered?
            </p>
          </div>

          <div className="mt-2">
            <div
              onClick={() => handleDeleteSeed(state.user)}
              className="btn btn-purple my-1"
            >
              Yes, please delete all fictional "seed data".
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
