import Badges from "./Badges";
import WorkoutHistory from "./WorkoutHistory";
import Dashboard from "./Dashboard";
import Timer from "./Timer";

export default function Main() {
  return (
    <>
      <WorkoutHistory />
      <Timer />
      <div className="flex flex-wrap">
        <div className="w-3/4">
          <Dashboard />
        </div>
        <div className="w-1/4">
          <Badges />
        </div>
      </div>
    </>
  );
}
