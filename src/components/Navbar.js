import React from "react";
import Image from "next/image";
import Logo from "../images/logo.png";

export default function Navbar() {
  return (
    <div className="pt-2 grid grid-cols-5 border-b-2">
      <div className=" col-span-2 h-16 justify-start">
        <a href="#">
        <Image src={Logo} alt="Calorie Tracker Logo" className="ml-5 w-36 h-16" />
        </a>
      </div>
      <div className="text-sm ml-28 col-span-3 justify-end items-center grid grid-cols-3">
        <div className=" col-span-2 w-4/6 flex flex-row justify-between justify-self-end">
          <a href="#" className="text-center font-semibold">
            <p>Products</p>
          </a>
          <a href="#" className="text-center font-semibold">
            <p>Support</p>
          </a>
          <a href="#" className="text-center font-semibold">
            <p>Blog</p>
          </a>
          <a href="#" className="text-center font-semibold">
            <p>About</p>
          </a>
        </div>
        <div className="flex justify-end mr-7">
          <button className="rounded-xl w-24 h-11 mr-2 text-white font-semibold bg-orange-600">
            Sign Up
          </button>
          <button className="rounded-xl w-24 h-11 font-semibold bg-gray-300">
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}
