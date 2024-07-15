import React from "react";
import Image from "next/image";
import Logo from "../images/logo.png";
import Link from "next/link";
import { useContext } from "react";
import { authContext } from "@/lib/store/auth-context";
import { FcGoogle } from "react-icons/fc";

export default function Navbar() {
  const { user, loading, logout } = useContext(authContext);
  const { googleLoginHandler } = useContext(authContext);

  return (
    <div className="sticky bg-white z-20 top-0">
      {user && !loading && (
        <div className="sticky bg-white z-20 top-0 min-h-[6rem] grid grid-cols-12 border-b-2">
          <div className="flex justify-end items-center col-span-3 h-full">
            <Image
              src={Logo}
              alt="HealthDiary Logo"
              className="p-1 min-w-40 min-h-24 max-h-16 max-w-28"
            />
          </div>
          <div className="pl-64 w-full text-sm col-span-9 text-right justify-end items-center grid grid-cols-8">
            <div className=" flex col-span-10 w-full justify-end ">
              <img
                src={user.photoURL}
                alt={user.displayName}
                referrerPolicy="no-referrer"
                className="w-11 h-11 rounded-full mr-3"
              />
              <button
                onClick={logout}
                className="flex justify-center items-center rounded-xl w-36 h-11 mr-2 text-white font-semibold bg-red-600 hover:shadow-gray-900 transition-all duration-100 hover:shadow-inner active:scale-110"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
      {!user && (
        <div className="sticky bg-white z-50 top-0 min-h-[6rem] grid grid-cols-12 border-b-2">
          <div className="flex justify-end items-center col-span-3 h-full">
            <a href="#">
            <Image
              src={Logo}
              
              alt="HealthDiary Logo"
              className="p-1 min-w-40 min-h-24 max-h-16 max-w-28"
            />
            </a>
          </div>
          <div className="pl-64 w-full col-span-9 text-right justify-end items-center grid grid-cols-8">
            <div className=" text-lg col-span-5 flex flex-row gap-14 justify-end w-full">
              <div class="dropdown">
                <button
                  className="hover:shadow-gray-900 text-lg transition-all duration-100 active:scale-110 font-semibold hover:shadow-none hover:opacity-60 "
                >
                  Products
                </button>
                <div class="dropdown-content">
                  <a className="text-center font-semibold" href="#">
                    Health Diary
                  </a>
                  <a className="text-center font-semibold" href="#">
                    Health Diary Pro
                  </a>
                </div>
              </div>
              <a
                href="#"
                className="hover:opacity-60 text-center font-semibold"
              >
                <p>Support</p>
              </a>
              <a
                href="#"
                className="hover:opacity-60 text-center font-semibold"
              >
                <p>Blog</p>
              </a>
              <a
                href="#"
                className="hover:opacity-60 text-center font-semibold"
              >
                <p>About</p>
              </a>
            </div>
            <div className=" flex col-span-3 w-full justify-center ">
              <button
                onClick={googleLoginHandler}
                className="flex justify-center items-center rounded-xl w-40 h-14 mr-2 text-white font-semibold bg-green-600 hover:shadow-gray-900 transition-all duration-100 hover:shadow-inner active:scale-110"
              >
                <FcGoogle className="text-2xl mr-3"> </FcGoogle>{" "}
                <span className="">Get Started!</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
