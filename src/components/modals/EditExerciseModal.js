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
  updateDoc,
} from "firebase/firestore";
import { Smokum } from "next/font/google";

export default function EditExerciseModal({ sExercise, show, onClose }) {
  const exerciseNameRef = useRef();
  const exerciseDurationRef = useRef();

  const editExerciseHandler = async (exerciseLogId) => {
    const docRef = doc(db, "exerciseLog", exerciseLogId);
    const newExercise = {
      exerciseName: exerciseNameRef.current.value,
      exerciseDuration: exerciseDurationRef.current.value,
    };
    try {
      await updateDoc(docRef, newExercise), {};
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    exerciseNameRef.current.value = sExercise[1];
    exerciseDurationRef.current.value = sExercise[2];
  }, [sExercise]);

  return (
    <div className=" flex flex-col items-center">
      <div className="w-full flex flex-row justify-end p-4">
        <button
          onClick={() => onClose(!show)}
          className="w-10 h-10 rounded-full bg-red-700 border-black border-2 text-white font-bold"
        >
          X
        </button>
      </div>
      <div className="px-3">
        <div className="flex flex-col">
          <label>Exercise Name</label>
          <select
            required
            ref={exerciseNameRef}
            type="string"
            defaultValue={exerciseNameRef}
            min={0.0}
            placeholder="Enter Exercise"
            className="rounded-md p-1 border-2 border-black bg-[#C8CFA0] placeholder-opacity-100"
          >
            <option value="Running">Running</option>
            <option value="Swimming">Swimming</option>
            <option value="Jumping">Jumping</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label>Duration</label>
          <input
            ref={exerciseDurationRef}
            type="number"
            min={0.0}
            defaultValue={exerciseDurationRef}
            placeholder="Enter Duration"
          />
        </div>
      </div>
      <button
        onClick={() => editExerciseHandler(sExercise[0])}
        className="rounded-xl w-24 h-11 m-7 text-white font-semibold border-2 border-black bg-green-600 hover:shadow-gray-900 transition-all duration-100 hover:shadow-inner active:scale-110"
      >
        Update
      </button>
    </div>
  );
}
