"use client";
import React, { useContext, useEffect, useState } from "react";
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
import { MealContext } from "@/lib/store/meals-context";

export default function Analytics() {
  const { mealsData, getUserMealsData } = useContext(MealContext);
  const { userData } = useContext(UserContext);
  const [weightChart, setWeightChart] = useState("Line");
  const [bmiChart, setBmiChart] = useState("Line");
  const weightHistory = userData.userWeightHistory.map(
    (weight) => weight.userWeight
  );
  const weightDateHistory = userData.userWeightHistory.map((weight) =>
    weight.createdAt.toDate().toLocaleDateString()
  );
  const combinedWeightData = weightDateHistory.map((date, index) => ({
    date,
    weight: weightHistory[index],
  }));
  combinedWeightData.sort(
    (a, b) =>
      new Date(a.date.split("/").reverse().join("-")) -
      new Date(b.date.split("/").reverse().join("-"))
  );
  const sortedWeightDateHistory = combinedWeightData.map((item) => item.date);
  const sortedWeightHistory = combinedWeightData.map((item) => item.weight);
  const bmiHistory = userData.userBmiHistory.map((bmi) => bmi.userBmi);
  const bmiDateHistory = userData.userBmiHistory.map((bmi) =>
    bmi.createdAt.toDate().toLocaleDateString()
  );
  const combinedBmiData = bmiDateHistory.map((date, index) => ({
    date,
    bmi: bmiHistory[index],
  }));
  combinedBmiData.sort(
    (a, b) =>
      new Date(a.date.split("/").reverse().join("-")) -
      new Date(b.date.split("/").reverse().join("-"))
  );
  const sortedBmiDateHistory = combinedBmiData.map((item) => item.date);
  const sortedBmiHistory = combinedBmiData.map((item) => item.bmi);


  useEffect(() => {
    getUserMealsData();
  }, []);

  let groups = mealsData
    .filter(({ hidden }) => !hidden)
    .map(({ createdAt, protein, fat, carbohydrate }) => ({
      date: createdAt.toDate().toLocaleDateString(),
      protein,
      fat,
      carbohydrate,
    }))
    .reduce((group, { date, protein, fat, carbohydrate }) => {
      if (!group[date]) {
        group[date] = { protein: 0, fat: 0, carbohydrate: 0 };
      }
      group[date].protein += protein;
      group[date].fat += fat;
      group[date].carbohydrate += carbohydrate;
      return group;
    }, {});

  const dates = Object.keys(groups).sort((a, b) => {
    const dateA = new Date(a.split("/").reverse().join("-"));
    const dateB = new Date(b.split("/").reverse().join("-"));
    return dateA - dateB;
  });
  const proteinData = dates.map((date) => groups[date].protein);
  const fatData = dates.map((date) => groups[date].fat);
  const carbohydrateData = dates.map((date) => groups[date].carbohydrate);

  const data = {
    labels: dates,
    protein: {
      dataSet: proteinData,
    },
    fat: {
      dataSet: fatData,
    },
    carb: {
      dataSet: carbohydrateData,
    },
  };

  const WeightChartType = [
    {
      label: "Line",
    },
    { label: "Bar" },
  ];

  const BmiChartType = [
    {
      label: "Line",
    },
    { label: "Bar" },
  ];

  return (
    <div className="w-full space-y-10 font-poppins">
      <div className="w-full gap-10 flex flex-row">
        <div className="w-1/2">
          <div className="flex w-full flex-row items-center mb-4">
            <select className="w-fit px-2">
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
            <h1 className="text-lg mx-auto pr-14">Weight History</h1>
          </div>
          {weightChart === "Line" ? (
            <Line
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
              data={{
                labels: sortedWeightDateHistory,
                datasets: [
                  {
                    label: "Weight History",
                    data: sortedWeightHistory,
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
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
              data={{
                labels: sortedWeightDateHistory,
                responsive: true,
                offset: true,
                datasets: [
                  {
                    label: "Weight History",
                    data: sortedWeightHistory,
                    backgroundColor: [
                      "rgba(255, 99, 132, 1)",
                      "rgba(255, 159, 64, 1)",
                      "rgba(255, 205, 86, 1",
                      "rgba(75, 192, 192, 1)",
                      "rgba(54, 162, 235, 1)",
                      "rgba(153, 102, 255, 1)",
                      "rgba(201, 203, 207, 1)",
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
          <Bar
            pointStyle="star"
            data={{
              labels: data.labels,
              responsive: true,
              offset: true,
              datasets: [
                {
                  stack: "Stack",
                  label: "Protein",
                  pointStyle: "rectRounded",
                  backgroundColor: "#388e3c",
                  barThickness: 40,
                  categoryPercentage: 1,
                  data: data.protein.dataSet,
                },
                {
                  stack: "Stack",
                  label: "Fat",
                  backgroundColor: "#f57c00",
                  barThickness: 40,
                  categoryPercentage: 1,
                  pointStyle: "triangle",
                  data: data.fat.dataSet,
                },
                {
                  stack: "Stack",
                  label: "Carb",
                  backgroundColor: "#0288d1",
                  barThickness: 40,
                  categoryPercentage: 1,
                  pointStyle: "triangle",
                  data: data.carb.dataSet,
                },
              ],
            }}
            height={220}
            options={{
              offsetGridLines: true,
              drawTicks: true,
              layout: {
                padding: {
                  top: 30,
                  right: 40,
                  bottom: 40,
                },
              },
              legend: {
                display: true,
                position: "right",
                align: "start",
                labels: {
                  usePointStyle: true,
                },
              },
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        </div>
      </div>
      <div className="w-1/2">
        <div className="flex w-full flex-row items-center mb-4">
          <select className="w-fit px-2">
            {BmiChartType.map((type) => (
              <option
                onClick={() => setBmiChart(type.label)}
                key={type.label}
                value={type.label}
              >
                {type.label}
              </option>
            ))}
          </select>
          <h1 className="text-lg mx-auto pr-14">BMI History</h1>
        </div>
        {bmiChart === "Line" ? (
          <Line
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
            data={{
              labels: sortedBmiDateHistory,
              datasets: [
                {
                  label: "BMI History",
                  data: sortedBmiHistory,
                  fill: true,
                  pointBackgroundColor: "#ab47bc",
                  borderColor: "#ab47bc",
                  backgroundColor: "#ab47bc",
                  tension: 0.1,
                },
              ],
            }}
          />
        ) : (
          <Bar
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
            data={{
              labels: sortedBmiDateHistory,
              responsive: true,
              offset: true,
              datasets: [
                {
                  label: "BMI History",
                  data: sortedBmiHistory,
                  backgroundColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(255, 159, 64, 1)",
                    "rgba(255, 205, 86, 1",
                    "rgba(75, 192, 192, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(201, 203, 207, 1)",
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
    </div>
  );
}
