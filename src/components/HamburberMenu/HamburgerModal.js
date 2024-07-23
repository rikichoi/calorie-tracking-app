"use client";
import React, { useCallback, useEffect, useState, useContext } from "react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import Link from "next/link";
import { authContext } from "@/lib/store/auth-context";
import { FaPhone } from "react-icons/fa6";
import { IoHomeSharp } from "react-icons/io5";
import { FaList } from "react-icons/fa6";
import { FaBookOpen } from "react-icons/fa";
import { IoIosSchool } from "react-icons/io";

export default function HamburgerModal({ show, onClose }) {
  const { user, loading, logout } = useContext(authContext);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [applyDisabled, setApplyDisabled] = useState(true);
  const [search, setSearch] = useState("");

  if (!user) {
    return (
    <div className=" fixed font-poppins h-full backdrop-blur-md mt-24 z-40 flex  top-0 w-full ">
      <div className="h-1/2 w-full grid grid-rows-5 ">
        <Link
          href={"/"}
          className="row-span-1 h-full p-3 border-y-2 border-zinc-800 items-center  flex hover:bg-zinc-300 bg-zinc-200 w-full"
        >
          <IoHomeSharp className="text-3xl text-zinc-700 mx-5"/>
          <h1 className="flex text-2xl font-semibold text-zinc-700">
            Home
          </h1>
        </Link>
        <Link
          href={"/listings"}
          className="row-span-1 h-full p-3 border-b-2 border-zinc-800 items-center  flex hover:bg-zinc-300 bg-zinc-200 w-full"
        >
          <FaList className="text-3xl text-zinc-700 mx-5"/>
          <h1 className="flex text-2xl font-semibold text-zinc-700">
            Features
          </h1>
        </Link>
        <Link
          href={"/learn"}
          className="row-span-1 h-full p-3 border-b-2 border-zinc-800 items-center flex hover:bg-zinc-300 bg-zinc-200 w-full"
        >
          <IoIosSchool className="text-3xl text-zinc-700 mx-5"/>
          <h1 className="flex text-2xl font-semibold text-zinc-700">
            Pricing
          </h1>
        </Link>
        <Link
          href={"/contact"}
          className="row-span-1 h-full p-3 border-b-2 border-zinc-800 items-center flex hover:bg-zinc-300 bg-zinc-200 w-full"
        >
          <FaBookOpen className="text-3xl text-zinc-700 mx-5"/>
          <h1 className="flex text-2xl font-semibold text-zinc-700">
            Support
          </h1>
        </Link>
        <Link
          href={"/"}
          className="row-span-1 h-full p-3 border-b-2 border-zinc-800 items-center  flex hover:bg-zinc-300 bg-zinc-200 w-full"
        >
          <FaPhone className="text-3xl text-zinc-700 mx-5"/>
          <h1 className="flex text-2xl font-semibold text-zinc-700">
            Contact
          </h1>
        </Link>
      </div>
    </div>
  );
}
return (
""
);
}