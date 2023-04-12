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

      <div className="py-2">
        <TimeSeries />
      </div>

      <div className="flex flex-wrap py-2">
        <div className="w-[23rem]">
          <WorksByLoc />
        </div>
        <div className="w-[66rem]">
          <RunDistByWeek />
        </div>
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

      <div className="py-2">
        <div className="panel flex flex-wrap justify-evenly">
          <div className="w-[29rem] py-2">
            <DashPanel number={1} />
          </div>
          <div className="w-[29rem] py-2">
            <DashPanel number={2} />
          </div>
          <div className="w-[29rem] py-2">
            <DashPanel number={3} />
          </div>
        </div>
      </div>
    </div>
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
