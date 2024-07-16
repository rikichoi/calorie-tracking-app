"use client";
import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";
import { authContext } from "@/lib/store/auth-context";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { user, loading, logout } = useContext(authContext);
  const router = useRouter();
  const { googleLoginHandler } = useContext(authContext);
  const { emailPasswordLoginHandler } = useContext(authContext);
  const inputData = {
    username: "",
    password: "",
  };
  const [loginData, setLoginData] = useState(inputData);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

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

  return (
    <div className=" min-h-screen h-[1000px]">
      <div className="justify-center grid">
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
            Don&apos;t have an account?{" "}
            <a href="/signup" className="text-blue-400 hover:underline">
              Sign up
            </a>
          </p>
          <button
            type="button"
            onClick={() => (
              emailPasswordLoginHandler(loginData.email, loginData.password),
              router.push("/")
            )}
            className="bg-green-700"
          >
            Login
          </button>
        </form>
        <div className="flex mt-3 flex-row justify-between">
          <hr className="w-1/3 mt-2.5 flex"></hr>
          <p className="">Or</p>
          <hr className="w-1/3 mt-2.5 "></hr>
        </div>
        <button
          onClick={googleLoginHandler}
          className="flex mt-3 justify-center items-center rounded-xl max-w-64 w-full h-16 mr-2 text-white font-semibold bg-[#f54748] hover:shadow-gray-900 transition-all duration-100 hover:shadow-inner active:scale-110"
        >
          <FcGoogle className="text-4xl mr-3"> </FcGoogle>
          <span className="text-xl !font-opensans font-semibold">
            Login with Google
          </span>
        </button>
      </div>
    </div>
  );
}
