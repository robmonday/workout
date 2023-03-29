import { useState } from "react";

import { Chart as ChartJS, registerables } from "chart.js";
ChartJS.register(...registerables);
import { Bar, Line } from "react-chartjs-2";

import { UserData } from "../Data";

function ChartExample1() {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 0.5,
      },
    ],
  });

  return (
    <div className="w-[900px]">
      <Line data={userData} />
    </div>
  );
}

export default ChartExample1;
