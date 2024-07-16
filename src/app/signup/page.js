"use client"
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { authContext } from "@/lib/store/auth-context";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const { user, loading, logout } = useContext(authContext);
    const router = useRouter();
    const { signupWithEmailPassword } = useContext(authContext);
    const inputData = {
        username: "",
        password: "",
    }
    const [signupData, setSignupData] = useState(inputData)

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
        setSignupData({...signupData, [e.target.name]: e.target.value})
    }

  return (
    <div className=" min-h-screen h-[1000px]">
      <form className="justify-center gap-3 grid grid-rows-2">
        <input onChange={handleChange} name="email" placeholder="email"></input>
        <input onChange={handleChange} name="password" placeholder="password"></input>
        <p>
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Login
          </a>
        </p>
        <button type="button" onClick={()=>signupWithEmailPassword(signupData.email, signupData.password)} className="bg-green-700">Sign up</button>
      </form>
    </div>
  );
}
