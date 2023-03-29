import Panel from "./Panel";

export default function Dashboard() {
  return (
    <div className="inline-flex border">
      <Panel title="Dashboard">
        <DashPanel number={1} />
        <DashPanel number={2} />
        <DashPanel number={3} />
        <DashPanel number={4} />
        <DashPanel number={5} />
        <DashPanel number={6} />
      </Panel>
    </div>
  );
}

type DashPanelProps = {
  number: number;
};

const DashPanel = ({ number }: DashPanelProps) => {
  return (
    <>
      <div className="m-5 w-5 rounded-lg border bg-green-200 p-4 text-center hover:shadow-lg active:translate-y-1">
        Chart {number}
      </div>
    </>
  );
};
