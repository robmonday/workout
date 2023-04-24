import WorkoutHistory, { WorkoutDetail } from "./WorkoutHistory";
import { MyBadges } from "./Badges";
import { ModalContext, ModalProps } from "./Modal";
import { useContext } from "react";
import WorkoutForm from "./WorkoutForm";
import { StateContext } from "./StateProvider";

export default function DataEntryMode() {
  const state = useContext(StateContext);

  const [openModal, closeModal] = useContext(ModalContext);

  return (
    <>
      <div className="flex">
        <div className="w-full max-w-4xl lg:w-5/6">
          <WorkoutHistory />
        </div>
        <div className="hidden flex-grow lg:block lg:w-1/6 ">
          <MyBadges />
        </div>
      </div>
    </>
  );
}
