"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import Avocado from "../../images/avocado-image.png";
import Chicken from "../../images/chicken-image.png";
import Bowl from "../../images/bowl-image.png";
import Smoothie from "../../images/smoothie-image.png";
import Yogurt from "../../images/yogurt-image.png";
import Running from "../../images/running-image.png";
import Jumping from "../../images/jumping-image.png";
import Swimming from "../../images/swimming-image.png";
import { numberFormatter } from "@/lib/utils";
import LogMealItem from "@/components/LogMealItem";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useState } from "react";
import Modal from "@/components/Modal";

ChartJS.register(ArcElement, Tooltip);

export default function Dashboard() {
const [openMealModal, setOpenMealModal] = useState(false)

  const DUMMY_USER = [
    {
      maintenanceCal: 2000,
      consumedCal: 1572,
      reminingCal: 428,
    },
  ];

  const DUMMY_DATA = [
    {
      id: 1,
      mealImage: Avocado,
      mealName: "Avocado Toast",
      mealCal: 275,
      mealProtein: 25,
      mealWeight: 300,
    },
    {
      id: 2,
      mealImage: Chicken,
      mealName: "Grilled Chicken Salad",
      mealCal: 447,
      mealProtein: 10,
      mealWeight: 125,
    },
    {
      id: 3,
      mealImage: Yogurt,
      mealName: "Greek Yogurt",
      mealCal: 750,
      mealProtein: 50,
      mealWeight: 100,
    },
    {
      id: 4,
      mealImage: Bowl,
      mealName: "Quinoa Bowl",
      mealCal: 430,
      mealProtein: 37,
      mealWeight: 258,
    },
    {
      id: 5,
      mealImage: Smoothie,
      mealName: "Peanut Butter Smoothie",
      mealCal: 200,
      mealProtein: 20,
      mealWeight: 175,
    },
  ];
  return (
    <>
      {/* Modal Section */}
<Modal show={openMealModal} onClose={setOpenMealModal}>
  Reusable Modal
</Modal>
      <main className="flex min-h-screen h-[1000px] flex-col items-center pr-24 pl-24 pt-8">
        <div className="w-5/6">
          <h1 className="text-2xl font-bold font-Epilogue">
            Good morning, Julia
          </h1>
          <p className="text-gray-500 text-sm pt-2 pb-4 font-light font-Inter">
            Here&apos;s your daily summary
          </p>
        </div>
        {/* Left Overview Section */}
        <div className="w-5/6 grid grid-cols-2 gap-4">
          <div className="bg-gray-200 items-center rounded-xl pl-3 pr-3 grid grid-cols-3 shadow-xl border-2 border-gray-600">
            <ul className="pl-12 col-span-2">
              <li className="text-sm">You have consumed</li>
              <li className="text-lg pt-3 font-bold">
                <span className="text-green-500">{numberFormatter(1500)}</span>/
                {numberFormatter(2000)}
              </li>
              <li className="font-bold">Calories</li>
            </ul>

            <div className="items-center justify-center flex ">
              <Doughnut
                className="p-2"
                data={{
                  labels: [`Consumed Calories`, `Remaining Calories`],
                  datasets: [
                    {
                      label: "Remaining Calories",
                      data: [
                        DUMMY_USER.map((user) => user.consumedCal),
                        DUMMY_USER.map((user) => user.reminingCal),
                      ],
                      backgroundColor: ["#FFA500", "#000000"],
                      borderWidth: 5,
                    },
                  ],
                }}
              />
              <div className="absolute">
                <span className="text-center flex text-sm font-bold text-gray-800 ">
                  {DUMMY_USER.map((user) => user.reminingCal)}
                </span>
              </div>
            </div>
          </div>
          {/* Right Overview Section */}
          <div className="bg-gray-200 rounded-xl px-5 flex items-center shadow-xl border-2 border-gray-600">
            <ul className="space-y-1 w-full">
              <li className="text-sm">Protein</li>
              <div
                className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700"
                role="progressbar"
                aria-valuenow="50"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div className="flex flex-col justify-center rounded-full overflow-hidden bg-yellow-500 text-xs text-white text-center whitespace-nowrap transition duration-500 w-5/6"></div>
              </div>{" "}
              <li className="text-sm">Net Carbs</li>
              <div
                className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700"
                role="progressbar"
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div className="flex flex-col justify-center overflow-hidden bg-blue-600 text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-500 w-3/4"></div>
              </div>
              <li className="text-sm">Fat</li>
              <div
                className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700"
                role="progressbar"
                aria-valuenow="50"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div className="flex flex-col justify-center rounded-full overflow-hidden bg-red-500 text-xs text-white text-center whitespace-nowrap transition duration-500 w-1/2"></div>
              </div>
            </ul>
          </div>
        </div>
        {/* Calorie Goal Progress Bar */}
        <div className="w-5/6 mt-10">
          {/* this might have to turn into a list so we can allow for mapping data */}
          <p>Daily Calorie Goal</p>
          <div
            className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700"
            role="progressbar"
            aria-valuenow="50"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div className="flex flex-col justify-center rounded-full overflow-hidden bg-teal-500 text-xs text-white text-center whitespace-nowrap transition duration-500 w-4/5"></div>
          </div>
          <p>1,500 of 2,000 calories</p>
        </div>
        {/* Meal Logging Section */}
        <div className="w-5/6 mt-10">
          <h1 className="text-2xl font-bold mb-3">Quick Add</h1>
          <div className="grid grid-cols-7 gap-6 mb-3">
            <div className="col-span-1">
              <Link
                href={"/dashboard"}
                className="bg-gray-300 justify-center py-1 flex rounded-full"
              >
                Food
              </Link>
            </div>
            <div className="col-span-1">
              {" "}
              <Link
                href={"/dashboard"}
                className="bg-gray-300 justify-center py-1 flex rounded-full"
              >
                Drinks
              </Link>
            </div>
            <div className="col-span-1">
              {" "}
              <Link
                href={"/dashboard"}
                className="bg-gray-300 justify-center py-1 flex rounded-full"
              >
                Exercise
              </Link>
            </div>
            <div className="col-span-4 justify-end flex">
                <button onClick={() => setOpenMealModal(!openMealModal)} className="bg-orange-300 rounded-full w-12 h-12 flex justify-center text-3xl pt-1">+</button>
            </div>
          </div>
        </div>

        <div className="w-5/6">
          <h1 className="text-2xl font-bold mb-5">Recent Meals</h1>
          <div className="grid gap-6 mb-5">
            {/* <Link href={""} className="grid grid-cols-6 h-3/5">
            <Image
              alt="Avocado Toast"
              src={Avocado}
              className="rounded-xl max-h-20 object-cover"
            ></Image>
            <ul className="col-span-2 ml-3 grid grid-rows-2 h-full">
              <li className="flex items-end">Avocado Toast</li>
              <li className="text-gray-500 font-light font-light">
                300 Calories &#8226; 10g Protein
              </li>
            </ul>
            <div className="col-span-3 justify-end flex items-center">300g</div>
          </Link> */}
            {DUMMY_DATA.map((meal) => {
              return (
                <LogMealItem
                  key={meal.id}
                  mealImage={meal.mealImage}
                  mealName={meal.mealName}
                  mealCal={meal.mealCal}
                  mealProtein={meal.mealProtein}
                  mealWeight={meal.mealWeight}
                />
              );
            })}
          </div>
        </div>
        {/* Exercise Logging Section */}
        <div className="w-5/6">
          <h1 className="text-2xl font-bold mb-5">Recent Exercise</h1>
          <div className="grid grid-rows-3 gap-6 mb-5">
            <Link href={""} className="grid grid-cols-8 h-3/5">
              <Image
                alt="Person running"
                src={Running}
                className="rounded-xl max-h-20 px-7"
              ></Image>
              <ul className="col-span-2 ml-3 grid grid-rows-2 h-full">
                <li className="flex items-end">Running</li>
                <li className="text-gray-500 font-light font-light">
                  45 Minutes &#8226; 250 Calories
                </li>
              </ul>
              <div className="col-span-5 justify-end flex items-center">
                15m
              </div>
            </Link>
            <Link href={""} className="grid grid-cols-8 h-3/5">
              <Image
                alt="Person using jump rope"
                src={Jumping}
                className="rounded-xl max-h-20 px-7"
              ></Image>
              <ul className="col-span-2 ml-3 grid grid-rows-2 h-full">
                <li className="flex items-end">Jump Rope</li>
                <li className="text-gray-500 font-light">
                  15 Minutes &#8226; 100 Calories
                </li>
              </ul>
              <div className="col-span-5 justify-end flex items-center">
                40m
              </div>
            </Link>
            <Link href={""} className="grid grid-cols-8 h-3/5">
              <Image
                alt="Person swimming"
                src={Swimming}
                className="rounded-xl  max-h-20 px-7"
              ></Image>
              <ul className="col-span-2 ml-3 grid grid-rows-2 h-full">
                <li className="flex items-end">Swimming</li>
                <li className="text-gray-500 font-light">
                  35 Minutes &#8226; 275 Calories
                </li>
              </ul>
              <div className="col-span-5 justify-end flex items-center">
                30m
              </div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
