import React from "react";
import Link from "next/link";
import Image from "next/image";

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
  return (
    <div className="flex flex-col items-center">
      <button className="grid grid-cols-8 hover:bg-[#C8CFA0] hover:border-2 hover:border-[#C8CFA0] rounded-xl max-w-xl justify-center py-3 px-4">
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
