"use client";
import Image from "next/image";
import MainImage from "../images/main-image.png";
import NutritionImage from "../images/nutrition-image.png";
import FitnessImage from "../images/fitness-image.png";
import TargetImage from "../images/target-image.png";
import BMIImage from "../images/bmi-image.png";
import { useContext, useRef, useEffect } from "react";
import { authContext } from "@/lib/store/auth-context";
import { FcGoogle } from "react-icons/fc";
import Dashboard from "./dashboard/page";
import { useInView } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import FeaturesImage from "../images/features-image.png";
import NewsletterImg from "../images/newsletter-image.png";
import { MdMail, MdOutlineNotes } from "react-icons/md";
import { FaQuestionCircle } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

import ViewContextProvider, { viewContext } from "@/lib/store/view-context";
import Link from "next/link";

export default function Home() {
  const homeRef = useRef(null);
  const homeIsInView = useInView(homeRef, { amount: 0.85 });
  const featuresRef = useRef(null);
  const featuresIsInView = useInView(featuresRef, { amount: 0.15 });
  const pricingRef = useRef(null);
  const pricingIsInView = useInView(pricingRef, { amount: 0.6 });
  const supportRef = useRef(null);
  const supportIsInView = useInView(supportRef, { amount: 0.32 });
  const contactRef = useRef(null);
  const contactIsInView = useInView(contactRef, { amount: 0.6 });
  const {
    sectionInView,
    homeValue,
    featuresValue,
    pricingValue,
    supportValue,
    contactValue,
    getContactValue,
    getFeaturesValue,
    getHomeValue,
    getPricingValue,
    getSupportValue,
  } = useContext(viewContext);
  const { user, loading, logout } = useContext(authContext);
  const { googleLoginHandler } = useContext(authContext);

  useEffect(() => {
    getContactValue(contactIsInView);
    getFeaturesValue(featuresIsInView);
    getHomeValue(homeIsInView);
    getPricingValue(pricingIsInView);
    getSupportValue(supportIsInView);
  }, [
    homeIsInView,
    featuresIsInView,
    pricingIsInView,
    supportIsInView,
    contactIsInView,
  ]);

  if (!user) {
    return (
      <main className="flex min-h-screen flex-col items-center gap-10">
        <div
          ref={homeRef}
          id="home"
          className="md:py-0 py-16 md:max-h-[500px] w-full md:min-h-[450px] max-h-[570px] grid justify-items-center "
        >
          <Image
            src={MainImage}
            alt="Fruits"
            className="md:w-full md:h-full md:rounded-none md:border-0 rounded-xl border-2 border-black brightness-[50%] max-h-[500px] object-cover absolute"
          />
          <div className="relative md:w-full md:items-center md:mt-20 md:ml-0 md:text-center md:h-full mt-64 items-center ml-24">
            <h1 className="text-white font-poppins text-5xl brightness-150 font-bold mb-2">
              Welcome to Calorie Tracker
            </h1>
            <p className="text-white font-opensans w-5/6 md:w-full md:py-6 mb-5">
              Track your daily calorie intake, log your meals and exercise, and
              calculate your BMI. Get started by signing in or signing up for
              free today.
            </p>
            <a
              href={"/login"}
              className="flex md:max-w-none justify-center border-2 items-center rounded-xl max-w-64 w-full h-16 mr-2 text-white font-semibold bg-[#f54748] hover:shadow-gray-900 transition-all duration-100 hover:shadow-inner active:scale-110"
            >
              <span className="text-xl font-poppins font-semibold">
                Get Started!
              </span>
            </a>
          </div>
        </div>
        <div className="md:scroll-mt-12 scroll-mt-24" ref={featuresRef} id="features">
          <div className="border-y-2 flex flex-col py-20 gap-16 items-center w-full bg-[#edeef2] h-full">
            <div className="grid md:grid-rows-3 grid-rows-2 w-5/6">
              <h2 className="md:row-span-1 md:text-2xl text-4xl font-semibold">
                What can you do with Calorie Tracker?
              </h2>
              <h3 className="md:row-span-2 text-gray-500">
                Our app empowers you to take control of your health and fitness
                journey. Use our calculator to stay on top of your health and
                fitness. Whether you&apos;re jogging, weightlifting, or just
                trying to eat healthier, Calorie Tracker is here to support you
                every step of the way.
              </h3>
            </div>
            <div className="w-5/6 md:w-3/6 grid md:grid-cols-1 grid-cols-4 gap-5">
              <div className="md:bg-zinc-50 md:py-10 md:px-3 md:drop-shadow-2xl shadow- md:rounded-xl md:w-full">
                <Image
                  alt="Various Fruits"
                  src={NutritionImage}
                  className="rounded-xl max-h-[137px] md:max-h-[200px] object-cover "
                />
                <h3 className="pt-4 pb-2 font-semibold">Log your meals</h3>
                <h4 className="text-gray-500 text-sm">
                  Track both your calories and macronutrients
                </h4>
              </div>
              <div className="md:bg-zinc-50 md:py-10 md:px-3 md:drop-shadow-2xl shadow- md:rounded-xl md:w-full">
                <Image
                  alt="People Jogging"
                  src={FitnessImage}
                  className="rounded-xl max-h-[137px] md:max-h-[200px] object-cover "
                />
                <h3 className="pt-4 pb-2 font-semibold">Log your exercises</h3>
                <h4 className="text-gray-500 text-sm">
                  See how many calories you&apos;ve burned
                </h4>
              </div>
              <div className="md:bg-zinc-50 md:py-10 md:px-3 md:drop-shadow-2xl shadow- md:rounded-xl md:w-full">
                <Image
                  alt="Scale"
                  src={BMIImage}
                  className="rounded-xl max-h-[137px] md:max-h-[200px] object-cover "
                />
                <h3 className="pt-4 pb-2 font-semibold">Calculate your BMI</h3>
                <h4 className="text-gray-500 text-sm">
                  Use our calculator to find out if you&apos;re at a healthy
                  weight
                </h4>
              </div>
              <div className="md:bg-zinc-50 md:py-10 md:px-3 md:drop-shadow-2xl shadow- md:rounded-xl md:w-full">
                <Image
                  alt="Goal Setting"
                  src={TargetImage}
                  className="rounded-xl max-h-[137px] md:max-h-[200px] object-cover "
                />
                <h3 className="pt-4 pb-2 font-semibold">Set a target weight</h3>
                <h4 className="text-gray-500 text-sm">
                  Use our calculator to see how many calories you should be
                  eating
                </h4>
              </div>
            </div>
          </div>

          <div className="md:grid-cols-1 md:px-3 md:py-10 grid py-36 px-20 mx-auto grid-cols-8 w-5/6">
            <div className="col-span-3">
              <h2 className="font-poppins font-semibold text-4xl">
                What makes us <span className="text-[#f54748]">unique</span>{" "}
                from others?
              </h2>
              <h3 className="pt-3 text-gray-500 font-roboto">
                Here are 4 reasons that makes our product stand out!
              </h3>
              <ul className="pt-7 space-y-4 text-lg">
                <li className="flex gap-2 items-center">
                  <FaCheckCircle className="text-green-600 md:text-2xl text-3xl " />
                  <p className="md:text-sm">
                    Log your meals and activity at any occasion.
                  </p>
                </li>
                <li className="flex gap-2 items-center">
                  <FaCheckCircle className="text-green-600 md:text-2xl text-3xl" />
                  <p className="md:text-sm">
                    Access an all-encompassing database.
                  </p>
                </li>
                <li className="flex gap-2 items-center">
                  <FaCheckCircle className="text-green-600 md:text-2xl text-3xl" />
                  <p className="md:text-sm">
                    Keep track and achieve your goals.
                  </p>
                </li>
                <li className="flex gap-2 items-center">
                  <FaCheckCircle className="text-green-600  md:text-2xl text-3xl" />
                  <p className="md:text-sm">Available on all platforms.</p>
                </li>
              </ul>

              <button className="mt-10 h-16 w-40 hover:shadow-inner hover:shadow-black rounded-2xl font-poppins font-semibold text-lg text-white border-2 bg-[#f54748] flex items-center justify-center">
                Learn More
                <FaArrowRight className="ml-2" />
              </button>
            </div>

            <div className="col-span-5  w-full">
              {" "}
              <Image
                alt="Doctor with food"
                src={FeaturesImage}
                className="md:hidden object-cover"
              />
            </div>
          </div>
        </div>

        <div
          ref={pricingRef}
          id="pricing"
          className="bg-[#edeef2] scroll-mt-24 py-20 border-y-2 w-full justify-center grid grid-rows-7"
        >
          <div className="row-span-1 w-full md:px-5 px-80 pt-10 space-y-6 text-center">
            <h2 className="font-poppins text-4xl">
              <span className="bg-[#f54748] px-3 font-semibold text-white">
                Achieve
              </span>{" "}
              your fitness goals today!
            </h2>
            <h3 className="text-lg text-gray-700">
              We offer competitive prices for all users
            </h3>
          </div>
          <div className="row-span-4 md:grid-cols-1 md:pt-0 md:px-32 px-56 pt-10 grid grid-cols-2 gap-24 w-full">
            <div className="bg-[#f54748] md:h-full h-5/6 text-white border-2 p-6 rounded-3xl border-black grid grid-rows-5">
              <div className="font-poppins row-span-2 space-y-5 text-center">
                <h3 className="text-3xl">Standard</h3>
                <h2 className="text-5xl">$30/mth</h2>
              </div>
              <ul className="row-span-2 space-y-5 pt-2">
                <li className="flex gap-2 items-center">
                  <FaCheckCircle className=" text-3xl" />
                  Limited food database
                </li>
                <li className="flex gap-2 items-center">
                  <FaCheckCircle className=" text-3xl" />
                  Basic calorie tracking
                </li>
                <li className="flex gap-2 items-center">
                  <FaCheckCircle className=" text-3xl" />
                  BMI calculation
                </li>
              </ul>
              <button className=" bg-black text-white hover:border-2 mt-3 hover:border-white font-poppins w-2/3 mx-auto rounded-xl">
                Get 7 Day Free Trial
              </button>
            </div>

            <div className="bg-white md:h-full h-5/6 text-black border-2 p-6 rounded-3xl border-black grid grid-rows-5">
              <div className="font-poppins row-span-2 space-y-5 text-center">
                <h3 className="text-3xl">Premium</h3>
                <h2 className="text-5xl">$60/mth</h2>
              </div>
              <ul className="row-span-2 space-y-5 pt-2">
                <li className="flex gap-2 items-center">
                  <FaCheckCircle className="text-green-600 text-3xl" />
                  Comprehensive food database
                </li>
                <li className="flex gap-2 items-center">
                  <FaCheckCircle className="text-green-600 text-3xl" />
                  Advanced calorie tracking
                </li>
                <li className="flex gap-2 items-center">
                  <FaCheckCircle className="text-green-600 text-3xl" />
                  Personalized meal plans
                </li>
              </ul>
              <button className=" bg-gray-700 hover:border-black mt-3 hover:border-2 hover:bg-[#f54748] text-white font-poppins w-2/3 mx-auto rounded-xl">
                Get 7 Day Free Trial
              </button>
            </div>
          </div>
          <div className="row-span-2 md:h-2/5 md:my-auto rounded-3xl bg-blue-300 grid grid-cols-4 w-5/6 h-4/5 border-2 border-black mx-auto">
            <div className="col-span-1 flex items-end">
              <Image
                alt="Energetic girl"
                src={NewsletterImg}
                className="max-w-36 md:hidden md:ml-0 absolute ml-32"
              />
            </div>
            <div className="md:col-span-4 md:px-5 col-span-2 text-center">
              <h1 className="md:text-lg md:pt-0 pt-10 pb-6 font-poppins text-2xl">
                Sign up to our newsletter for daily fitness and health insights
              </h1>
              <div className="flex flex-row">
                <input
                  className="bg-white md:w-full w-2/3 px-3"
                  placeholder="enter your email address here"
                ></input>{" "}
                <FaArrowRight className="hover:cursor-pointer hover:text-gray-600 active:scale-110 transition-all ml-2 text-3xl" />
              </div>
            </div>
            <div className="col-span-1 ">
              <MdOutlineNotes className="md:hidden text-[200px] my-auto" />
            </div>
          </div>
        </div>

        <div
          ref={supportRef}
          id="support"
          className="scroll-mt-24 w-full py-10 justify-center"
        >
          <div className="bg-[#ffaa5f] md:px-0 w-4/5 p-12 rounded-3xl mx-auto grid grid-rows-6">
            <div className="row-span-1 text-center">
              <h4 className="text-gray-500">F.A.Q.</h4>
            </div>
            <div className="row-span-1 text-center">
              <h2 className="font-ubuntu text-4xl">
                Frequently Asked Questions
              </h2>
            </div>
            <ul className="row-span-4 md:px-5 px-52 space-y-3">
              <li className="">
                <h4 className="flex pb-2 font-ubuntu text-lg font-medium">
                  <FaQuestionCircle className="text-[#ffeeb5] text-4xl mr-3" />{" "}
                  How do I download the app?
                </h4>
                To download the app, go to the App Store (for iOS devices) or
                Google Play Store (for Android devices) on your mobile device.
                Search for the name of the app and click &quot;Download&quot; or
                &quot;Install&quot;.
              </li>
              <li>
                <h4 className="flex pb-2 font-ubuntu text-lg font-medium">
                  <FaQuestionCircle className="text-[#ffeeb5] text-4xl mr-3" />
                  What devices are supported by the app?
                </h4>
                Check the app&apos;s description in the app store for the list
                of devices it supports. Typically, the app will work on the
                latest versions of iOS or Android operating systems.
              </li>
              <li>
                <h4 className="flex pb-2 font-ubuntu text-lg font-medium">
                  <FaQuestionCircle className="text-[#ffeeb5]  text-4xl mr-3" />
                  How do I contact customer support?
                </h4>
                Look for a &quot;Contact us&quot; or &quot;Support&quot; option
                within the app&apos;s settings or help menu. You can typically
                send an email or message to the app&apos;s customer support
                team.
              </li>
            </ul>
          </div>
        </div>

        <div
          ref={contactRef}
          id="contact"
          className="bg-[#edeef2] scroll-mt-24 border-y-2 w-full py-10 justify-center"
        >
          <div className="md:py-0 p-12 md:grid-rows-1 mx-auto grid grid-rows-3">
            <div className="md:py-10 text-center font-poppins space-y-4">
              <h1 className="text-4xl">Get in Touch</h1>
              <h2 className="text-lg">
                Want to get in touch? We&apos;d love to hear from you.
                Here&apos;s how you can reach us...
              </h2>
            </div>
            <div className="row-span-2 md:grid-cols-1 md:px-5 grid grid-cols-3 gap-10 px-36 font-poppins">
              <div className="col-span-1  p-14 bg-white shadow-2xl gap-3 grid grid-rows-2">
                <div>
                  <FaLocationDot className=" bg-gray-300 row-span-1 text-blue-700 h-16 w-16 rounded-full p-5" />
                </div>
                <div className="grid grid-rows-2">
                  <h4 className=" text-xl">Our Location</h4>
                  <p className="text-gray-500">
                    7/13 Devington St, Hawthorn, NWS, 2912
                  </p>
                </div>
              </div>
              <div className="col-span-1  p-14 bg-white shadow-2xl gap-3 grid grid-rows-2">
                <div>
                  <FaPhoneAlt className=" bg-gray-300 row-span-1 text-blue-700 h-16 w-16 rounded-full p-5" />
                </div>
                <div className="grid grid-rows-2">
                  <h4 className=" text-xl">Call Us On</h4>
                  <div className="space-y-2">
                    <p className="text-gray-500">+61 06 2196 7537</p>
                    <p className="text-gray-500">+61 06 2196 7500</p>
                  </div>
                </div>
              </div>
              <div className="col-span-1  p-14 bg-white shadow-2xl gap-3 grid grid-rows-2">
                <div>
                  <MdMail className=" bg-gray-300 row-span-1 text-blue-700 h-16 w-16 rounded-full p-5" />
                </div>
                <div className="grid grid-rows-2">
                  <h4 className=" text-xl">Email Us</h4>
                  <div className="space-y-2">
                    <p className="text-gray-500">healthdiary@gmail.com</p>
                    <p className="text-gray-500">hdiary@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 w-5/6 min-h-28 grid grid-cols-4 gap-5">
          <div>
            <Link href={""}>
              <h5 className="text-gray-500 text-center">About Us</h5>
            </Link>
          </div>
          <div>
            <Link href={""}>
              <h5 className="text-gray-500  text-center">Contact Us</h5>
            </Link>
          </div>
          <div>
            <Link href={""}>
              <h5 className="text-gray-500  text-center">Privacy Policy</h5>
            </Link>
          </div>
          <div>
            <Link href={""}>
              <h5 className="text-gray-500  text-center">Terms of Service</h5>
            </Link>
          </div>
        </div>
      </main>
    );
  }
  return <Dashboard />;
}
