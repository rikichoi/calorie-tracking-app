import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Running from "@/images/running-image.png";
import Jumping from "@/images/jumping-image.png";
import Swimming from "@/images/swimming-image.png";
import { FaRegTrashAlt } from "react-icons/fa";

export default function LogExerciseItem({
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
    <div className="grid gap-6 grid-cols-9 mb-5">
      <Link href={""} className="grid col-span-8 grid-cols-8 h-3/5">
        <Image
          alt=""
          src={exerciseImg}
          className="rounded-xl max-h-20 px-7 max-w-36"
        ></Image>
        <ul className="col-span-2 ml-3 grid grid-rows-2 h-full">
          <li className="flex items-end">{exerciseName}</li>
          <li className="text-gray-500 font-light">
            {exerciseDuration} Minutes &#8226; {exerciseCalorie} Calories
          </li>
        </ul>
      </Link>
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
