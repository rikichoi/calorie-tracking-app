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
} from "firebase/firestore";
import { Smokum } from "next/font/google";


export default function EditMealModal({ sMeal, show, onClose }) {

    const proteinRef = useRef();
    const carbRef = useRef();
    const fatRef = useRef();
    const calorieRef = useRef();
    const mealNameRef = useRef();
    const weightRef = useRef();
    const mealImageRef = useRef();

    useEffect(()=>{
        mealNameRef.current.value = sMeal[5];
        carbRef.current.value = sMeal[7];
        fatRef.current.value = sMeal[6];
        weightRef.current.value = sMeal[4];
        calorieRef.current.value = sMeal[2];
        proteinRef.current.value = sMeal[3];
        },[sMeal])

  return (
    <div className="flex flex-col items-center">
      <div className="w-full flex flex-row justify-end p-4">
        <button
          onClick={() => (onClose(!show))}
          className="w-10 h-10 rounded-full bg-red-700 border-black border-2 text-white font-bold"
        >
          X
        </button>
      </div>
        <Image
          src={sMeal[1]}
          alt={`${sMeal[5]} Image`}
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
        <form className="px-3">
          <div className="flex flex-col">
            <label>Name</label>
            <input
              ref={mealNameRef}
              type="string"
              min={0.0}
              defaultValue={mealNameRef}
              placeholder="Enter Name"

            ></input>
          </div>
          <div className="flex flex-col">
            <label>Calories</label>
            <input
              ref={calorieRef}
              type="number"
              min={0.0}
              defaultValue={calorieRef}
              placeholder="Enter Calories"

            />
          </div>
          <div className="flex flex-col">
            <label>Protein</label>
            <input
              ref={proteinRef}
              type="number"
              min={0.0}
              defaultValue={proteinRef}
              placeholder="Enter Protein"

            />
          </div>
          <div className="flex flex-col">
            <label>Carbohydrates</label>
            <input
              ref={carbRef}
              type="number"
              min={0.0}
              defaultValue={carbRef}
              placeholder="Enter Carbohydrate"

            />
          </div>
          <div className="flex flex-col">
            <label>Fat</label>
            <input
              ref={fatRef}
              type="number"
              min={0.0}
              defaultValue={fatRef}
              placeholder="Enter Fat"

            />
          </div>

          <div className="flex flex-col">
            <label>Weight</label>
            <input
              ref={weightRef}
              type="string"
              min={0.0}
              defaultValue={weightRef}
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
    </div>
  );
}
