import { useEffect, useState } from "react";

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);

import { Bar, Line } from "react-chartjs-2";
import { ChartData } from "chart.js/auto";

const Data = [
  {
    id: 1,
    year: 2016,
    userGain: 80000,
    userLost: 823,
  },
  {
    id: 2,
    year: 2017,
    userGain: 45677,
    userLost: 345,
  },
  {
    id: 3,
    year: 2018,
    userGain: 78888,
    userLost: 555,
  },
  {
    id: 4,
    year: 2019,
    userGain: 90000,
    userLost: 4555,
  },
  {
    id: 5,
    year: 2020,
    userGain: 4300,
    userLost: 234,
  },
];

export default function RunDistByWeek() {
  const [chartData, setChartData] = useState<ChartData<"line">>({
    datasets: [],
  });

  useEffect(() => {
    setChartData({
      labels: Data.map((element: any) => element.year),
      datasets: [
        {
          // label: "",
          data: Data.map((data: any) => data.userGain),
        },
        {
          // label: "",
          data: Data.map((data: any) => data.userLost),
        },
      ],
    });
  }, []);

  return (
    <>
      <div className="panel pt-3 pb-3 pl-4 pr-6">
        <h2 className="text-center text-xl text-gray-700">
          Running Distance by Week
        </h2>
        <Line
          data={chartData}
          options={{ plugins: { legend: { display: false } }, aspectRatio: 4 }}
        />
      </div>
    </>
  );
}
