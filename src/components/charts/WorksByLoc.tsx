import { useEffect, useState } from "react";

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
Chart.register(CategoryScale, ChartDataLabels);

import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import { ChartData } from "chart.js/auto";

import { getWorksGrpByLoc } from "../../api";

export default function WorksByLoc() {
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
    <>
      <div className="pr-2 pb-4">
        <div className="p-2 text-lg sm:text-xl md:text-2xl">
          Workouts By Location
        </div>
        <div className="panel pt-3 pb-3">
          <Doughnut
            data={chartData}
            options={{
              plugins: {
                tooltip: { enabled: true },
                legend: { display: false },
                datalabels: {
                  // formatter: function (value, context: any) {
                  //   return (
                  //     context.chart.data.labels[context.dataIndex] +
                  //     "\n" +
                  //     value
                  //   );
                  // },
                  color: "black",
                  // backgroundColor: "white",
                  opacity: 0.6,
                  anchor: "center",
                  textAlign: "center",
                  font: { size: 16 },
                },
              },
              cutout: "70%",
              maintainAspectRatio: false,
            }}
          />
        </div>
      </div>
    </>
  );
}
