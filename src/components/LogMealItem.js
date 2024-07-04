import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function LogMealItem({mealImage, mealName, mealCal, mealProtein, mealCarb, mealFat, mealWeight}) {
  return (
    <Link href={""} className="grid grid-cols-6 h-3/5">
    <Image
      alt={mealName}
      src={mealImage}
      className="rounded-xl max-h-20 object-cover"
    ></Image>
    <ul className="col-span-2 ml-3 grid grid-rows-2 h-full">
      <li className="flex items-end">{mealName}</li>
      <li className="text-gray-500 font-light">
        {mealCal} Calories &#8226; {mealProtein}g Protein
      </li>
    </ul>
    <div className="col-span-3 justify-end flex items-center">{mealWeight}g</div>
  </Link>
  )
}
