import React from "react";
import { useRef, useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import FoodListModal from "./FoodListModal";

export default function AddMealModal({ show, onClose }) {
  const proteinRef = useRef();
  const carbRef = useRef();
  const fatRef = useRef();
  const calorieRef = useRef();
  const mealNameRef = useRef();
  const weightRef = useRef();
  const mealImageRef = useRef();
  const [foodList, setFoodList] = useState([]);
  const [manualLog, setManualLog] = useState(false);
  const [logText, setLogText] = useState("Log Manually");
  const [search, setSearch] = useState('');


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
    if (mealNameRef.current.value != "") {
      try {
        const docSnap = await addDoc(collectionRef, newMeal);

        setMealLog((prevState) => {
          return [
            ...prevState,
            {
              id: docSnap.id,
              ...newMeal,
            },
          ];
        }); 
        mealImageRef.current.value = "";
        calorieRef.current.value = "";
        proteinRef.current.value = "";
        fatRef.current.value = "";
        carbRef.current.value = "";
        mealNameRef.current.value = "";
        weightRef.current.value = "";
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

  function switchLogText(){
    if (logText == "Manual Entry"){
      setLogText("View Food List")
    }
    else{
      setLogText("Manual Entry")
    }
  }

  return (
    <div>
      <div className="w-full flex flex-row justify-end p-4">
        <button
          onClick={() => (onClose(!show), closeModal())}
          className="w-10 h-10 rounded-full bg-red-700 border-black border-2 text-white font-bold"
        >
          X
        </button>
      </div>
      <div className=" flex flex-col items-center">
        <button
          onClick={() => (setManualLog(!manualLog), switchLogText())}
          className="w-full bg-[#ff791f] max-h-36 max-w-xl font-bold py-3 border-2 rounded-full border-black mb-3 before:content-"
        >
          {logText}
        </button>
      </div>
      {manualLog ? (
        <form onSubmit={addMealHandler} className="px-3 flex flex-col gap-4">
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
            className="rounded-xl w-24 h-11 m-7 text-white font-semibold border-2 border-black bg-green-600 hover:shadow-gray-900 transition-all duration-100 hover:shadow-inner active:scale-110"
          >
            Log
          </button>
        </form>
      ) : (
        <div className="grid gap-6 mb-5">
            {/* console.log(foodList.filter(food => food.foodName.toLowerCase().includes(search))); */}

          <input className="mx-4" onChange={(e) => setSearch(e.target.value)} placeholder="Search all foods..."></input>
          {foodList.filter((food)=>food.foodName.toLowerCase().includes(search)).map((food) => {
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
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
