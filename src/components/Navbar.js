import React from "react";
import Image from "next/image";
import Logo from "../images/logo.png";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="pt-2 grid grid-cols-12 border-b-2">
      <div className=" col-span-2 h-16 justify-start">
        <Link href="/">
        <Image src={Logo} alt="Calorie Tracker Logo" className="ml-5 w-36 h-16" />
        </Link>
      </div>
      <div className="pl-64 text-sm col-span-10 justify-end items-center grid grid-cols-4">
        <div className=" col-span-3 pr-12 w-4/6 flex flex-row justify-between justify-self-end">
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
          <Link href={"/dashboard"}>
          <button className="rounded-xl w-24 h-11 mr-2 text-white font-semibold bg-orange-600 hover:shadow-gray-900 transition-all duration-100 hover:shadow-inner active:scale-110">
            Sign Up
          </button>
          </Link>
          <button className="rounded-xl w-24 h-11 font-semibold bg-gray-300 hover:shadow-gray-900 transition-all duration-100 hover:shadow-inner active:scale-110 ">
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}
