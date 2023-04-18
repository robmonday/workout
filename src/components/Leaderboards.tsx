import { useState, useEffect, Fragment, useContext } from "react";
import { getLeaderboard } from "../api";
import { StateContext } from "./StateProvider";
import { Plus, Minus } from "react-feather";

type Leader = {
  _sum: {
    steps: number;
    calories: number;
    distance: number;
  };
  id: string;
  firstName: string;
  lastName: string;
  city: string;
  state: string;
  email: string;
};

export default function Leaderboards() {
  const [stepsLeaderboard, setStepsLeaderboard] = useState<LeaderPlus[]>([]);
  const [caloriesLeaderboard, setCaloriesLeaderboard] = useState<LeaderPlus[]>(
    []
  );
  const [distanceLeaderboard, setDistanceLeaderboard] = useState<LeaderPlus[]>(
    []
  );

  useEffect(() => {
    getLeaderboard().then((result) => {
      const stepsArr1 = result
        .sort((a: Leader, b: Leader) => b._sum.steps - a._sum.steps)
        .slice(0, 30);
      const stepsArr2 = stepsArr1.map((e: Leader) => {
        return { ...e, value: e._sum.steps };
      });
      setStepsLeaderboard(stepsArr2);

      const caloriesArr1 = result
        .sort((a: Leader, b: Leader) => b._sum.calories - a._sum.calories)
        .slice(0, 30);
      const caloriesArr2 = caloriesArr1.map((e: Leader) => {
        return { ...e, value: e._sum.calories };
      });
      setCaloriesLeaderboard(caloriesArr2);

      const distanceArr1 = result
        .sort((a: Leader, b: Leader) => b._sum.distance - a._sum.distance)
        .slice(0, 30);
      const distanceArr2 = distanceArr1.map((e: Leader) => {
        return { ...e, value: e._sum.distance };
      });
      setDistanceLeaderboard(distanceArr2);
    });
  }, []);

  return (
    <>
      <div className="p-2 text-2xl">Leaderboards for Weekly Activity</div>
      <div className="panel flex flex-wrap place-content-evenly border pb-4">
        <Leaderboard title="Steps Taken" leaderboard={stepsLeaderboard} />
        <Leaderboard
          title="Calories Burned"
          leaderboard={caloriesLeaderboard}
        />
        <Leaderboard
          title="Miles Travelled"
          leaderboard={distanceLeaderboard}
        />
      </div>
    </>
  );
}

type LeaderPlus = Leader & { value: number };

type LeaderboardProps = {
  title: string;
  leaderboard: LeaderPlus[];
};

export function Leaderboard({ title, leaderboard }: LeaderboardProps) {
  const [numResultsToShow, setNumResultsToShow] = useState(5);

  return (
    <>
      <div className="w-[14rem] pr-2 pb-4">
        <div className=" pb-2 text-lg">{title}</div>
        <div className="rounded-md  border border-white bg-purple-300 p-2">
          {leaderboard
            .sort((a, b) => b.value - a.value)
            .slice(0, numResultsToShow)
            .map((leader) => (
              <LeaderboardLine
                leader={leader}
                value={leader.value}
                key={leader.id}
              />
            ))}
        </div>
        <div
          className="relative bottom-2 right-2 float-right rounded-full border border-white bg-purple-300 p-0.5 hover:bg-purple-400 hover:text-black"
          onClick={() =>
            numResultsToShow === 5
              ? setNumResultsToShow(10)
              : setNumResultsToShow(5)
          }
        >
          {numResultsToShow === 5 ? (
            <Plus strokeWidth={0.75} size={16} />
          ) : (
            <Minus strokeWidth={0.75} size={16} />
          )}
        </div>
      </div>
    </>
  );
}

type LeaderboardLineProps = {
  leader: Leader;
  value: number;
};

export function LeaderboardLine({ leader, value }: LeaderboardLineProps) {
  const state = useContext(StateContext);
  const winner = "bg-purple-400";
  return (
    <div
      className={`flex justify-between hover:shadow-lg active:translate-y-1 ${
        leader.id === state.user.id && winner
      }`}
    >
      <div className={"rounded-l rounded-b-none px-1 py-0.5"}>
        {leader.firstName} {leader.lastName}
      </div>
      <div className={"rounded-r rounded-b-none p-0.5 px-1 text-right"}>
        {value.toLocaleString("en-US")}
      </div>
    </div>
  );
}
