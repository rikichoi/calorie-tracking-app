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
  query,
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BmiCalculatorModal from "@/components/modals/BmiCalculatorModal";
import { MdOutlineCalculate } from "react-icons/md";
import { FaCircleArrowRight } from "react-icons/fa6";
import { toast } from "react-toastify";

ChartJS.register(ArcElement, Tooltip);

export default function Dashboard() {
  const { user, loading, logout } = useContext(authContext);
  const [displayName, setDisplayName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
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
  const [barproteinProgress, setbarProteinProgress] = useState(0);
  const [barcarbProgress, setbarCarbProgress] = useState(0);
  const [barfatProgress, setbarFatProgress] = useState(0);
  const [barmaintenanceCalories, setbarMaintenanceCalories] = useState(0);

  function getConsumedAndRemainingCalories(mealLog) {
    let filteredList = mealLog.filter((meal) =>
      new Date(meal.createdAt.toDate())
        .toISOString()
        .split("T")[0]
        .includes(new Date(startDate).toISOString().split("T")[0])
    );
    let sum = 0;
    let remaining = 2362;
    for (var i = 0, len = filteredList.length; i < len; i++) {
      sum += Number(filteredList[i].calorie);
      remaining -= Number(filteredList[i].calorie);
    }
    if (sum == consumedCalories) {
      return;
    }
    {
      setMaintenanceCalories((sum / 2362) * 100);
      setremainingCalories(remaining);
      setConsumedCalories(sum);
    }
  }

  function getNutritionValues(mealLog) {
    let filteredList = mealLog.filter((meal) =>
      new Date(meal.createdAt.toDate())
        .toISOString()
        .split("T")[0]
        .includes(new Date(startDate).toISOString().split("T")[0])
    );
    let protein = 0;
    let carb = 0;
    let fat = 0;
    for (var i = 0, len = filteredList.length; i < len; i++) {
      protein += Number(filteredList[i].protein);
      carb += Number(filteredList[i].carbohydrate);
      fat += Number(filteredList[i].fat);
    }
    setProteinCalories(protein);
    setCarbCalories(carb);
    setFatCalories(fat);
    setProteinProgress((protein / 136) * 100);
    setCarbProgress((carb / 361) * 100);
    setFatProgress((fat / 73) * 100);
  }

  useEffect(() => {
    const getProteinBar = () => {
      if (proteinProgress >= 100) {
        setbarProteinProgress(100);
      }
      if (proteinProgress < 100) {
        setbarProteinProgress(proteinProgress);
      }
    };
    const getCarbBar = () => {
      if (carbProgress >= 100) {
        setbarCarbProgress(100);
      }
      if (carbProgress < 100) {
        setbarCarbProgress(carbProgress);
      }
    };
    const getFatBar = () => {
      if (fatProgress >= 100) {
        setbarFatProgress(100);
      }
      if (fatProgress < 100) {
        setbarFatProgress(fatProgress);
      }
    };
    const getMaintenanceBar = () => {
      if (maintenanceCalories >= 100) {
        setbarMaintenanceCalories(100);
      }
      if (maintenanceCalories < 100) {
        setbarMaintenanceCalories(maintenanceCalories);
      }
    };
    getProteinBar();
    getMaintenanceBar();
    getCarbBar();
    getFatBar();
    // if(proteinProgress >= 100 & carbProgress <= 100 & fatProgress <=100){
    //   setbarCarbProgress(carbProgress);
    //   setbarFatProgress(fatProgress);
    //   setbarProteinProgress(100);
    // }
    // if(carbProgress >= 100 & proteinProgress <= 100 & fatProgress <=100){
    //   setbarCarbProgress(100);
    //   setbarFatProgress(fatProgress);
    //   setbarProteinProgress(proteinProgress);
    // }
    // if(fatProgress >= 100 & carbProgress <= 100 & proteinProgress <=100){
    //   setbarCarbProgress(carbProgress);
    //   setbarFatProgress(100);
    //   setbarProteinProgress(proteinProgress);
    // }
    // if(fatProgress >= 100 & carbProgress >= 100 & proteinProgress >=100){
    //   setbarCarbProgress(100);
    //   setbarFatProgress(100);
    //   setbarProteinProgress(100);
    // }
    // if(fatProgress <= 100 & carbProgress <= 100 & proteinProgress <=100){
    //   setbarCarbProgress(carbProgress);
    //   setbarFatProgress(fatProgress);
    //   setbarProteinProgress(proteinProgress);
    // }
  }, [
    carbCalories,
    fatCalories,
    proteinCalories,
    maintenanceCalories,
    startDate,
  ]);

  const deleteMealHandler = async (mealLogId) => {
    const docRef = doc(db, "mealLog", mealLogId);
    try {
      await deleteDoc(docRef);
      toast.success("Meal removed successfully!");
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
      toast.success("Exercise removed successfully!");
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
    if (!user) return;
    const getUserDisplayName = () => {
      if (user.displayName) {
        setDisplayName(user.displayName);
      } else {
        setDisplayName("Demo Account");
      }
    };
    const getMealLogData = async () => {
      const collectionRef = collection(db, "mealLog");
      const q = query(collectionRef, where("uid", "==", user.uid));

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
    getUserDisplayName();
    getMealLogData();
  }, [
    user,
    openModal,
  ]);

  useEffect(() => {
    getConsumedAndRemainingCalories(mealLog);
    getNutritionValues(mealLog);
  }, [mealLog])
  

  useEffect(() => {
    if (!user) return;
    const getExerciseLogData = async () => {
      const collectionRef = collection(db, "exerciseLog");
      const q = query(collectionRef, where("uid", "==", user.uid));

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
          ? "fixed overflow-hidden pt-[6.1rem] top-0 left-0 right-0 "
          : ""
      }`}
    >
      {/* Add Meal Modal Section */}
      <Modal show={openModal} onClose={setOpenModal}>
        {modeModal == "addExercise" && (
          <AddExerciseModal
            show={openModal}
            onClose={setOpenModal}
            selectedDate={startDate}
          />
        )}
        {modeModal == "addMeal" && (
          <AddMealModal
            show={openModal}
            onClose={setOpenModal}
            selectedDate={startDate}
          />
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
        {modeModal == "bmiCalculator" && (
          <BmiCalculatorModal show={openModal} onClose={setOpenModal} />
        )}
      </Modal>
      <main className="flex font-poppins min-h-screen h-[1000px] flex-col items-center md:px-2 px-24 pt-8 ">
        <div className="w-5/6 grid md:grid-cols-1 grid-cols-2">
          <div>
            <h1 className="text-2xl font-bold ">Good morning, {displayName}</h1>
            <p className="text-gray-500 text-sm pt-2 pb-4 font-light ">
              Here&apos;s your summary for{" "}
              <span className="font-bold">
                {new Date(startDate).toDateString()}
              </span>
            </p>
          </div>
          <div className="flex md:grid md:grid-cols-1 justify-end gap-2">
            <button
              onClick={() => (
                setModeModal("bmiCalculator"), setOpenModal(!openModal)
              )}
              className="bg-orange-600 md:w-full md:mb-4 items-center border-black text-white border-2 rounded-full mr-3 hover:shadow-gray-900 transition-all duration-100 hover:shadow-inner active:scale-110  w-40 h-14 flex justify-center pt-0.5"
            >
              <MdOutlineCalculate className="text-3xl text-center" />
              <span className="text-center">BMI Calculator</span>
            </button>
            <h2 className="flex text-xl md:w-full h-3/4 font-bold items-center">
              Date Selector{" "}
              <FaCircleArrowRight className="text-4xl ml-2 flex text-green-600 justify-center" />
            </h2>
            <DatePicker
              className="w-28 md:w-full md:mb-5 text-center h-14 hover:shadow-none shadow-gray-900 border-black hover:scale-105 transition-all duration-100  shadow-inner hover:cursor-pointer"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            ></DatePicker>
          </div>
        </div>
        {/* Left Overview Section */}
        <div className="w-5/6 md:w-full md:grid-cols-1 grid grid-cols-2 gap-4">
          <div className="bg-gray-200 items-center min-h-[250px] rounded-xl md:text-sm md:pl-10 pl-3 pr-3 grid grid-cols-3 shadow-xl border-2 border-gray-600">
            <ul className="pl-12 md:pl-0 md:col-span-1 col-span-2">
              <li className="text-sm">You have consumed</li>
              <li className="text-lg pt-3 font-bold">
                <span className="">{consumedCalories}</span> / 2362
              </li>
              <li className="font-bold">Calories</li>
              <li className="mt-5 text-center flex font-bold text-gray-800 ">
                {remainingCalories} remaining
              </li>
            </ul>

            <div className="items-center md:col-span-2 justify-center flex min-h-full">
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
            </div>
          </div>
          {/* Right Overview Section */}
          <div className="md:py-5 bg-gray-200 min-h-full rounded-xl px-5 flex items-center shadow-xl border-2 border-gray-600">
            <ul className="space-y-3 w-full">
              <span className="font-bold">Nutrition Intake Breakdown</span>
              <li className="text-sm">
                Protein ({parseInt(proteinProgress)}%) |{" "}
                {proteinCalories.toFixed(1)}g / 136g
              </li>
              <LinearProgress
                variant="determinate"
                color="success"
                value={barproteinProgress}
                className="w-full min-h-3 rounded-xl transition-all"
              />
              <li className="text-sm">
                Fats ({parseInt(fatProgress)}%) | {fatCalories.toFixed(1)}g /
                73g
              </li>{" "}
              <LinearProgress
                variant="determinate"
                color="warning"
                value={barfatProgress}
                className="w-full min-h-3 rounded-xl transition-all"
              />
              <li className="text-sm">
                Carbohydrates ({parseInt(carbProgress)}%) |{" "}
                {carbCalories.toFixed(1)}g / 361g
              </li>{" "}
              <LinearProgress
                variant="determinate"
                color="secondary"
                value={barcarbProgress}
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
            value={barmaintenanceCalories}
            className="w-full min-h-3 rounded-xl transition-all"
          />
          <p>{consumedCalories}/2362</p>
        </div>
        {/* Meal Logging Section */}
        <div className="border- w-5/6">
          <div className="w-full mt-8 mb-5 flex flex-row">
            <h1 className="md:text-lg text-2xl font-bold w-full">
              Recent Meals
            </h1>
            <div className="flex w-full justify-end justify-items-end">
              <button
                onClick={() => deleteAllMealHandler(mealLog)}
                className="bg-red-700 items-center hover:shadow-gray-900 transition-all duration-100 hover:shadow-inner active:scale-110 border-black text-white border-2 rounded-full mr-3  w-36 h-12 flex justify-center pt-0.5"
              >
                Reset Meals
              </button>
              <button
                onClick={() => (
                  setModeModal("addMeal"), setOpenModal(!openModal)
                )}
                className="bg-green-700 items-center border-black text-white border-2 hover:shadow-gray-900 transition-all duration-100 hover:shadow-inner active:scale-110 rounded-full mr-3  w-36 h-12 flex justify-center pt-0.5"
              >
                + Add Meal
              </button>
            </div>
          </div>
          <div className="grid gap-6 mb-5 ">
            {mealLog
              .filter((meal) =>
                new Date(meal.createdAt.toDate())
                  .toISOString()
                  .split("T")[0]
                  .includes(new Date(startDate).toISOString().split("T")[0])
              )
              .map((meal) => {
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
            <h1 className="md:text-lg text-2xl font-bold w-full">
              Recent Exercise
            </h1>
            <div className="flex w-full justify-end justify-items-end">
              <button
                onClick={() => deleteAllExerciseHandler(exerciseLog)}
                className="bg-red-700 items-center hover:shadow-gray-900 transition-all duration-100 hover:shadow-inner active:scale-110 border-black text-white border-2 rounded-full w-36 h-12 mr-3  flex justify-center pt-0.5"
              >
                Reset Exercises
              </button>
              <button
                onClick={() => (
                  setModeModal("addExercise"), setOpenModal(!openModal)
                )}
                className="bg-green-700 items-center border-black text-white border-2 rounded-full mr-3 hover:shadow-gray-900 transition-all duration-100 hover:shadow-inner active:scale-110  w-36 h-12 flex justify-center pt-0.5"
              >
                + Add Exercise
              </button>
            </div>
          </div>
          <div className="grid gap-6 mb-5 ">
            {exerciseLog
              .filter((exercise) =>
                new Date(exercise.createdAt.toDate())
                  .toISOString()
                  .split("T")[0]
                  .includes(new Date(startDate).toISOString().split("T")[0])
              )
              .map((exercise) => {
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
