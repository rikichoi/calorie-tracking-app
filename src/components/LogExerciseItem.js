import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Running from "@/images/running-image.png";
import Jumping from "@/images/jumping-image.png";
import Swimming from "@/images/swimming-image.png";

export default function LogExerciseItem({
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
    <div className="grid gap-6 mb-5">
      <Link href={""} className="grid grid-cols-8 h-3/5">
        <Image
          alt=""
          src={exerciseImg}
          className="rounded-xl max-h-20 px-7"
        ></Image>
        <ul className="col-span-2 ml-3 grid grid-rows-2 h-full">
          <li className="flex items-end">{exerciseName}</li>
          <li className="text-gray-500 font-light">
            {exerciseDuration} Minutes &#8226; {exerciseCalorie} Calories
          </li>
        </ul>
      </Link>
    </div>
  );
}
