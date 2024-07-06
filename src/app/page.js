'use client'
import Image from "next/image";
import MainImage from "../images/main-image.png";
import NutritionImage from "../images/nutrition-image.png";
import FitnessImage from "../images/fitness-image.png";
import TargetImage from "../images/target-image.png";
import BMIImage from "../images/bmi-image.png";
import { useContext } from "react";
import { authContext } from "@/lib/store/auth-context";
import { FcGoogle } from "react-icons/fc";
import Dashboard from "./dashboard/page";


export default function Home() {
  const {user, loading, logout} = useContext(authContext);
  const { googleLoginHandler } = useContext(authContext);
  if(!user){

  return (
    <main className="flex min-h-screen h-[1000px] flex-col items-center gap-28 pr-24 pl-24 pt-8">
      <div className="grid justify-items-center ">
        <Image
          src={MainImage}
          alt="Fruits"
          className="rounded-xl brightness-[50%] max-h-[500px] object-cover absolute"
        />
        <div className="relative mt-64 items-center ml-24">
          <h1 className="text-white text-5xl brightness-150 font-semibold mb-2">
            Welcome to Calorie Tracker
          </h1>
          <p className="text-white w-5/6 mb-5">
            Track your daily calorie intake, log your meals and exercise, and
            calculate your BMI. Get started by signing in or signing up for free
            today.
          </p>
          <button
              onClick={googleLoginHandler}
              className="flex justify-center items-center rounded-xl w-48 h-16 mr-2 text-white font-semibold bg-green-600 hover:shadow-gray-900 transition-all duration-100 hover:shadow-inner active:scale-110"
            >
              <FcGoogle className="text-2xl mr-3"> </FcGoogle> Sign In
            </button>
        </div>
      </div>
      <div className=" flex -mb-20 w-5/6">
        <h2 className="text-4xl font-semibold">
          What can you do with Calorie Tracker?
        </h2>
      </div>
      <div className="-mb-12 w-5/6 grid grid-cols-4 gap-3">
        <div>
          <Image
            alt="Various Fruits"
            src={NutritionImage}
            className="rounded-xl max-h-[137px] object-cover mb-3"
          />
          <h3>Log your meals</h3>
          <h4 className="text-gray-500 text-sm">
            Track both your calories and macronutrients
          </h4>
        </div>
        <div>
          <Image
            alt="People Jogging"
            src={FitnessImage}
            className="rounded-xl max-h-[137px] object-cover mb-3"
          />
          <h3>Log your exercises</h3>
          <h4 className="text-gray-500 text-sm">
            See how many calories you&apos;ve burned
          </h4>
        </div>
        <div>
          <Image
            alt="Scale"
            src={BMIImage}
            className="rounded-xl max-h-[137px] object-cover mb-3"
          />
          <h3>Calculate your BMI</h3>
          <h4 className="text-gray-500 text-sm">
            Use our calculator to find out if you&apos;re at a healthy weight
          </h4>
        </div>
        <div>
          <Image
            alt="Goal Setting"
            src={TargetImage}
            className="rounded-xl max-h-[137px] object-cover mb-3"
          />
          <h3>Set a target weight</h3>
          <h4 className="text-gray-500 text-sm">
            Use our calculator to see how many calories you should be eating
          </h4>
        </div>
      </div>

      <div className="  w-5/6 h-20 grid grid-cols-4 gap-5">
        <div>
        <a href="#">
          <h5 className="text-gray-500 text-sm text-center">
            About Us
          </h5>
          </a>
        </div>
        <div>
        <a href="#">
          <h5 className="text-gray-500 text-sm text-center">
            Contact Us
          </h5>
          </a>
        </div>
        <div>
        <a href="#">
          <h5 className="text-gray-500 text-sm text-center">
            Privacy Policy
          </h5>
          </a>
        </div>
        <div>
          <a href="#">
          <h5 className="text-gray-500 text-sm text-center">
            Terms of Service
          </h5>
          </a>
        </div>
      </div>
    </main>
  );
}
return <Dashboard/>;
}

