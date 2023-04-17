import { useState, useEffect, Fragment, useContext } from "react";
import { getLeaderboard } from "../api";
import { StateContext } from "./StateProvider";

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
  const [leaderboard, setLeaderboard] = useState<Leader[]>([]);
  useEffect(() => {
    getLeaderboard().then((result) => setLeaderboard(result));
  }, []);

  return (
    <>
      <div className="p-2 text-2xl">Leaderboards for Weekly Activity</div>
      <div className="panel flex flex-wrap place-content-evenly border pb-4">
        <div className="pr-2 pb-4">
          <div className=" pb-2 text-lg">Steps Taken</div>
          <div className="grid grid-cols-2 rounded-md  border border-white bg-purple-300 p-2">
            {leaderboard
              .sort((a, b) => b._sum.steps - a._sum.steps)
              .map((leader) => (
                <LeaderboardLine
                  leader={leader}
                  value={leader._sum.steps}
                  key={leader.id}
                />
              ))}
          </div>
        </div>

        <div className="pr-2 pb-4">
          <div className=" pb-2 text-lg">Calories Burned</div>
          <div className="grid grid-cols-2 rounded-md  border border-white bg-purple-300 p-2">
            {leaderboard
              .sort((a, b) => b._sum.calories - a._sum.calories)
              .map((leader) => (
                <LeaderboardLine
                  leader={leader}
                  value={leader._sum.calories}
                  key={leader.id}
                />
              ))}
          </div>
        </div>

        <div className="pr-2 pb-4">
          <div className=" pb-2 text-lg">Miles Travelled</div>
          <div className="grid grid-cols-2 rounded-md  border border-white bg-purple-300 p-2">
            {leaderboard
              .sort((a, b) => b._sum.distance - a._sum.distance)
              .map((leader) => (
                <LeaderboardLine
                  leader={leader}
                  value={leader._sum.distance}
                  key={leader.id}
                />
              ))}
          </div>
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
    <>
      <div
        className={`${
          leader.id === state.user.id && winner
        } rounded-l rounded-b-none  px-1 py-0.5 `}
      >
        {leader.firstName} {leader.lastName}
      </div>
      <div
        className={`${
          leader.id === state.user.id && winner
        } rounded-r rounded-b-none p-0.5 px-1 text-right `}
      >
        {value.toLocaleString("en-US")}
      </div>
    </>
  );
}
