"use client";
import Link from "next/link";
import React from "react";
import { numberFormatter } from "@/lib/utils";
import LogMealItem from "@/components/LogMealItem";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useState, useRef, useEffect } from "react";
import Modal from "@/components/Modal";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { storage } from "@/lib/utils";
import LogExerciseItem from "@/components/LogExerciseItem";
import AddMealModal from "@/components/modals/AddMealModal";
import AddExerciseModal from "@/components/modals/AddExerciseModal";
import EditMealModal from "@/components/modals/EditMealModal";
import EditExerciseModal from "@/components/modals/EditExerciseModal";

ChartJS.register(ArcElement, Tooltip);

export default function Dashboard() {
  const [mealLog, setMealLog] = useState([]);
  const [exerciseLog, setExerciseLog] = useState([]);
  const [modeModal, setModeModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState([]);
  const [selectedExercise, setselectedExercise] = useState([]);
  const [maintenanceCalories, setMaintenanceCalories] = useState([]);
  const [consumedCalories, setConsumedCalories] = useState(0);
  const [remainingCalories, setremainingCalories] = useState(0);
  const [mealIdList, setMealIdList] = useState([]);

  function getConsumedCalories(mealLog) {
    let sum = 0;
    let remaining = 2362;
    for (var i = 0, len = mealLog.length; i < len; i++) {
      sum += Number(mealLog[i].calorie);
      remaining-=Number(mealLog[i].calorie);
    }
    if (sum == consumedCalories) {
      return;
    } {
      setremainingCalories(remaining);
      setConsumedCalories(sum);
    }
  };


  const deleteMealHandler = async (mealLogId) => {
    const docRef = doc(db, "mealLog", mealLogId);
    try {
      await deleteDoc(docRef);
      setMealLog((prevState) => {
        return prevState.filter((i) => i.id !== mealLogId);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteExerciseHandler = async (exerciseLogId) => {
    const docRef = doc(db, "exerciseLog", exerciseLogId);
    try {
      await deleteDoc(docRef);
      setExerciseLog((prevState) => {
        return prevState.filter((i) => i.id !== exerciseLogId);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  function deleteAllMealHandler(mealLog) {
    for (var i = 0, len = mealLog.length; i < len; i++) {
      deleteMealHandler(mealLog[i].id);
    }
  }

  function deleteAllExerciseHandler(exerciseLog) {
    for (var i = 0, len = exerciseLog.length; i < len; i++) {
      deleteExerciseHandler(exerciseLog[i].id);
    }
  }

  useEffect(() => {
    const getMealLogData = async () => {
      const collectionRef = collection(db, "mealLog");
      const docsSnap = await getDocs(collectionRef);

      const data = docsSnap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
          mealImg: doc.data().mealImage,
          mealCal: doc.data().calorie,
          mealProtein: doc.data().protein,
          mealWeight: doc.data().weight,
          mealName: doc.data().mealName,
          mealFat: doc.data().fat,
          mealCarbs: doc.data().carbohydrate,
        };
      });
      setMealLog(data);
    };
    getMealLogData();
    getConsumedCalories(mealLog);
  }, [openModal, getConsumedCalories, mealLog]);

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
      });
      setExerciseLog(data);
    };
    getExerciseLogData();
  }, [openModal]);

  //   function findConsumedCal(data){
  // data.map((cal)=>{
  //   console.log(cal[0])
  // })
  //   }

  const DUMMY_USER = [
    {
      maintenanceCal: 2000,
      consumedCal: 1572,
      reminingCal: 428,
    },
  ];

  return (
    <main
      className={`${
        openModal
          ? "fixed overflow-hidden pt-[4.6rem] top-0 left-0 right-0 "
          : ""
      }`}
    >
      {/* Add Meal Modal Section */}
      <Modal show={openModal} onClose={setOpenModal}>
        {modeModal == "addExercise" && (
          <AddExerciseModal show={openModal} onClose={setOpenModal} />
        )}
        {modeModal == "addMeal" && (
          <AddMealModal show={openModal} onClose={setOpenModal} />
        )}
        {modeModal == "editMeal" && (
          <EditMealModal
            sMeal={selectedMeal}
            show={openModal}
            onClose={setOpenModal}
          />
        )}
        {modeModal == "editExercise" && (
          <EditExerciseModal
            sExercise={selectedExercise}
            show={openModal}
            onClose={setOpenModal}
          />
        )}
      </Modal>
      <main className="flex min-h-screen h-[1000px] flex-col items-center pr-24 pl-24 pt-8 ">
        <div className="w-5/6 grid grid-cols-2">
          <div>
            <h1 className="text-2xl font-bold font-Epilogue">
              Good morning, Julia
            </h1>
            <p className="text-gray-500 text-sm pt-2 pb-4 font-light font-Inter">
              Here&apos;s your daily summary
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => deleteAllMealHandler(mealLog)}
              className="bg-red-700 items-center border-black text-white border-2 rounded-full text-sm w-24 h-14 flex justify-center pt-0.5"
            >
              Reset Meals
            </button>
            <button
              onClick={() => deleteAllExerciseHandler(exerciseLog)}
              className="bg-red-500 items-center border-black text-white border-2 rounded-full w-24 h-14 text-sm flex justify-center pt-0.5"
            >
              Reset Exercises
            </button>
          </div>
        </div>
        {/* Left Overview Section */}
        <div className="w-5/6 grid grid-cols-2 gap-4">
          <div className="bg-gray-200 items-center min-h-[200px] rounded-xl pl-3 pr-3 grid grid-cols-3 shadow-xl border-2 border-gray-600">
            <ul className="pl-12 col-span-2">
              <li className="text-sm">You have consumed</li>
              <li className="text-lg pt-3 font-bold">
                <span className="">{consumedCalories}</span> / 2362
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
                        consumedCalories,
                        remainingCalories,
                      ],
                      backgroundColor: ["#FFA500", "#000000"],
                      borderWidth: 5,
                    },
                  ],
                }}
              />
              <div className="absolute">
                <span className="text-center flex text-sm font-bold text-gray-800 ">
                 {remainingCalories}/2362
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
                  setModeModal("addMeal"), setOpenModal(!openModal)
                )}
                className="bg-orange-300 border-black border-2 rounded-full w-12 h-12 flex justify-center text-3xl pt-0.5"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="w-5/6">
          <h1 className="text-2xl font-bold  mb-5">Recent Meals</h1>
          <div className="grid gap-6 mb-5 ">
            {mealLog.map((meal) => {
              return (
                <LogMealItem
                  editMealMode={setModeModal}
                  show={openModal}
                  onClose={setOpenModal}
                  deleteMeal={deleteMealHandler}
                  selectedMeal={[
                    meal.id,
                    meal.mealImage,
                    meal.mealCal,
                    meal.mealProtein,
                    meal.mealWeight,
                    meal.mealName,
                    meal.mealFat,
                    meal.mealCarbs,
                  ]}
                  selectMeal={setSelectedMeal}
                  mealId={meal.id}
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
          <div className="w-full mt-8 mb-5 flex flex-row">
            <h1 className="text-2xl font-bold w-full">Recent Exercise</h1>
            <div className="flex w-full justify-end justify-items-end">
              <button
                onClick={() => (
                  setModeModal("addExercise"), setOpenModal(!openModal)
                )}
                className="bg-orange-300 border-black border-2 rounded-full w-12 h-12 flex justify-center text-3xl pt-0.5"
              >
                +
              </button>
            </div>
          </div>
          <div className="grid gap-6 mb-5 ">
            {exerciseLog.map((exercise) => {
              return (
                <LogExerciseItem
                  editExerciseMode={setModeModal}
                  show={openModal}
                  onClose={setOpenModal}
                  selectedExercise={[
                    exercise.id,
                    exercise.exerciseName,
                    exercise.exerciseDuration,
                  ]}
                  selectExercise={setselectedExercise}
                  deleteExercise={deleteExerciseHandler}
                  exerciseId={exercise.id}
                  key={exercise.id}
                  exerciseName={exercise.exerciseName}
                  exerciseDuration={exercise.exerciseDuration}
                />
              );
            })}
          </div>
        </div>
      </main>
    </main>
  );
}
