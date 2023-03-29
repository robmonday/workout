import DataEntryMode from "./DataEntryMode";
import WorkoutMode from "./WorkoutMode";

import Dashboard from "./Dashboard";

export default function Main() {
  return (
    <div className="">
      <DataEntryMode />
      <WorkoutMode />
      <Dashboard />
    </div>
  );
}
