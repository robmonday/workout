import RunDistByWeek from "./charts/RunDistByWeek";
import Example from "./charts/Example";

export default function Dashboard() {
  return (
    <div className="">
      <div className="p-2 text-xl">Dashboard</div>
      <div className="inline-block w-1/2">
        <Example />
      </div>
      <div className="inline-block w-1/2">
        <RunDistByWeek />
      </div>

      <div className="panel flex justify-between">
        <DashPanel number={1} />
        <DashPanel number={2} />
        <DashPanel number={3} />
      </div>
    </div>
  );
}

const DashPanel = ({ number }: { number: number }) => {
  return (
    <>
      <div className="m-5 w-32 rounded-lg border bg-green-200 p-4 text-center hover:shadow-lg active:translate-y-1">
        Chart {number}
      </div>
    </>
  );
};
