import { useEffect, useState } from "react";

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
Chart.register(CategoryScale, ChartDataLabels);

import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import { ChartData } from "chart.js/auto";

import { getWorksGrpByLoc } from "../../api";

export default function Example() {
  const [chartData, setChartData] = useState<ChartData<"doughnut">>({
    datasets: [],
  });

  const getData = async () => {
    const data = await getWorksGrpByLoc();
    // console.log(data.slice(0, 4));
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
        <h2 className="mb-4 text-center text-gray-700">Workouts By Location</h2>
        <Doughnut
          data={chartData}
          options={{
            plugins: {
              tooltip: { enabled: false },
              legend: { display: false },
              datalabels: {
                formatter: function (value, context: any) {
                  return (
                    context.chart.data.labels[context.dataIndex] + "\n" + value
                  );
                },
                color: "black",
                backgroundColor: "white",
                opacity: 0.6,
                anchor: "start",
                textAlign: "center",
                font: { size: 14 },
              },
            },
            cutout: "70%",
          }}
        />
      </div>
    </div>
  );
}
