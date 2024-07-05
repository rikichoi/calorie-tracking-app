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
import { useState, useRef, useEffect } from "react";
import Modal from "@/components/Modal";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { storage } from "@/lib/utils";
import LogExerciseItem from "@/components/LogExerciseItem";

ChartJS.register(ArcElement, Tooltip);

export default function Dashboard() {
  const [mealLog, setMealLog] = useState([]);
  const [exerciseLog, setExerciseLog] = useState([]);
  const [modeModal, setModeModal] = useState();
  const [openMealModal, setOpenMealModal] = useState(false);
  const proteinRef = useRef();
  const carbRef = useRef();
  const fatRef = useRef();
  const calorieRef = useRef();
  const mealNameRef = useRef();
  const weightRef = useRef();
  const exerciseNameRef = useRef();
  const exerciseDurationRef = useRef();

  const addMealHandler = async (e) => {
    e.preventDefault();

    const newMeal = {
      calorie: calorieRef.current.value,
      protein: proteinRef.current.value,
      fat: fatRef.current.value,
      carbohydrate: carbRef.current.value,
      mealName: mealNameRef.current.value,
      weight: weightRef.current.value,
    };
    const collectionRef = collection(db, "mealLog");
    try {
      const docSnap = await addDoc(collectionRef, newMeal);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getMealLogData = async () => {
      const collectionRef = collection(db, "mealLog");
      const docsSnap = await getDocs(collectionRef);

      const data = docsSnap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
          mealCal: doc.data().calorie,
          mealProtein: doc.data().protein,
          mealWeight: doc.data().weight,
          mealName: doc.data().mealName,
        };
        // <LogMealItem
        // key={meal.id}
        // mealImage={meal.mealImage}
        // mealName={meal.mealName}
        // mealCal={meal.mealCal}
        // mealProtein={meal.mealProtein}
        // mealWeight={meal.mealWeight}
        // />
      });
      setMealLog(data);
    };
    getMealLogData();
  }, []);

  const addExerciseHandler = async (e) => {
    e.preventDefault();

    const newExercise = {
      exerciseName: exerciseNameRef.current.value,
      exerciseDuration: exerciseDurationRef.current.value,
    };
    const collectionRef = collection(db, "exerciseLog");
    try {
      const docSnap = await addDoc(collectionRef, newExercise);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getExerciseLogData = async () => {
      const collectionRef = collection(db, "exerciseLog");
      const docsSnap = await getDocs(collectionRef);

      const data = docsSnap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
          exerciseName: doc.data().exerciseName,
          exerciseDuration: doc.data().exerciseDuration,
        };
        // <LogMealItem
        // key={meal.id}
        // mealImage={meal.mealImage}
        // mealName={meal.mealName}
        // mealCal={meal.mealCal}
        // mealProtein={meal.mealProtein}
        // mealWeight={meal.mealWeight}
        // />
      });
      setExerciseLog(data);
    };
    getExerciseLogData();
  }, []);

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
    <main
      className={`${
        openMealModal
          ? "fixed overflow-hidden pt-[4.6rem] top-0 left-0 right-0 mx-auto"
          : ""
      }`}
    >
      {/* Add Meal Modal Section */}
      <Modal show={openMealModal} onClose={setOpenMealModal}>
        {modeModal ? (
          <form onSubmit={addExerciseHandler} className="px-3">
            <div className="flex flex-col">
              <label>Name</label>
              <input
                ref={exerciseNameRef}
                type="string"
                min={0.0}
                placeholder="Enter Exercise"
              />
            </div>
            <div className="flex flex-col">
              <label>Duration (mins)</label>
              <input
                ref={exerciseDurationRef}
                type="number"
                min={0.0}
                placeholder="Enter Duration"
              />
            </div>
            <button className="rounded-xl w-24 h-11 m-3 text-white font-semibold border-2  bg-green-600 hover:shadow-gray-900 transition-all duration-100 hover:shadow-inner active:scale-110">
              Log
            </button>
          </form>
        ) : (
          <form onSubmit={addMealHandler} className="px-3">
            <div className="flex flex-col">
              <label>Calories</label>
              <input
                ref={calorieRef}
                type="number"
                min={0.0}
                placeholder="Enter Calories"
              />
            </div>
            <div className="flex flex-col">
              <label>Protein</label>
              <input
                ref={proteinRef}
                type="number"
                min={0.0}
                placeholder="Enter Protein"
              />
            </div>
            <div className="flex flex-col">
              <label>Carbohydrates</label>
              <input
                ref={carbRef}
                type="number"
                min={0.0}
                placeholder="Enter Carbohydrates"
              />
            </div>
            <div className="flex flex-col">
              <label>Fat</label>
              <input
                ref={fatRef}
                type="number"
                min={0.0}
                placeholder="Enter Fat"
              />
            </div>
            <div className="flex flex-col">
              <label>Name</label>
              <input
                ref={mealNameRef}
                type="string"
                min={0.0}
                placeholder="Enter Name"
              />
            </div>
            <div className="flex flex-col">
              <label>Weight</label>
              <input
                ref={weightRef}
                type="string"
                min={0.0}
                placeholder="Enter Weight"
              />
            </div>
            <button
              type="submit"
              className="rounded-xl w-24 h-11 m-3 text-white font-semibold border-2  bg-green-600 hover:shadow-gray-900 transition-all duration-100 hover:shadow-inner active:scale-110"
            >
              Log
            </button>
          </form>
        )}
      </Modal>
      <main className="flex min-h-screen h-[1000px] flex-col items-center pr-24 pl-24 pt-8 ">
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
          <div className="bg-gray-200 items-center min-h-[200px] rounded-xl pl-3 pr-3 grid grid-cols-3 shadow-xl border-2 border-gray-600">
            <ul className="pl-12 col-span-2">
              <li className="text-sm">You have consumed</li>
              <li className="text-lg pt-3 font-bold">
                <span className="text-green-500">{numberFormatter(1500)}</span>/
                {numberFormatter(2000)}
              </li>
              <li className="font-bold">Calories</li>
            </ul>

            <div className="items-center justify-center flex min-h-full">
              <Doughnut
                className="p-2 "
                data={{
                  labels: [`Consumed Calories`, `Remaining Calories`],
                  datasets: [
                    {
                      label: "Calories",
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
          <div className="bg-gray-200 min-h-full rounded-xl px-5 flex items-center shadow-xl border-2 border-gray-600">
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
              <button
                onClick={() => (
                  setOpenMealModal(!openMealModal), setModeModal(false)
                )}
                className="bg-orange-300 rounded-full w-12 h-12 flex justify-center text-3xl pt-1"
              >
                +
              </button>
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
            {mealLog.map((meal) => {
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
          <div className="w-full flex flex-row">
            <h1 className="text-2xl font-bold mb-5 w-full">Recent Exercise</h1>
            <div className="flex w-full justify-end justify-items-end">
              <button
                onClick={() => (
                  setOpenMealModal(!openMealModal), setModeModal(true)
                )}
                className="bg-orange-300 rounded-full w-12 h-12 flex justify-center text-3xl pt-1"
              >
                +
              </button>
            </div>
          </div>

          {exerciseLog.map((exercise) => {
            return (
              <LogExerciseItem
                key={exercise.id}
                exerciseName={exercise.exerciseName}
                exerciseDuration={exercise.exerciseDuration}
              />
            );
          })}
        </div>
      </main>
    </main>
  );
}
