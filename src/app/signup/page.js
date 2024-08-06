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
  const [errors, setErrors] = useState({});

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

  const validate = () => {
    let errors = {};
    if (
      !signupData.email ||
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(signupData.email)
    ) {
      errors.email = "Please enter a valid email";
    }
    if (!signupData.password) {
      errors.password = "Please enter a password";
    }
    return errors;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let errors = validate();
    if (Object.keys(errors).length) return setErrors(errors);
    signupWithEmailPassword(signupData.email, signupData.password);
    setErrors({});
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
          {errors.email ? <p className="text-red-600">{errors.email}</p> : ""}

          <input
            onChange={handleChange}
            name="password"
            placeholder="password"
          ></input>
          {errors.password ? (
            <p className="text-red-600">{errors.password}</p>
          ) : (
            ""
          )}

          <p>
            Already have an account?{" "}
            <a href="/login" className="text-blue-400 hover:underline">
              Login
            </a>
          </p>
          <button
            type="button"
            onClick={(e) => submitHandler(e)}
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
