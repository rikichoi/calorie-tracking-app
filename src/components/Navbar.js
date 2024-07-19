import React, { useState } from "react";
import Image from "next/image";
import Logo from "../images/logo.png";
import Link from "next/link";
import { useContext } from "react";
import { authContext } from "@/lib/store/auth-context";
import { FcGoogle } from "react-icons/fc";
import { FaUser } from "react-icons/fa";

import ViewContextProvider, { viewContext } from "@/lib/store/view-context";

export default function Navbar() {
  const { user, loading, logout } = useContext(authContext);
  const { googleLoginHandler } = useContext(authContext);
  const [selectedPage, setSelectedPage] = useState("");
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

  return (
    <div className="sticky bg-white z-20 top-0">
      {/* If user does not exist then show this section */}
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
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  referrerPolicy="no-referrer"
                  className="w-11 h-11 rounded-full mr-3"
                />
              ) : (
                <FaUser className="w-11 h-11 mr-3" />
              )}

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

      {/* If user exists then show this section */}

      {!user && (
        <div className="sticky bg-white z-50 top-0 min-h-[6rem] grid grid-cols-12 border-b-2">
          <div className="flex justify-center items-center   sm:justify-start md:col-span-3 sm:col-span-7 h-full">
            <Link href={"/"}>
              <Image
                src={Logo}
                alt="HealthDiary Logo"
                className="p-1 sm:min-w-32 sm:ml-5 sm:min-h-20 min-w-40 min-h-24 max-h-16 max-w-28"
              />
            </Link>
          </div>
          <div className="xl:block lg:block md:block sm:hidden text-gray-950 w-full md:col-span-6 text-center justify-center items-center">
            <div className="font-poppins text-base  h-full items-center justify-between flex flex-row ">
              <Link
                href={"/"}
                // onClick={()=>setSelectedPage("")}
                className="hover:opacity-60  text-center  flex items-center justify-center font-semibold"
              >
                {/* <p className={`${homeValue===true ? 'border-orange-600 border-b-2 text-orange-600 transition-all':''}`}>Home</p> */}
                <p className="hover:border-b-2 hover:border-orange-600 hover:text-orange-600 transition-all">
                  Home
                </p>
              </Link>
              <Link
                href={"/#features"}
                // onClick={()=>setSelectedPage("Features")}
                className="hover:opacity-60  text-center  flex items-center justify-center font-semibold"
              >
                {/* <p className={`${featuresValue===true ? 'border-orange-600 border-b-2 text-orange-600 transition-all':''}`}>Features</p> */}
                <p className="hover:border-b-2 hover:border-orange-600 hover:text-orange-600 transition-all">
                Features
                </p>
              </Link>
              <Link
                href={"/#pricing"}
                // onClick={()=>setSelectedPage("Pricing")}
                className="hover:opacity-60  text-center  flex items-center justify-center font-semibold"
              >
                {/* <p className={`${pricingValue===true ? 'border-orange-600 border-b-2 text-orange-600 transition-all':''}`}>Pricing</p> */}
                <p className="hover:border-b-2 hover:border-orange-600 hover:text-orange-600 transition-all">
                Pricing
                </p>
              </Link>
              <Link
                href={"/#support"}
                // onClick={()=>setSelectedPage("Support")}
                className="hover:opacity-60  text-center flex items-center justify-center font-semibold"
              >
                {/* <p className={`${supportValue===true ? 'border-orange-600 border-b-2 text-orange-600 transition-all':''}`}>Support</p> */}
                <p className="hover:border-b-2 hover:border-orange-600 hover:text-orange-600 transition-all">
                Support
                </p>
              </Link>
              <Link
                href={"/#contact"}
                // onClick={()=>setSelectedPage("Contact")}
                className="hover:opacity-60  text-center flex items-center justify-center font-semibold"
              >
                {/* <p className={`${contactValue===true ? 'border-orange-600 border-b-2 text-orange-600 transition-all':''}`}>Contact</p> */}
                <p className="hover:border-b-2 hover:border-orange-600 hover:text-orange-600 transition-all">
                Contact
                </p>
              </Link>
            </div>
          </div>
          <div className="xl:flex lg:flex md:flex sm:hidden md:col-span-3 w-full items-center justify-center ">
            <a
              href="/login"
              className="flex justify-center items-center rounded-xl w-40 h-14 mr-2 text-white font-semibold bg-[#f54748] hover:shadow-gray-900 transition-all duration-100 hover:shadow-inner active:scale-110"
            >
              <span className="text-lg font-poppins">Log in</span>
            </a>
          </div>
          <div className="sm:flex md:hidden flex col-span-5 w-full items-center justify-center ">
            <a
              href="/login"
              className="flex justify-center items-center rounded-xl w-40 h-14 mr-2 text-white font-semibold bg-[#f54748] hover:shadow-gray-900 transition-all duration-100 hover:shadow-inner active:scale-110"
            >
              <FcGoogle className="text-2xl mr-3"> </FcGoogle>{" "}
              <span className="font-bold">Small</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
