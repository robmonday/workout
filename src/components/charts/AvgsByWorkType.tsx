import { useEffect, useState } from "react";

import { ChartData, ChartOptions } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

import { getAvgsByWorkType } from "../../api";

type Avgs = {
  workoutName: string;
  steps: number;
  calories: number;
  distance: string;
};

type AvgByWorkTypeProps = {
  metric: string;
};

export default function AvgByWorkType({
  metric = "distance",
}: AvgByWorkTypeProps) {
  const [data, setData] = useState<Avgs[]>([]);

  const getData = async () => {
    const data = await getAvgsByWorkType();
    // console.log("avg by workout type", data);
    return data;
  };

  useEffect(() => {
    getData().then((data) => {
      setData(data);
    });
  }, []);

  const chartData: ChartData<"bar"> = {
    labels: data.map((t) => t.workoutName),
    datasets: [
      {
        label: "Average By Workout Type",
        data: data.map((t) => parseFloat(t[metric]).toFixed(2).toString()),
        backgroundColor: "rgba(255, 255, 0, 0.5)",
      },
    ],
  };

  const chartOptions: ChartOptions = {
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
      datalabels: {
        display: true,
        anchor: "end",
        font: { size: 14, weight: "bold" },
      },
    },
  };

  return (
    <div className="panel pt-3 pb-3 pl-4 pr-6">
      <div className="mb-4 text-center text-xl text-gray-700">
        Average {metric.slice(0, 1).toUpperCase() + metric.slice(1)} by Workout
        Type
      </div>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}
