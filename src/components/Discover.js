import Image from "next/image";
import React from "react";
import featured from "@/images/featured-image.jpg";
import Link from "next/link";
import featured2 from "@/images/featured-image2.webp";
import featured3 from "@/images/featured-image3.webp";
import featured4 from "@/images/featured-image4.webp";

export default function Discover() {
  return (
    <div className="max-w-7xl mx-auto justify-center items-center flex flex-col">
      <div className="flex flex-col p-5">
        <h1 className="text-2xl font-semibold mb-4">Featured Article</h1>
        <div className="relative h-64 sm:h-80 mb-3">
          <Image
            src={featured}
            alt="Featured article cover"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div className="mb-4">
          <h2 className="text-xl">
            10 Simple Ways to Cut Calories Without Feeling Deprived
          </h2>
          <p className="text-gray-500">
            Learn effective strategies to reduce your calorie intake while still
            enjoying your meals.
          </p>
        </div>
        <Link
          href={"https://medium.com/diet-nutrition"}
          target="_blank"
          className="bg-[#18181b] hover:bg-white hover:text-[#18181b] border border-black transition-all duration-100 text-white rounded-lg w-fit p-2"
        >
          Read More
        </Link>
      </div>
      <div className="w-full pt-5 px-5">
        <h1 className=" text-2xl font-semibold">Educational Content</h1>
      </div>

      <div className="grid gap-3 md:grid-cols-1 lg:grid-cols-3">
        <div className="flex flex-grow flex-col p-5">
          <div className="relative h-40 sm:h-40">
            <Image
              src={featured2}
              alt="Diet recommendation cover 1"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="flex flex-col mb-4">
            <h1 className="font-semibold truncate">
              A Guide on: Alternative Calcium Sources for Those Allergic to
              Dairy
            </h1>
            <p className="text-gray-500">
              A nutritious and delicious meal prep idea
            </p>
          </div>
          <Link
            href={
              "https://medium.com/diet-nutrition/a-guide-on-alternative-calcium-sources-for-those-allergic-to-dairy-d8a1a274279c"
            }
            target="_blank"
            className="bg-white hover:bg-[#18181b] hover:text-white border hover:border-white border-black rounded-lg w-fit p-2"
          >
            Read Post
          </Link>
        </div>
        <div className="flex flex-grow flex-col p-5">
          <div className="relative h-40 sm:h-40">
            <Image
              src={featured3}
              alt="Diet recommendation cover 2"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="flex flex-col mb-4">
            <h1 className="font-semibold truncate">
              Healthy Recipe: Quinoa Salad
            </h1>
            <p className="text-gray-500">
              A nutritious and delicious meal prep idea
            </p>
          </div>
          <Link
            href={
              "https://medium.com/diet-nutrition/is-margarine-healthy-or-harmful-what-you-need-to-know-4a0b9393eb64"
            }
            target="_blank"
            className="bg-white hover:bg-[#18181b] hover:text-white border hover:border-white border-black rounded-lg w-fit p-2"
          >
            Read Post
          </Link>
        </div>
        <div className="flex flex-grow flex-col p-5">
          <div className="relative h-40 sm:h-40">
            <Image
              src={featured4}
              alt="Diet recommendation cover 3"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="flex flex-col mb-4">
            <h1 className="font-semibold truncate">
              Healthy Recipe: Quinoa Salad
            </h1>
            <p className="text-gray-500">
              A nutritious and delicious meal prep idea
            </p>
          </div>
          <Link
            href={
              "https://medium.com/diet-nutrition/avocado-a-versatile-and-nutritious-superfruit-09a9563da809"
            }
            target="_blank"
            className="bg-white hover:bg-[#18181b] hover:text-white border hover:border-white border-black rounded-lg w-fit p-2"
          >
            Read Post
          </Link>
        </div>
      </div>
    </div>
  );
}
