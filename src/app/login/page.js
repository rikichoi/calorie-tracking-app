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
  const [errors, setErrors] = useState({});

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

  const validate = () => {
    let errors = {};
    if (
      !loginData.email ||
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(loginData.email)
    ) {
      errors.email = "Please enter a valid email";
    }
    if (!loginData.password) {
      errors.password = "Please enter a password";
    }
    return errors;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let errors = validate();
    if (Object.keys(errors).length) return setErrors(errors);
    emailPasswordLoginHandler(loginData.email, loginData.password);
    setErrors({});
  };

  return (
    <div className="mt-24 font-poppins">
      <div className="justify-center grid">
        <h1 className="text-2xl text-center pb-5">Login</h1>
        <p className="font-bold text-center text-orange-500">
          Demo Account Details
        </p>
        <p className=" text-center">
          <span className="font-semibold">Email:</span> demo@gmail.com{" "}
        </p>
        <p className=" text-center">
          <span className="font-semibold">Password:</span> demo123{" "}
        </p>
        <form className="justify-center gap-3 grid grid-rows-2">
          <input
            onChange={handleChange}
            name="email"
            placeholder="email"
          ></input>
          {errors.email ? <p className="text-red-600">{errors.email}</p> : ""}

          <input
            onChange={handleChange}
            name="password"
            placeholder="password"
          ></input>
          {errors.password ? <p className="text-red-600">{errors.password}</p> : ""}

          <p>
            Don&apos;t have an account?{" "}
            <a href="/signup" className="text-blue-400 hover:underline">
              Sign up
            </a>
          </p>
          <button
            type="button"
            onClick={(e) => submitHandler(e)}
            className="bg-[#f54748] text-lg text-white border-2 border-black rounded-3xl py-3 hover:shadow-gray-900 transition-all duration-100 hover:shadow-inner active:scale-110"
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
          className="mx-auto flex mt-3 justify-center items-center rounded-xl w-full h-16 border-2 border-black text-white font-semibold bg-[#e04949] hover:shadow-gray-900 transition-all duration-100 hover:shadow-inner active:scale-110"
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
