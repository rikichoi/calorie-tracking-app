import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
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
import { useContext } from "react";
import { authContext } from "@/lib/store/auth-context";

export default function FoodListModal({
  foodId,
  foodImage,
  foodName,
  foodProtein,
  foodCarb,
  foodFat,
  foodCal,
  foodWeight,
}) {

  const { user, loading, logout } = useContext(authContext);

  const addFoodHandler = async (e) => {

    const newFood = {
      uid: user.uid,
      mealImage: foodImage,
      calorie: foodCal,
      protein: foodProtein,
      fat: foodFat,
      carbohydrate: foodCarb,
      mealName: foodName,
      weight: foodWeight,
    };
    const collectionRef = collection(db, "mealLog");
      try {
        await addDoc(collectionRef, newFood);
      } catch (error) {
        console.log(error.message);
      }
  };

  return (
    <div className="flex flex-col items-center">
      <button onClick={() => addFoodHandler()} className="hover:shadow-gray-900 transition-all duration-100 hover:shadow-inner active:scale-110 grid grid-cols-8 hover:bg-[#C8CFA0]  hover:border-[#C8CFA0] rounded-xl max-w-xl justify-center py-3 px-4">
        <Image
          src={foodImage}
          alt={`${foodName} Image`}
          width={150}
          height={150}
          size="medium"
          style={{
            height: "150px",
            width: "150px",
          }}
          unoptimized
          className="rounded-full  w-3 col-span-2 max-h-20 object-cover"
        />
        <div className="ml-3 col-span-4 flex items-center">{foodName}</div>
        <div className=" col-span-2 justify-end flex items-center">
          {foodCal} Cal
        </div>
      </button>
      <hr className="mt-2 w-11/12"></hr>
      </div>
  );
}
