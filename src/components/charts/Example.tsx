import { useEffect, useState } from "react";

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);

import { Bar, Line } from "react-chartjs-2";
import { ChartData } from "chart.js/auto";

import { getWorkoutsGrpByLoc } from "../../api";

export default function Example() {
  const [chartData, setChartData] = useState<ChartData<"bar">>({
    datasets: [],
  });

  const getData = async () => {
    const data = await getWorkoutsGrpByLoc();
    console.log(data.slice(0, 4));
    return data;
  };

  useEffect(() => {
    getData().then((data) => {
      setChartData({
        labels: data.map((element: any) => element.location),
        datasets: [
          {
            // label: "",
            data: data.map((element: any) => element._count),
          },
        ],
      });
    });
  }, []);

  return (
    <div>
      <div className="panel pt-3 pb-3 pl-4 pr-6">
        <h2 className="text-center text-gray-700">Workouts Per Location</h2>
        <Bar
          data={chartData}
          options={{ plugins: { legend: { display: false } } }}
        />
      </div>
    </div>
  );
}
