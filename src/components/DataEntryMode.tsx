import WorkoutHistory from "./WorkoutHistory";
import Badges from "./Badges";

export default function DataEntryMode() {
  return (
    <>
      <div className="flex">
        <div className="md:w-3/4 lg:w-5/6 ">
          <WorkoutHistory />
        </div>
        <div className="hidden md:block md:w-1/4 lg:w-1/6 ">
          <Badges />
        </div>
      </div>
      <div className="block md:hidden">
        <Badges />
      </div>
    </>
  );
}
