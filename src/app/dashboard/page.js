"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut, Pie } from "react-chartjs-2";
import { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import { db } from "../../lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  where,
  query,
} from "firebase/firestore";
import LogExerciseItem from "@/components/LogExerciseItem";
import AddMealModal from "@/components/modals/AddMealModal";
import AddExerciseModal from "@/components/modals/AddExerciseModal";
import LogMealItem from "../../components/LogMealItem";
import EditMealModal from "@/components/modals/EditMealModal";
import EditExerciseModal from "@/components/modals/EditExerciseModal";
import LinearProgress from "@mui/material/LinearProgress";
import { useContext } from "react";
import { authContext } from "@/lib/store/auth-context";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { UserContext } from "@/lib/store/user-context";
import UserSettingsModal from "@/components/modals/UserSettingsModal";
import { IoSettings } from "react-icons/io5";
import Analytics from "@/components/HealthMetrics";
import Discover from "@/components/Discover";
import { MealContext } from "@/lib/store/meals-context";
import { redirect } from "next/navigation";
import Assistant from "@/components/Assistant";

ChartJS.register(ArcElement, Tooltip);

export default function Dashboard() {
  const { mealsData } = useContext(MealContext);
  const { userData } = useContext(UserContext);
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
  const [remainingCalories, setremainingCalories] = useState(0.1);
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
  const [tabMode, setTabMode] = useState("Dashboard");
  const [nutritionChart, setNutritionChart] = useState("Doughnut");
  const chartType = [
    {
      label: "Doughnut",
    },
    { label: "Pie" },
  ];

  useEffect(() => {
    if (
      !userData ||
      (userData == "undefined" && !userData.userMaintenanceCalories)
    ) {
      setOpenModal(true);
      return;
    }
    getConsumedAndRemainingCalories(mealLog);
    getNutritionValues(mealLog);
    setremainingCalories(userData.userMaintenanceCalories - consumedCalories);
    setMaintenanceCalories(
      (consumedCalories / userData.maintenanceCalories) * 100
    );
  }, [consumedCalories, mealLog, userData]);

  function getConsumedAndRemainingCalories(mealLog) {
    let filteredList = mealLog.filter((meal) =>
      new Date(meal.createdAt.toDate())
        .toISOString()
        .split("T")[0]
        .includes(new Date(startDate).toISOString().split("T")[0])
    );
    let sum = 0;
    let remaining =
      userData &&
      userData.userMaintenanceCalories &&
      userData.userMaintenanceCalories;
    for (var i = 0, len = filteredList.length; i < len; i++) {
      sum += Number(filteredList[i].calorie);
      remaining -= Number(filteredList[i].calorie);
    }
    {
      if (userData && userData.userMaintenanceCalories) {
        setMaintenanceCalories((sum / userData.userMaintenanceCalories) * 100);
        setremainingCalories(userData.userMaintenanceCalories - sum);
        setConsumedCalories(sum);
      }
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
    if (userData && userData.userMaintenanceCalories) {
      setProteinCalories(protein);
      setCarbCalories(carb);
      setFatCalories(fat);
      setProteinProgress(
        (protein / ((userData.userMaintenanceCalories * 0.35) / 4)) * 100
      );
      setCarbProgress(
        (carb / ((userData.userMaintenanceCalories * 0.35) / 4)) * 100
      );
      setFatProgress(
        (fat / ((userData.userMaintenanceCalories * 0.35) / 9)) * 100
      );
    }
  }

  useEffect(() => {
    if (!userData) {
      setOpenModal(true);
      return;
    }
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
  }, [
    consumedCalories,
    remainingCalories,
    maintenanceCalories,
    userData,
    proteinCalories,
    carbCalories,
    fatCalories,
    proteinProgress,
    carbProgress,
    fatProgress,
  ]);

  const deleteMealHandler = async (mealLogId) => {
    const docRef = doc(db, "mealLog", mealLogId);
    try {
      await deleteDoc(docRef);
      toast.success("Meal removed successfully!", {
        position: "top-left",
      });
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
      toast.success("Exercise removed successfully!", {
        position: "top-left",
      });
      setExerciseLog((prevState) => {
        return prevState.filter((i) => i.id !== exerciseLogId);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  // function deleteAllMealExerciseHandler(mealLog, exerciseLog) {
  //   for (var i = 0, len = mealLog.length; i < len; i++) {
  //     deleteMealHandler(mealLog[i].id);
  //   }
  //   for (var i = 0, len = exerciseLog.length; i < len; i++) {
  //     deleteExerciseHandler(exerciseLog[i].id);
  //   }
  // }

  function deleteAllSelectedDateMealHandler(mealLog) {
    for (var i = 0, len = mealLog.length; i < len; i++) {
      if (
        mealLog[i].createdAt.toDate().toDateString() == startDate.toDateString()
      ) {
        deleteMealHandler(mealLog[i].id);
      }
    }
  }

  function deleteAllSelectedDateExerciseHandler(exerciseLog) {
    for (var i = 0, len = exerciseLog.length; i < len; i++) {
      if (
        exerciseLog[i].createdAt.toDate().toDateString() ==
        startDate.toDateString()
      ) {
        deleteExerciseHandler(exerciseLog[i].id);
      }
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
  }, [user, openModal, userData]);

  useEffect(() => {
    getConsumedAndRemainingCalories(mealLog);
    getNutritionValues(mealLog);
  }, [userData, mealLog, startDate]);

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

  if (!user) {
    redirect("/");
  }

  return (
    <main
      className={`${
        openModal
          ? "fixed overflow-hidden pt-[6.1rem] top-0 left-0 right-0 "
          : ""
      }`}
    >
      <Modal show={openModal} onClose={setOpenModal}>
        {userData ? (
          ""
        ) : (
          <UserSettingsModal show={openModal} onClose={setOpenModal} />
        )}
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
          <UserSettingsModal
            show={openModal}
            onClose={setOpenModal}
            selectedDate={startDate}
          />
        )}
      </Modal>
      <div className="flex font-poppins min-h-screen h-[1000px] flex-col items-center md:px-2 px-24 pt-8 ">
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
            <h2 className="flex lg:text-lg md:w-full h-3/4 font-bold items-center">
              Select date:
            </h2>
            <DatePicker
              className="w-28 md:w-full md:mb-5 text-center h-14 hover:shadow-none shadow-gray-900 border-black hover:scale-105 transition-all duration-100  shadow-inner hover:cursor-pointer"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            ></DatePicker>
            <button
              onClick={() => (
                setModeModal("bmiCalculator"), setOpenModal(!openModal)
              )}
              className="bg-orange-600 md:w-full md:mb-4 items-center border-black text-white border-2 rounded-full mr-3 hover:shadow-gray-900 transition-all duration-100 hover:shadow-inner active:scale-110  px-2 h-14 flex justify-center pt-0.5"
            >
              <IoSettings className="text-3xl mr-2 text-center" />
              <span className="text-center">Settings</span>
            </button>
          </div>
        </div>

        <div className="border-b border-gray-200 dark:border-gray-700 mb-3">
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
            <li className="me-2">
              <button
                onClick={() => setTabMode("Dashboard")}
                className={`${
                  tabMode == "Dashboard"
                    ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500 border-b-2 "
                    : " border-black "
                }inline-flex hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 items-center justify-center p-4 rounded-t-lg active group`}
                aria-current="page"
              >
                <svg
                  className={`${
                    tabMode == "Dashboard"
                      ? "text-blue-600 dark:text-blue-500 "
                      : " "
                  }w-4 h-4 me-2  group-hover:text-gray-500  dark:group-hover:text-gray-300`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                </svg>
                <span className="md:hidden">Dashboard</span>
              </button>
            </li>
            <li className="me-2">
              <button
                onClick={() => setTabMode("Analytics")}
                className={`${
                  tabMode == "Analytics"
                    ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500 border-b-2 "
                    : " border-black "
                }inline-flex hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 items-center justify-center p-4 rounded-t-lg active group`}
                aria-current="page"
              >
                <svg
                  className={`${
                    tabMode == "Analytics"
                      ? "text-blue-600 dark:text-blue-500 "
                      : " "
                  }w-4 h-4 me-2 group-hover:text-gray-500  dark:group-hover:text-gray-300`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5 11.424V1a1 1 0 1 0-2 0v10.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.228 3.228 0 0 0 0-6.152ZM19.25 14.5A3.243 3.243 0 0 0 17 11.424V1a1 1 0 0 0-2 0v10.424a3.227 3.227 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.243 3.243 0 0 0 2.25-3.076Zm-6-9A3.243 3.243 0 0 0 11 2.424V1a1 1 0 0 0-2 0v1.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0V8.576A3.243 3.243 0 0 0 13.25 5.5Z" />
                </svg>
                <span className="md:hidden">Analytics</span>
              </button>
            </li>
            <li className="me-2">
              <button
                onClick={() => setTabMode("Discover")}
                className={`${
                  tabMode == "Discover"
                    ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500 border-b-2 "
                    : " border-black "
                }inline-flex hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 items-center justify-center p-4 rounded-t-lg active group`}
                aria-current="page"
              >
                <svg
                  className={`${
                    tabMode == "Discover"
                      ? "text-blue-600 dark:text-blue-500 "
                      : " "
                  }w-4 h-4 me-2 group-hover:text-gray-500  dark:group-hover:text-gray-300`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                </svg>
                <span className="md:hidden">Discover</span>
              </button>
            </li>
            <li className="me-2">
              <button
                onClick={() => setTabMode("Assistant")}
                className={`${
                  tabMode == "Assistant"
                    ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500 border-b-2 "
                    : " border-black "
                }inline-flex hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 items-center justify-center p-4 rounded-t-lg active group`}
                aria-current="page"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${
                    tabMode == "Assistant"
                      ? "text-blue-600 dark:text-blue-500 "
                      : " "
                  }w-4 h-4 me-2 group-hover:text-gray-500  dark:group-hover:text-gray-300`}
                  viewBox="0 0 21 21"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M12 6V2H8" />
                  <path d="m8 18-4 4V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z" />
                  <path d="M2 12h2" />
                  <path d="M9 11v2" />
                  <path d="M15 11v2" />
                  <path d="M20 12h2" />
                </svg>
                <span className="md:hidden">Assistant</span>
              </button>
            </li>
          </ul>
        </div>
        {tabMode == "Dashboard" ? (
          <div className="w-full flex flex-col items-center">
            <div className="w-5/6 md:w-full md:grid-cols-1 grid grid-cols-2 gap-4">
              <div className="bg-gray-200 items-center min-h-[250px] rounded-xl md:text-sm md:pl-10 pl-3 pr-3 grid grid-cols-3 shadow-xl border-2 border-gray-600">
                <ul className="pl-12 md:pl-0 md:col-span-1 col-span-2">
                  <li className="text-lg pb-5 font-bold">Daily Overview</li>
                  <li className="text-sm">You have consumed</li>
                  <li className="text-lg pt-3 font-bold">
                    <span className="">{consumedCalories}</span> /{" "}
                    {userData && userData.userMaintenanceCalories
                      ? userData.userMaintenanceCalories.toFixed(1)
                      : ""}
                  </li>
                  <li className="font-bold">Calories</li>
                  <li
                    className={`${
                      remainingCalories < 0 ? "text-red-600 " : " "
                    }mt-5 text-center flex font-bold text-gray-800 `}
                  >
                    {remainingCalories ? remainingCalories.toFixed(1) : ""} cal
                    remaining
                  </li>
                </ul>

                <div className="items-center flex-col md:col-span-2 justify-center flex min-h-full">
                  <ul className="mt-5 gap-3 mb-2 bg-black p-2 text-sm font-medium text-center text-gray-500 rounded-lg shadow sm:flex ">
                    {chartType.map((type) => (
                      <li key={type.label} className="w-full focus-within:z-10">
                        <button
                          onClick={() => setNutritionChart(type.label)}
                          value={type.label}
                          className={
                            nutritionChart == type.label
                              ? "inline-block w-full p-2  text-white bg-gray-700 border-gray-200 dark:border-gray-700 rounded-lg  "
                              : "inline-block w-full p-2 bg-white border-gray-200 text-gray-900 rounded-lg hover:text-gray-700 hover:bg-gray-50"
                          }
                        >
                          {type.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                  {nutritionChart == "Doughnut" ? (
                    <Doughnut
                      className="p-2 max-h-[400px]"
                      options={{
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                      }}
                      data={{
                        labels: [`Consumed Calories`, `Remaining Calories`],
                        datasets: [
                          {
                            label: "Calories",
                            data: [
                              consumedCalories,
                              remainingCalories < 0 ? 0 : remainingCalories,
                            ],
                            backgroundColor: ["#FFA500", "#000000"],
                            borderWidth: 5,
                          },
                        ],
                      }}
                    />
                  ) : (
                    <Pie
                      className="p-2 max-h-[400px]"
                      options={{
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                      }}
                      data={{
                        labels: ["Protein", "Fats", "Carbs"],
                        datasets: [
                          {
                            label: "Grams",
                            data: [
                              proteinCalories ? proteinCalories : 1,
                              fatCalories ? fatCalories : 1,
                              carbCalories ? carbCalories : 1,
                            ],
                            backgroundColor: ["#388e3c", "#f57c00", "#0288d1"],
                            borderColor: "black",
                            borderWidth: 2,
                          },
                        ],
                      }}
                    />
                  )}
                </div>
              </div>
              {/* Right Overview Section */}
              <div className="md:py-5 bg-gray-200 min-h-full rounded-xl px-5 flex items-center shadow-xl border-2 border-gray-600">
                <ul className="space-y-3 w-full">
                  <span className="font-bold">Nutrition Intake Breakdown</span>
                  <li className="text-sm">
                    Protein ({parseInt(proteinProgress)}%) |{" "}
                    {proteinCalories.toFixed(1)}g /{" "}
                    {userData &&
                      userData.userMaintenanceCalories &&
                      ((userData.userMaintenanceCalories * 0.35) / 4).toFixed(
                        1
                      )}
                    g
                  </li>
                  <LinearProgress
                    variant="determinate"
                    color="success"
                    value={barproteinProgress}
                    className="w-full min-h-3 rounded-xl transition-all"
                  />
                  <li className="text-sm">
                    Fats ({parseInt(fatProgress)}%) | {fatCalories.toFixed(1)}g
                    /{" "}
                    {userData &&
                      userData.userMaintenanceCalories &&
                      ((userData.userMaintenanceCalories * 0.2) / 9).toFixed(1)}
                    g
                  </li>{" "}
                  <LinearProgress
                    variant="determinate"
                    color="warning"
                    value={barfatProgress}
                    className="w-full min-h-3 rounded-xl transition-all"
                  />
                  <li className="text-sm">
                    Carbohydrates ({parseInt(carbProgress)}%) |{" "}
                    {carbCalories.toFixed(1)}g /{" "}
                    {userData &&
                      userData.userMaintenanceCalories &&
                      ((userData.userMaintenanceCalories * 0.45) / 4).toFixed(
                        1
                      )}
                    g
                  </li>{" "}
                  <LinearProgress
                    variant="determinate"
                    color="info"
                    value={barcarbProgress}
                    className="w-full min-h-3 rounded-xl transition-all"
                  />
                </ul>
              </div>
            </div>
            {/* Calorie Goal Progress Bar */}
            <div className="w-full mt-10 px-24 md:px-0">
              {/* this might have to turn into a list so we can allow for mapping data */}
              <p>Maintenance Calorie Goal</p>
              <LinearProgress
                variant="determinate"
                color="primary"
                value={barmaintenanceCalories}
                className="w-full min-h-3 rounded-xl transition-all"
              />
              <p>
                {consumedCalories}/
                {userData && userData.userMaintenanceCalories
                  ? userData.userMaintenanceCalories.toFixed(1)
                  : ""}
              </p>
            </div>
            {/* Meal Logging Section */}
            <div className="w-full px-24 md:px-0">
              <div className="w-full mt-8 mb-5 flex flex-row">
                <h1 className="md:text-lg text-2xl font-bold w-full">
                  Recent Meals
                </h1>
                <div className="flex w-full justify-end justify-items-end">
                  <button
                    onClick={() => deleteAllMealHandler(mealLog)}
                    className="bg-yellow-500 items-center hover:shadow-gray-900 transition-all duration-100 hover:shadow-inner active:scale-110 border-black text-white md:text-sm text-base border-2 rounded-full mr-3 flex justify-center p-2"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => deleteAllSelectedDateMealHandler(mealLog)}
                    className="bg-red-700 items-center hover:shadow-gray-900 transition-all duration-100 hover:shadow-inner active:scale-110 border-black text-white md:text-sm text-base border-2 rounded-full mr-3 flex justify-center p-2"
                  >
                    Clear
                  </button>
                  <button
                    onClick={() => (
                      setModeModal("addMeal"), setOpenModal(!openModal)
                    )}
                    className="bg-green-700 items-center border-black text-white border-2 hover:shadow-gray-900 transition-all duration-100 hover:shadow-inner text-base md:text-sm active:scale-110 rounded-full mr-3 flex justify-center p-2"
                  >
                    Add
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
            <div className="w-full px-24 md:px-0">
              <div className="w-full mt-8 mb-5 flex flex-row">
                <h1 className="md:text-lg text-2xl font-bold w-full">
                  Recent Exercise
                </h1>
                <div className="flex w-full justify-end justify-items-end">
                  <button
                    onClick={() =>
                      deleteAllSelectedDateExerciseHandler(exerciseLog)
                    }
                    className="bg-yellow-500 items-center hover:shadow-gray-900 transition-all duration-100 hover:shadow-inner active:scale-110 border-black text-white md:text-sm text-base border-2 rounded-full mr-3 flex justify-center p-2"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() =>
                      deleteAllSelectedDateExerciseHandler(exerciseLog)
                    }
                    className="bg-red-700 items-center hover:shadow-gray-900 transition-all duration-100 hover:shadow-inner active:scale-110 border-black text-white md:text-sm text-base border-2 rounded-full mr-3 flex justify-center p-2"
                  >
                    Clear
                  </button>
                  <button
                    onClick={() => (
                      setModeModal("addExercise"), setOpenModal(!openModal)
                    )}
                    className="bg-green-700 items-center border-black text-white border-2 hover:shadow-gray-900 transition-all duration-100 hover:shadow-inner text-base md:text-sm active:scale-110 rounded-full mr-3 flex justify-center p-2"
                  >
                    Add
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
          </div>
        ) : (
          ""
        )}

        {tabMode == "Analytics" && (
          <div className="w-full flex flex-col items-center">
            <Analytics />
          </div>
        )}

        {tabMode == "Discover" && (
          <div className="w-full flex flex-col items-center">
            <Discover />
          </div>
        )}

        {tabMode == "Assistant" && (
          <div className="w-full flex flex-col items-center">
            <Assistant />
          </div>
        )}
      </div>
    </main>
  );
}
