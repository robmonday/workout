import { Suspense } from "react";
import Loading from "./Loading";

import RunDistByWeek from "./charts/RunDistByWeek";
import WorksByLoc from "./charts/WorksByLoc";
import TimeSeries from "./charts/TimeSeries";
import AvgsByWorkType from "./charts/AvgsByWorkType";
import Leaderboards from "./Leaderboards";

export default function Dashboard() {
  return (
    <>
      <div className="p-2 text-lg sm:text-xl md:text-2xl">Dashboard</div>

      <div className="flex flex-wrap place-content-evenly py-2">
          <WorksByLoc />
          <Leaderboards />
      </div>

      <div className="py-2">
        <TimeSeries />
      </div>

      <div className="flex flex-wrap justify-evenly py-2">
        <div className="w-[30rem]">
          <AvgsByWorkType metric="steps" />
        </div>
        <div className="w-[30rem]">
          <AvgsByWorkType metric="calories" />
        </div>
        <div className="w-[30rem]">
          <AvgsByWorkType metric="distance" />
        </div>
      </div>

      <RunDistByWeek />
    </>
  );
}

const DashPanel = ({ number }: { number: number }) => {
  return (
    <>
      <div className="h-72 w-96 rounded-lg border bg-green-100 p-4 text-center hover:shadow-lg active:translate-y-1">
        Additional Chart {number}
      </div>
    </>
  );
};
