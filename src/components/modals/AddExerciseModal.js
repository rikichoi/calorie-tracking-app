import React, { useState } from "react";
import { useRef, useEffect } from "react";
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
import { toast } from "react-toastify";


export default function AddExerciseModal({ show, onClose, selectedDate}) {
  const { user, loading, logout } = useContext(authContext);
  const [errors, setErrors] = useState({});
  const exerciseNameRef = useRef();
  const exerciseDurationRef = useRef();

  const addExerciseHandler = async () => {

      const newExercise = {
        uid: user.uid,
        exerciseName: exerciseNameRef.current.value,
        exerciseDuration: exerciseDurationRef.current.value,
        createdAt: selectedDate,
      };
      const collectionRef = collection(db, "exerciseLog");
      if (exerciseDurationRef.current.value > 0) {
      try {
        const docSnap = await addDoc(collectionRef, newExercise);
        toast.success("Exercise logged successfully!", {
          position: "top-left"
        })
        exerciseDurationRef.current.value = "";
        setErrors({});
      } catch (error) {
        console.log(error.message);
      }
    } else {
      return;
    }
  };

  function clearModal() {
    exerciseNameRef.current.value = "";
    exerciseDurationRef.current.value = "";
  }

  const validate = () => {
    let errors = {};
    if(!exerciseNameRef.current.value){
      errors.name="Please select an exercise"
    }
    if(!exerciseDurationRef.current.value||isNaN(exerciseDurationRef.current.value)){
      errors.duration="Please enter duration in numbers"
    }
    return errors;
  }

  const submitHandler = (e) => {
    e.preventDefault();
    let errors = validate();
    if(Object.keys(errors).length) return setErrors(errors);
    addExerciseHandler();
  }


  return (
    <form onSubmit={submitHandler} className="px-3 font-poppins">
      <div className="w-full flex flex-row justify-end p-4">
        <button
          type="reset"
          onClick={() => (onClose(!show), clearModal())}
          className="hover:shadow-gray-900 transition-all duration-100 hover:shadow-inner active:scale-110 w-10 h-10 rounded-full bg-red-700 border-black border-2 text-white font-bold"
        >
          X
        </button>
      </div>
      <div className="flex flex-col">
        <label>Exercise Type</label>
        <select
          required
          ref={exerciseNameRef}
          type="string"
          min={0.0}
          placeholder="Enter Exercise"
          className="rounded-md p-1 border-2 bg-white border-gray-400 placeholder-opacity-100"
        >
          <option value="Running">Running</option>
          <option value="Swimming">Swimming</option>
          <option value="Jumping">Jumping</option>
        </select>
        {errors.name ? <p className="text-red-600">{errors.name}</p> : ""}

      </div>
      <div className="pt-5 flex flex-col ">
        <label>Duration (mins)</label>
        <input
          ref={exerciseDurationRef}
          min={0.0}
          placeholder="Enter Duration"
        />
                  {errors.duration ? <p className="text-red-600">{errors.duration}</p> : ""}

      </div>
      <button className="rounded-xl w-24 h-11 m-7 text-white font-semibold border-2 border-black bg-green-600 hover:shadow-gray-900 transition-all duration-100 hover:shadow-inner active:scale-110">
        Log
      </button>
    </form>
  );
}
