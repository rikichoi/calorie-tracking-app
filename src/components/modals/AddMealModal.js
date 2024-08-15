"use client";
import React from "react";
import { useRef, useEffect, useState } from "react";
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
import FoodListModal from "./FoodListModal";
import { useContext } from "react";
import { authContext } from "@/lib/store/auth-context";
import { toast } from "react-toastify";

export default function AddMealModal({ show, onClose, selectedDate }) {
  const { user, loading, logout } = useContext(authContext);

  const proteinRef = useRef();
  const carbRef = useRef();
  const fatRef = useRef();
  const calorieRef = useRef();
  const mealNameRef = useRef();
  const weightRef = useRef();
  const mealImageRef = useRef();
  const [foodList, setFoodList] = useState([]);
  const [manualLog, setManualLog] = useState(false);
  const [logText, setLogText] = useState("Manual Entry");
  const [search, setSearch] = useState("");
  const [errors, setErrors] = useState({});

  const addMealHandler = async () => {
    const newMeal = {
      uid: user.uid,
      calorie: calorieRef.current.value,
      protein: proteinRef.current.value,
      fat: fatRef.current.value,
      carbohydrate: carbRef.current.value,
      mealName: mealNameRef.current.value,
      weight: weightRef.current.value,
      createdAt: selectedDate,
    };
    const collectionRef = collection(db, "mealLog");
    if (mealNameRef.current.value != "") {
      try {
        const docSnap = await addDoc(collectionRef, newMeal);
        toast.success("Meal logged successfully!", {
          position: "top-left"
        });

        calorieRef.current.value = "";
        proteinRef.current.value = "";
        fatRef.current.value = "";
        carbRef.current.value = "";
        mealNameRef.current.value = "";
        weightRef.current.value = "";
        setErrors({});
      } catch (error) {
        console.log(error.message);
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    const getFoodData = async () => {
      const collectionRef = collection(db, "food");
      const docsSnap = await getDocs(collectionRef);

      const data = docsSnap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
          foodCal: doc.data().foodCal,
          foodCarb: doc.data().foodCarb,
          foodFat: doc.data().foodFat,
          foodImage: doc.data().foodImage,
          foodName: doc.data().foodName,
          foodProtein: doc.data().foodProtein,
          foodWeight: doc.data().foodWeight,
        };
      });
      setFoodList(data);
    };
    getFoodData();
  }, []);

  function closeModal() {
    if (manualLog == true) {
      setManualLog(false);
      setLogText("Manual Entry");
      calorieRef.current.value = "";
      proteinRef.current.value = "";
      fatRef.current.value = "";
      carbRef.current.value = "";
      mealNameRef.current.value = "";
      weightRef.current.value = "";
    }
  }

  function switchLogText() {
    if (logText == "Manual Entry") {
      setLogText("View Food List");
    } else {
      setLogText("Manual Entry");
    }
  }

  const validate = () => {
    let errors = {};
    if (!mealNameRef.current.value) {
      errors.name = "Please enter a meal name";
    }
    if (!calorieRef.current.value || isNaN(calorieRef.current.value)) {
      errors.calorie = "Please enter calories in numbers";
    }
    if (!proteinRef.current.value || isNaN(proteinRef.current.value)) {
      errors.protein = "Please enter protein in numbers";
    }
    if (!carbRef.current.value || isNaN(carbRef.current.value)) {
      errors.carb = "Please enter carbs in numbers";
    }
    if (!fatRef.current.value || isNaN(fatRef.current.value)) {
      errors.fat = "Please enter fat in numbers";
    }
    if (!weightRef.current.value || isNaN(weightRef.current.value)) {
      errors.weight = "Please enter weight in numbers";
    }
    return errors;
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    let errors = validate();
    if (Object.keys(errors).length > 0) return setErrors(errors);
    addMealHandler();
  };

  return (
    <div className="font-poppins">
      <div className="w-full flex flex-row justify-end p-4">
        <button
          onClick={() => (onClose(!show), closeModal())}
          className="hover:shadow-gray-900 transition-all duration-100 hover:shadow-inner active:scale-110 w-10 h-10 rounded-full bg-red-700 border-black border-2 text-white font-bold"
        >
          X
        </button>
      </div>
      <div className=" flex flex-col items-center">
        <button
          onClick={() => (setManualLog(!manualLog), switchLogText())}
          className="hover:shadow-gray-900 transition-all duration-100 hover:shadow-inner active:scale-110 w-full text-white bg-[#f54748] max-h-36 max-w-xl font-bold py-3 border-2 rounded-full border-black mb-3 before:content-"
        >
          {logText}
        </button>
      </div>
      {manualLog ? (
        <form onSubmit={onSubmitHandler} className="px-3 flex flex-col gap-4">
          <div className="flex flex-col">
            <label>Name</label>
            <input ref={mealNameRef} placeholder="Enter Name" />
            {errors.name ? <p className="text-red-600">{errors.name}</p> : ""}
          </div>
          <div className="flex flex-col">
            <label>Calories</label>
            <input
              ref={calorieRef}

              min={0.0}
              placeholder="Enter Calories"
            />
            {errors.calorie ? (
              <p className="text-red-600">{errors.calorie}</p>
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-col">
            <label>Protein</label>
            <input
              ref={proteinRef}
      
              min={0.0}
              placeholder="Enter Protein"
            />
            {errors.protein ? (
              <p className="text-red-600">{errors.protein}</p>
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-col">
            <label>Carbohydrates</label>
            <input
              ref={carbRef}
             
              min={0.0}
              placeholder="Enter Carbohydrates"
            />
            {errors.carb ? <p className="text-red-600">{errors.carb}</p> : ""}
          </div>
          <div className="flex flex-col">
            <label>Fat</label>
            <input
              ref={fatRef}
         
              min={0.0}
              placeholder="Enter Fat"
            />
            {errors.fat ? <p className="text-red-600">{errors.fat}</p> : ""}
          </div>

          <div className="flex flex-col">
            <label>Weight</label>
            <input
              ref={weightRef}
         
              min={0.0}
              placeholder="Enter Weight"
            />
            {errors.weight ? (
              <p className="text-red-600">{errors.weight}</p>
            ) : (
              ""
            )}
          </div>
          <button
            type="submit"
            className="rounded-xl w-24 h-11 m-7 text-white font-semibold border-2 border-black bg-green-600 hover:shadow-gray-900 transition-all duration-100 hover:shadow-inner active:scale-110"
          >
            Log
          </button>
        </form>
      ) : (
        <div className="grid gap-6 mb-5">
          <input
            className="mx-4"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search all foods..."
          ></input>
          {foodList
            .filter((food) => food.foodName.toLowerCase().includes(search))
            .map((food) => {
              return (
                <FoodListModal
                  foodId={food.id}
                  key={food.id}
                  foodImage={food.foodImage}
                  foodName={food.foodName}
                  foodFat={food.foodFat}
                  foodProtein={food.foodProtein}
                  foodCarb={food.foodCarb}
                  foodCal={food.foodCal}
                  foodWeight={food.foodWeight}
                  selectedDate={selectedDate}
                />
              );
            })}
        </div>
      )}
    </div>
  );
}
