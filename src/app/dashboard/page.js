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
  where,
  query
} from "firebase/firestore";
import { storage } from "@/lib/utils";
import LogExerciseItem from "@/components/LogExerciseItem";
import AddMealModal from "@/components/modals/AddMealModal";
import AddExerciseModal from "@/components/modals/AddExerciseModal";
import EditMealModal from "@/components/modals/EditMealModal";
import EditExerciseModal from "@/components/modals/EditExerciseModal";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { useContext } from "react";
import { authContext } from "@/lib/store/auth-context";
import Home from "../page";

ChartJS.register(ArcElement, Tooltip);

export default function Dashboard() {
  const { user, loading, logout } = useContext(authContext);

  const [mealLog, setMealLog] = useState([]);
  const [exerciseLog, setExerciseLog] = useState([]);
  const [modeModal, setModeModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState([]);
  const [selectedExercise, setselectedExercise] = useState([]);
  const [maintenanceCalories, setMaintenanceCalories] = useState(0);
  const [consumedCalories, setConsumedCalories] = useState(0);
  const [remainingCalories, setremainingCalories] = useState(2362);
  const [proteinCalories, setProteinCalories] = useState(0);
  const [carbCalories, setCarbCalories] = useState(0);
  const [fatCalories, setFatCalories] = useState(0);
  const [proteinProgress, setProteinProgress] = useState(0);
  const [carbProgress, setCarbProgress] = useState(0);
  const [fatProgress, setFatProgress] = useState(0);

  function getConsumedAndRemainingCalories(mealLog) {
    let sum = 0;
    let remaining = 2362;
    for (var i = 0, len = mealLog.length; i < len; i++) {
      sum += Number(mealLog[i].calorie);
      remaining -= Number(mealLog[i].calorie);
    }
    if (sum == consumedCalories) {
      return;
    }
    {
      setMaintenanceCalories((sum / 2362) * 100)
      setremainingCalories(remaining);
      setConsumedCalories(sum);
    }
  }

  function getNutritionValues(mealLog) {
    let protein = 0;
    let carb = 0;
    let fat = 0;
    for (var i = 0, len = mealLog.length; i < len; i++) {
      protein += Number(mealLog[i].protein);
      carb += Number(mealLog[i].carbohydrate);
      fat += Number(mealLog[i].fat);
    }
    setProteinCalories(protein);
    setCarbCalories(carb);
    setFatCalories(fat);
    setProteinProgress((protein / 136) * 100);
    setCarbProgress((carb / 361) * 100);
    setFatProgress((fat / 73) * 100);
  }

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

  function deleteAllMealExerciseHandler(mealLog, exerciseLog) {
    for (var i = 0, len = mealLog.length; i < len; i++) {
      deleteMealHandler(mealLog[i].id);
    }
    for (var i = 0, len = exerciseLog.length; i < len; i++) {
      deleteExerciseHandler(exerciseLog[i].id);
    }
  }

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
    if(!user) return;
    const getMealLogData = async () => {
      const collectionRef = collection(db, "mealLog");
      const q = query(collectionRef, where("uid", '==', user.uid))

      const docsSnap = await getDocs(q);

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
    getConsumedAndRemainingCalories(mealLog);
    getNutritionValues(mealLog);
  }, [user, openModal, getConsumedAndRemainingCalories, getNutritionValues, mealLog]);

  useEffect(() => {
    if(!user) return;
    const getExerciseLogData = async () => {
      const collectionRef = collection(db, "exerciseLog");
      const q = query(collectionRef, where("uid", '==', user.uid))


      const docsSnap = await getDocs(q);

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
  }, [user, openModal]);

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
              Good morning, {user.displayName}
            </h1>
            <p className="text-gray-500 text-sm pt-2 pb-4 font-light font-Inter">
              Here&apos;s your daily summary
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => deleteAllMealExerciseHandler(mealLog, exerciseLog)}
              className="bg-red-700 items-center border-black text-white border-2 rounded-full mr-3  w-36 h-12 flex justify-center pt-0.5"
            >
              Reset All
            </button>
          </div>
        </div>
        {/* Left Overview Section */}
        <div className="w-5/6 grid grid-cols-2 gap-4">
          <div className="bg-gray-200 items-center min-h-[250px] rounded-xl pl-3 pr-3 grid grid-cols-3 shadow-xl border-2 border-gray-600">
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
                      data: [consumedCalories, remainingCalories],
                      backgroundColor: ["#FFA500", "#000000"],
                      borderWidth: 5,
                    },
                  ],
                }}
              />
              <div className="absolute">
                <span className="text-center flex text-sm font-bold text-gray-800 ">
                  {remainingCalories} remaining
                </span>
              </div>
            </div>
          </div>
          {/* Right Overview Section */}
          <div className="bg-gray-200 min-h-full rounded-xl px-5 flex items-center shadow-xl border-2 border-gray-600">
            <ul className="space-y-3 w-full">
              <span className="font-bold">Nutrition Intake Breakdown</span>
              <li className="text-sm">
                Protein ({parseInt(proteinProgress)}%) | {proteinCalories}g /
                136g
              </li>
              <LinearProgress
                variant="determinate"
                color="success"
                value={proteinProgress}
                className="w-full min-h-3 rounded-xl transition-all"
              />
              <li className="text-sm">
                Fats ({parseInt(fatProgress)}%) | {fatCalories}g / 73g
              </li>{" "}
              <LinearProgress
                variant="determinate"
                color="warning"
                value={fatProgress}
                className="w-full min-h-3 rounded-xl transition-all"
              />
              <li className="text-sm">
                Carbohydrates ({parseInt(carbProgress)}%) | {carbCalories}g /
                361g
              </li>{" "}
              <LinearProgress
                variant="determinate"
                color="secondary"
                value={carbProgress}
                className="w-full min-h-3 rounded-xl transition-all"
              />
            </ul>
          </div>
        </div>
        {/* Calorie Goal Progress Bar */}
        <div className="w-5/6 mt-10">
          {/* this might have to turn into a list so we can allow for mapping data */}
          <p>Maintenance Calorie Goal</p>
          <LinearProgress
                variant="determinate"
                color="primary"
                value={parseInt(maintenanceCalories)}
                className="w-full min-h-3 rounded-xl transition-all"
                maxValue={100}
              />
          <p>{consumedCalories}/2362</p>
        </div>
        {/* Meal Logging Section */}
        <div className="w-5/6">
          <div className="w-full mt-8 mb-5 flex flex-row">
            <h1 className="text-2xl font-bold w-full">Recent Meals</h1>
            <div className="flex w-full justify-end justify-items-end">
              <button
                onClick={() => deleteAllMealHandler(mealLog)}
                className="bg-red-700 items-center border-black text-white border-2 rounded-full mr-3  w-36 h-12 flex justify-center pt-0.5"
              >
                Reset Meals
              </button>
              <button
                onClick={() => (
                  setModeModal("addMeal"), setOpenModal(!openModal)
                )}
                className="bg-green-600 border-black border-2 rounded-full w-12 h-12 flex justify-center text-3xl pt-0.5"
              >
                +
              </button>
            </div>
          </div>
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
                onClick={() => deleteAllExerciseHandler(exerciseLog)}
                className="bg-red-700 items-center border-black text-white border-2 rounded-full w-36 h-12 mr-3  flex justify-center pt-0.5"
              >
                Reset Exercises
              </button>
              <button
                onClick={() => (
                  setModeModal("addExercise"), setOpenModal(!openModal)
                )}
                className="bg-green-600 border-black border-2 rounded-full w-12 h-12 flex justify-center text-3xl pt-0.5"
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
