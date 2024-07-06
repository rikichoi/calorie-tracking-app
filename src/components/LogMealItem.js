import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaRegTrashAlt } from "react-icons/fa";

export default function LogMealItem({
  selectedMeal,
  selectMeal,
  editMealMode,
  show,
  onClose,
  deleteMeal,
  mealId,
  mealLogId,
  mealImage,
  mealName,
  mealCal,
  mealProtein,
  mealCarb,
  mealFat,
  mealWeight,
}) {
  return (
    <div className="grid grid-cols-12">
      <button onClick={()=>(selectMeal(selectedMeal), onClose(!show), editMealMode("editMeal"))} className="grid grid-cols-9 col-span-11 py-3 rounded-xl hover:bg-[#C8CFA0]">
        <div className="grid col-span-8  grid-cols-9">
          <Image
            alt={""}
            src={mealImage}
            className="rounded-xl ml-2 flex max-h-20 col-span-2 object-cover"
            unoptimized
            width={200}
            height={150}
          ></Image>
          <ul className="col-span-4 ml-10 grid grid-rows-2 h-full">
            <li className="flex items-end">{mealName}</li>
            <li className="flex items-start text-gray-500 font-light">
              {Number(mealCal)} Calories &#8226; {Number(mealProtein)}g Protein
            </li>
          </ul>
          <div className="col-span-3 justify-end flex items-center">
            {Number(mealWeight)}g{" "}
          </div>
        </div>
      </button>
      <div className="justify-end flex items-center">
        <button
          onClick={() => {
            deleteMeal(mealId);
          }}
          className="mr-1 hover:scale-110 active:scale-125 hover:shadow-none"
        >
          <FaRegTrashAlt className="w-10 h-10 hover:cursor-pointer" />
        </button>
      </div>
    </div>
  );
}
