import Badges from "./Badges";
import WorkoutHistory from "./WorkoutHistory";
import Dashboard from "./Dashboard";
import Timer from "./Timer";

export default function Main() {
  return (
    <div className="">
      <DataEntryMode />
      <WorkoutMode />
      <Dashboard />
    </div>
  );
}

export const WorkoutMode = () => {
  return (
    <div className="">
      <Timer />
      <Badges />
    </div>
  );
};

export const DataEntryMode = () => {
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
};
