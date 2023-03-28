export default function Dashboard() {
  return (
    <>
      <div className="px-2">
        <div className="p-2 text-2xl">Dashboard</div>
        <div className="flex h-96">
          <div className="m-2 flex w-full flex-wrap place-content-evenly rounded-lg border bg-gradient-to-br from-purple-200 to-purple-300 px-2 ">
            <DashPanel number={1} />
            <DashPanel number={2} />
            <DashPanel number={3} />
            <DashPanel number={4} />
            <DashPanel number={5} />
            <DashPanel number={6} />
          </div>
        </div>
      </div>
    </>
  );
}

type DashPanelProps = {
  number: number;
};

const DashPanel = ({ number }: DashPanelProps) => {
  return (
    <>
      <div className="m-5 w-auto rounded-lg border bg-green-200 p-4 text-center hover:shadow-lg active:translate-y-1">
        Chart {number}
      </div>
    </>
  );
};
