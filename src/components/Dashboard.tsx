import { Suspense } from "react";
import Loading from "./Loading";

import RunDistByWeek from "./charts/RunDistByWeek";
import WorksByLoc from "./charts/WorksByLoc";
import TimeSeries from "./charts/TimeSeries";
import AvgsByWorkType from "./charts/AvgsByWorkType";

export default function Dashboard() {
  return (
    <div className="">
      <div className="p-2 text-xl">Dashboard</div>

      <div className="flex py-2">
        <div className="w-1/4">
          <WorksByLoc />
        </div>
        <div className="w-3/4">
          <RunDistByWeek />
        </div>
      </div>

      <div className="py-2">
        <TimeSeries />
      </div>

      <div className="py-2 flex">
        <div className="w-1/3">
          <AvgsByWorkType metric="steps" />
        </div>
        <div className="w-1/3">
          <AvgsByWorkType metric="calories" />
        </div>
        <div className="w-1/3">
          <AvgsByWorkType metric="distance" />
        </div>
      </div>

      <div className="py-2">
        <div className="panel flex justify-between">
          <DashPanel number={1} />
          <DashPanel number={2} />
          <DashPanel number={3} />
        </div>
      </div>
    </div>
  );
}

const DashPanel = ({ number }: { number: number }) => {
  return (
    <>
      <div className="m-5 h-72 w-96 rounded-lg border bg-green-100 p-4 text-center hover:shadow-lg active:translate-y-1">
        Additional Chart {number}
      </div>
    </>
  );
};
