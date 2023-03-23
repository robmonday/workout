import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getAllWorkouts } from "../api";
import { Camera, Edit2, Plus, Trash2 } from "react-feather";

import { Workout } from "../types";

import { dateToWeekdayDate, dateToTime, enumToTitleCase } from "../util";

export default function WorkoutHistory() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout>();

  useEffect(() => {
    getAllWorkouts().then((w: Workout[]) => {
      const sortedWorkouts = w.sort(
        (a: Workout, b: Workout) => Date.parse(b.start) - Date.parse(a.start)
      );
      setWorkouts(sortedWorkouts);
    });
  }, []);

  return (
    <div className="p-2">
      <div className="p-2 text-2xl">Workout History</div>
      <div className="flex h-96">
        <div className="min-h-96 m-2 w-1/4  rounded-lg border bg-gradient-to-br from-purple-200 to-purple-300 px-2 ">
          <WorkoutSearchBar />
          <WorkoutHistoryList
            workouts={workouts}
            setSelectedWorkout={setSelectedWorkout}
          />
        </div>
        <div className="m-2 h-auto  w-3/4 rounded-lg border bg-gradient-to-br from-purple-200 to-purple-300 p-4 ">
          {workouts.length > 0 && (
            <WorkoutDetail workout={selectedWorkout || workouts[0]} />
          )}
        </div>
      </div>
    </div>
  );
}

type WorkoutHistoryListProps = {
  workouts: Workout[];
  setSelectedWorkout: Dispatch<SetStateAction<Workout | undefined>>;
};

const WorkoutHistoryList = ({
  workouts,
  setSelectedWorkout,
}: WorkoutHistoryListProps) => {
  const handleClick = (id: string) => {
    const selectedWorkout = workouts.find((w) => w.id === id);
    setSelectedWorkout(selectedWorkout);
  };
  return (
    <>
      <div className="overflow-y-scroll">
        {workouts.map((w) => (
          <div
            key={w.id}
            onClick={() => handleClick(w.id)}
            className="my-2 rounded-lg border border-purple-500 p-2 hover:bg-purple-300 active:translate-y-0.5 active:bg-purple-400"
          >
            <div className="inline">{w.type && enumToTitleCase(w.type)}</div>

            <div className="float-right inline font-light text-purple-700">
              <div className="mr-4 inline">
                {w.start && dateToWeekdayDate(w.start)}
              </div>
              <Edit2
                className="inline border-purple-500 hover:border-black"
                strokeWidth={0.75}
              />
              <Trash2 className="inline" strokeWidth={0.75} />{" "}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const WorkoutSearchBar = () => {
  return (
    <>
      <div className="text-md my-4 border bg-gray-50 py-2 px-2 text-gray-500">
        Search Bar
      </div>
      <hr className="mt-4 mb-2 border-2 border-purple-300"></hr>
      <Plus strokeWidth={1} />
    </>
  );
};

type WorkoutDetailProps = {
  workout: Workout;
};

const WorkoutDetail = ({ workout }: WorkoutDetailProps) => {
  const minutes = Math.floor(
    (Date.parse(workout.end) - Date.parse(workout.start)) / (1000 * 60)
  );
  return (
    <>
      <div className="mb-3">
        <div className="inline text-2xl font-light">
          {enumToTitleCase(workout.type)}
        </div>
        <div className="ml-4 inline font-light text-purple-800">
          {dateToTime(workout.start)}
        </div>
      </div>
      <div className="">
        <div className="my-2 font-light text-gray-900">{workout.notes}</div>
        <div className="my-2 font-light text-gray-900">
          {minutes && minutes > 0 && `${minutes} minutes`}
        </div>
        <div className="my-2 font-light text-gray-900">
          {workout.steps && `${workout.steps.toLocaleString("en-US")} steps`}
        </div>
        <div className="my-2 font-light text-gray-900">
          {workout.distance && `${workout.distance} miles`}
        </div>
        <div className="my-2 font-light text-gray-900">
          {workout.calories &&
            `${workout.calories.toLocaleString("en-US")} calories`}
        </div>
      </div>
    </>
  );
};
