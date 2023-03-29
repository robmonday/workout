import ChartExample1 from "./ChartExample1";

export default function Dashboard() {
  return (
    <div className="">
      <div className="p-2 text-xl">Dashboard</div>
      <div className="panel w-max">
        <ChartExample1 />
      </div>
      <div className="panel flex justify-between">
        <DashPanel number={1} />
        <DashPanel number={2} />
        <DashPanel number={3} />
      </div>
    </div>
  );
}

type DashPanelProps = {
  number: number;
};

const DashPanel = ({ number }: DashPanelProps) => {
  return (
    <>
      <div className="m-5 w-32 rounded-lg border bg-green-200 p-4 text-center hover:shadow-lg active:translate-y-1">
        Chart {number}
      </div>
    </>
  );
};
