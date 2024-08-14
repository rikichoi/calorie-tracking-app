"use client";
import React, { useContext, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement
);
import { UserContext } from "@/lib/store/user-context";

export default function Analytics() {
  const { userData } = useContext(UserContext);
  const [weightChart, setWeightChart] = useState("Line");
  const weightDataHistory = userData.userWeightHistory;
  const bmiDataHistory = userData.userBmiHistory;

  const WeightChartType = [
    {
      label: "Line",
    },
    { label: "Bar" },
  ];
  // console.log(weightDataHistory)
  return (
    <div className="w-full gap-10 flex flex-row">
      <div className="w-1/2">
      <select>
          {WeightChartType.map((type) => (
            <option
              onClick={() => setWeightChart(type.label)}
              key={type.label}
              value={type.label}
            >
              {type.label}
            </option>
          ))}
        </select>
        {weightChart === "Line" ? (
          <Line
            data={{
              labels: weightDataHistory,
              datasets: [
                {
                  label: "Weight History",
                  data: weightDataHistory,
                  fill: true,
                  pointBackgroundColor: "orange",
                  borderColor: "orange",
                  backgroundColor: "orange",
                  tension: 0.1,
                },
              ],
            }}
          />
        ) : (
          <Bar
            data={{
              labels: weightDataHistory,
              datasets: [
                {
                  label: "Weight History",
                  data: weightDataHistory,
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(255, 205, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(201, 203, 207, 0.2)",
                  ],
                  borderColor: [
                    "rgb(255, 99, 132)",
                    "rgb(255, 159, 64)",
                    "rgb(255, 205, 86)",
                    "rgb(75, 192, 192)",
                    "rgb(54, 162, 235)",
                    "rgb(153, 102, 255)",
                    "rgb(201, 203, 207)",
                  ],
                  borderWidth: 1,
                },
              ],
            }}
          />
        )}
      </div>
      <div className="w-1/2">
        <Line
        className="mt-6"
          data={{
            labels: bmiDataHistory,
            datasets: [
              {
                label: "BMI History",
                data: bmiDataHistory,
                fill: true,
                pointBackgroundColor: "rgb(75, 192, 192)",
                borderColor: "rgb(75, 192, 192)",
                backgroundColor: "rgb(75, 192, 192)",
                tension: 0.1,
              },
            ],
          }}
        />
      </div>
    </div>
  );
}
