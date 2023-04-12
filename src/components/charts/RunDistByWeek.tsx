import { useEffect, useState } from "react";

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);

import { Bar, Line } from "react-chartjs-2";
import { ChartData } from "chart.js/auto";

import { Data } from "../../Data";

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
        <h2 className="text-center text-gray-700">Running Distance by Week</h2>
        <Line
          data={chartData}
          options={{ plugins: { legend: { display: false } }, aspectRatio: 3 }}
        />
      </div>
    </>
  );
}
