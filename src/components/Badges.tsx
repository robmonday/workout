export default function Badges() {
  return (
    <>
      <div className="px-2">
        <div className="p-2 text-2xl">Badges</div>
        <div className="flex h-36">
          <div className="m-2 flex w-full flex-wrap justify-evenly rounded-lg border bg-gradient-to-br from-purple-200 to-purple-300 px-2 ">
            <Badge />
            <Badge />
            <Badge />
            <Badge />
            <Badge />
            <Badge />
          </div>
        </div>
      </div>
    </>
  );
}

const Badge = () => {
  return (
    <>
      <div className="m-5 w-24 rounded-lg border bg-orange-200 p-4 text-center hover:shadow-lg active:-translate-y-1">
        Badge
      </div>
    </>
  );
};
