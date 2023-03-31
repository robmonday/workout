import { useState, useEffect } from "react";

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
Chart.register(CategoryScale, ChartDataLabels);

import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import { ChartData } from "chart.js/auto";

import { getWorksTimeSeries } from "../../api";

export default function TimeSeries() {
  const [availableDatasets, setAvailableDatasets] = useState<any[]>([]);
  const [dateLabels, setDateLabels] = useState<any[]>([]);
  const [chartData, setChartData] = useState<ChartData<"bar">>({
    datasets: [],
  });

  const getData = async () => {
    const data1 = await getWorksTimeSeries();
    const data2 = data1.reduce((accumulator: any, cur: any) => {
      let date = cur.day;
      let found = accumulator.find((elem: any) => elem.day === date);
      if (found) {
        found.seconds += cur.seconds; // integer in database, calc field in query
        found.steps += cur.steps; // integer in database
        found.calories += cur.calories; // integer in database
        found.distance = parseFloat(found.distance) + parseFloat(cur.distance); // float in database
      } else {
        accumulator.push(cur);
      }
      return accumulator;
    }, []);

    return data2;
  };

  useEffect(() => {
    getData().then((data) => {
      // console.log(data);

      setDateLabels(
        data.map((element: any) => {
          const dateToCorrect = new Date(element.day);
          // this is needed because date was truncated in database for grouping
          dateToCorrect.setDate(dateToCorrect.getDate() + 1);
          const result = dateToCorrect.toLocaleDateString("en-US", {
            weekday: "short",
            month: "numeric",
            day: "numeric",
          });
          return result;
        })
      );

      setAvailableDatasets([
        {
          label: "Steps",
          data: data.map((element: any) => element.steps),
        },
        {
          label: "Calories",
          data: data.map((element: any) => element.calories),
        },
        {
          label: "Miles",
          data: data.map((element: any) => element.distance),
        },
        {
          label: "Minutes",
          data: data.map((element: any) => Math.round(element.seconds / 60)),
        },
      ]);

      setChartData({
        labels: dateLabels,
        datasets: [availableDatasets[0]],
      });
    });
  }, []);

  const selectionHandler = (selection: string) => {
    const newChartData = {
      ...chartData,
      datasets: [
        availableDatasets.find((element) => element.label === selection),
      ],
    };
    setChartData(newChartData);
  };

  return (
    <div>
      <div className="panel w-full pt-3 pb-3 pl-4 pr-6">
        <div className="mx-4 my-2">
          <div className="inline py-2  text-gray-700">
            <span className="mr-2 text-lg font-semibold">
              {chartData.datasets[0]?.label}
            </span>
            <span className="text-lg">Over Past 30 Days</span>
          </div>
          <select
            onChange={(e) => selectionHandler(e.target.value)}
            className="float-right inline rounded-md bg-gray-100 px-2 py-1 text-sm"
          >
            <option value="Steps">Steps</option>
            <option value="Calories">Calories</option>
            <option value="Miles">Miles</option>
            <option value="Minutes">Minutes</option>
          </select>
        </div>
        <Bar
          data={chartData}
          options={{
            plugins: {
              tooltip: { enabled: true },
              legend: { display: true, position: "bottom" },
              datalabels: {
                display: false,
                formatter: function (value: string, context: any) {
                  return (
                    // context.chart.data.labels[context.dataIndex] + "\n" +
                    value && parseInt(value).toLocaleString("en-US")
                  );
                },
                color: "black",
                anchor: "end",
                textAlign: "center",
                font: { size: 14 },
                offset: 0,
                align: "top",
              },
            },
            aspectRatio: 5,
            responsive: true,
            scales: { x: { grid: { lineWidth: 0 } } },
          }}
        />
      </div>
    </div>
  );
}
