import WorkoutHistory from "./WorkoutHistory";
import { MyBadges } from "./Badges";

export default function DataEntryMode() {
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
