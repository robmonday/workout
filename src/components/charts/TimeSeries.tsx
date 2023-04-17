import { useState, useEffect } from "react";

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
Chart.register(CategoryScale, ChartDataLabels);

import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import { ChartData } from "chart.js/auto";

import { getWorksTimeSeries } from "../../api";

export default function TimeSeries() {
  const [dataShown, setDataShown] = useState("steps");
  const [chartData, setChartData] = useState<any>({
    labels: [],
    steps: [],
    calories: [],
    distance: [],
    minutes: [],
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
      setChartData({
        labels: data.map((element: any) => {
          const dateToCorrect = new Date(element.day);
          // this is needed because date was truncated in database for grouping
          dateToCorrect.setDate(dateToCorrect.getDate() + 1);
          const result = dateToCorrect.toLocaleDateString("en-US", {
            weekday: "short",
            month: "numeric",
            day: "numeric",
          });
          return result;
        }),
        steps: data.map((element: any) => element.steps),
        calories: data.map((element: any) => element.calories),
        miles: data.map((element: any) => element.distance),
        minutes: data.map((element: any) =>
          Math.round(element.seconds / 60) === 0
            ? null
            : Math.round(element.seconds / 60)
        ),
      });
    });
  }, []);

  // console.log(chartData);

  return (
    <>
      <div className="panel pt-3 pb-3 pl-4 pr-6">
        <div className="mx-4 my-2">
          <div className="inline py-2 text-lg text-gray-700">Time Series</div>
          <select
            onChange={(e) => setDataShown(e.target.value)}
            className="float-right inline rounded-md bg-gray-100 px-2 py-1 text-sm"
          >
            <option value="steps">Steps</option>
            <option value="calories">Calories</option>
            <option value="miles">Miles</option>
            {/* <option value="minutes">Minutes</option> */}
          </select>
        </div>
        <Bar
          data={{
            labels: chartData.labels,
            datasets: [{ label: chartData.labels, data: chartData[dataShown] }],
          }}
          options={{
            plugins: {
              tooltip: { enabled: false },
              legend: { display: false, position: "top" },
              datalabels: {
                display: true,
                formatter: (value, context) => {
                  if (isNaN(value)) return "";
                  return value && parseInt(value).toLocaleString("en-US");
                },
                color: "black",
                anchor: "center",
                textAlign: "center",
                font: { size: 14 },
                offset: 0,
                align: "top",
              },
            },
            aspectRatio: 3,
            responsive: true,
            scales: { x: { grid: { lineWidth: 0 } } },
          }}
        />
      </div>
    </>
  );
}
