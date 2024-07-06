import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Running from "@/images/running-image.png";
import Jumping from "@/images/jumping-image.png";
import Swimming from "@/images/swimming-image.png";
import { FaRegTrashAlt } from "react-icons/fa";

export default function LogExerciseItem({
  selectedExercise,
  selectExercise,
  editExerciseMode,
  show,
  onClose,
  exerciseId,
  deleteExercise,
  exerciseName,
  exerciseDuration,
  exerciseCalorie,
}) {
  var exerciseImg;
  if (exerciseName == "Running") {
    exerciseCalorie = 25 * exerciseDuration;
    exerciseImg = Running;
  }
  if (exerciseName == "Jumping") {
    exerciseCalorie = 3 * exerciseDuration;
    exerciseImg = Jumping;
  }
  if (exerciseName == "Swimming") {
    exerciseCalorie = 2 * exerciseDuration;
    exerciseImg = Swimming;
  }

  return (
    <div className="grid grid-cols-12">
      <button
        onClick={() => (
          selectExercise(selectedExercise),
          onClose(!show),
          editExerciseMode("editExercise")
        )}
        className="grid grid-cols-9 col-span-11 py-3 rounded-xl hover:bg-[#C8CFA0]"
      >
        <div className="grid col-span-8 grid-cols-9 ">
          <Image
            alt=""
            src={exerciseImg}
            className="rounded-xl ml-2 max-w-20 flex text-center max-h-24 col-span-1"
            unoptimized
          ></Image>
          <ul className="col-span-8 ml-10 grid grid-rows-2 h-full">
            <li className="flex items-end">{exerciseName}</li>
            <li className="flex items-start text-gray-500 font-light">
              {Number(exerciseDuration)} Minutes &#8226; {exerciseCalorie} Calories
            </li>
          </ul>
        </div>
      </button>
      <div className="justify-end flex items-center">
        <button
          onClick={() => {
            deleteExercise(exerciseId);
          }}
          className="mr-1 hover:scale-110 active:scale-125 hover:shadow-none"
        >
          <FaRegTrashAlt className="w-10 h-10 hover:cursor-pointer" />
        </button>
      </div>
    </div>
  );
}
