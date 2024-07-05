import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaRegTrashAlt } from "react-icons/fa";

export default function LogMealItem({
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
    <div className="grid grid-cols-9">
      <Link href={""} className="grid col-span-8 grid-cols-9 h-3/5">
      <Image
        alt={`${mealName} Image`}
        src={mealImage}
        className="rounded-xl max-h-20 col-span-2 object-cover"
      ></Image>
      <ul className="col-span-2 ml-3 grid grid-rows-2 h-full">
        <li className="flex items-end">{mealName}</li>
        <li className="text-gray-500 font-light">
          {mealCal} Calories &#8226; {mealProtein}g Protein
        </li>
      </ul>
      <div className="col-span-4 justify-end flex items-center">
        {mealWeight}g{" "}
      </div>
      </Link>
      <div className="justify-end flex items-center">
      <button onClick={() => {deleteMeal(mealId)}} className="mr-1 hover:scale-110 active:scale-125 hover:shadow-none">
      <FaRegTrashAlt className="w-10 h-10 hover:cursor-pointer" />
      </button>
      </div>
    </div>
  );
}
