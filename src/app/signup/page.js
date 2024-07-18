"use client";
import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";
import { authContext } from "@/lib/store/auth-context";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const { user, loading, logout } = useContext(authContext);
  const router = useRouter();
  const { googleLoginHandler } = useContext(authContext);
  const { signupWithEmailPassword } = useContext(authContext);
  const inputData = {
    username: "",
    password: "",
  };
  const [signupData, setSignupData] = useState(inputData);

  useEffect(() => {
    const checkUserExists = () => {
      if (!user) {
        return;
      }
      if (user) {
        router.push("/");
      }
    };

    checkUserExists();
  }, [user]);

  const handleChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  return (
    <div className="mt-24 font-poppins">
      <div className="justify-center grid">
        <h1 className="text-2xl text-center pb-5">Sign Up</h1>
        <form className="justify-center gap-3 grid grid-rows-2">
          <input
            onChange={handleChange}
            name="email"
            placeholder="email"
          ></input>
          <input
            onChange={handleChange}
            name="password"
            placeholder="password"
          ></input>
          <p>
            Already have an account?{" "}
            <a href="/login" className="text-blue-400 hover:underline">
              Login
            </a>
          </p>
          <button
            type="button"
            onClick={() => (
              signupWithEmailPassword(signupData.email, signupData.password)
            )}
            className="bg-[#f54748] text-lg text-white border-2 border-black rounded-3xl py-3 hover:shadow-gray-900 transition-all duration-100 hover:shadow-inner active:scale-110"
          >
            Sign up
          </button>
        </form>
        <div className="flex mt-3 flex-row justify-between">
          <hr className="w-1/3 mt-2.5 flex"></hr>
          <p className="">Or</p>
          <hr className="w-1/3 mt-2.5 "></hr>
        </div>
        <button
          onClick={googleLoginHandler}
          className="mx-auto flex mt-3 justify-center items-center rounded-xl w-full h-16 border-2 border-black text-white font-semibold bg-[#e04949] hover:shadow-gray-900 transition-all duration-100 hover:shadow-inner active:scale-110"
        >
          <FcGoogle className="text-4xl mr-3"> </FcGoogle>
          <span className="text-xl !font-opensans font-semibold">
            Sign up with Google
          </span>
        </button>
      </div>
    </div>
  );
}
