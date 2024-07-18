"use client";
import { React, useEffect, useState } from "react";

export default function BmiCalculatorModal({ show, onClose }) {
  const [genderInput, setGenderInput] = useState("");
  const [ageInput, setAgeInput] = useState(0);
  const [heightInput, setHeightInput] = useState(0);
  const [weightInput, setWeightInput] = useState(0);
  const [bmiValue, setBmiValue] = useState(0);
  const [bmiRange, setBmiRange] = useState(null);
  const initialState = [
    {
      gender: "",
      age: "",
      height: 0,
      weight: 0,
      bmiValue: "",
    },
  ];
  const [data, setData] = useState(initialState);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const calculateBmi = () => {
      if (data.weight == 0 && data.height != 0) {
        setBmiValue(0);
      }
      if (data.weight != 0 && data.height == 0) {
        setBmiValue(0);
      }
      if (data.weight === "undefined" && data.height === "undefined") {
        setBmiValue(0);
      }
      if (data.weight > 0 && data.height > 0) {
        setBmiValue(data.weight / (data.height / 100) ** 2);
      }
    };
    calculateBmi();
  }, [data]);

  useEffect(() => {
    const calculateBmiRange = () => {
      if (bmiValue <= 0) {
        setBmiRange("");
      }
      if (bmiValue > 0 && bmiValue < 18.5) {
        setBmiRange("Underweight");
      }
      if (bmiValue >= 18.5 && bmiValue <= 24.9) {
        setBmiRange("Healthy");
      }
      if (bmiValue >= 25 && bmiValue < 29.9) {
        setBmiRange("Overweight");
      }
      if (bmiValue >= 30) {
        setBmiRange("Obese");
      }
    };
    calculateBmiRange();
  }, [bmiValue]);

  return (
    <div className="grid h-[71vh] font-poppins grid-rows-9">
      <div className="w-full row-span-1 flex flex-row justify-end p-4">
        <button
          onClick={() => onClose(!show)}
          className="hover:shadow-gray-900 transition-all duration-100 hover:shadow-inner active:scale-110 w-10 h-10 rounded-full bg-red-700 border-2 border-black text-white font-bold"
        >
          X
        </button>
      </div>
      <div className="w-full row-span-1 flex justify-center font-bold text-3xl">
        <h1 className="row-span-1">Dynamic BMI Calculator</h1>
      </div>
      <div className="row-span-7 text-lg mx-20">
        <div className="row-span-1 grid grid-rows-6">
          <div className="grid row-span-5 grid-cols-3">
            <div className="grid grid-rows-5 gap-10">
              <h2 className="row-span-1">
                Gender <span className="text-red-600">*</span>
              </h2>
              <h2 className="row-span-1">
                Age <span className="text-red-600">*</span>
              </h2>
              <h2 className="row-span-1">
                Height (cm) <span className="text-red-600">*</span>
              </h2>
              <h2 className="row-span-1">
                Weight (kg) <span className="text-red-600">*</span>
              </h2>
              <h2 className="row-span-1">
                BMI
              </h2>
            </div>
            <div className="col-span-2 flex w-full flex-row justify-between ">
              <div className="grid grid-rows-5 w-full gap-10">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    className="h-5 w-5"
                    value={"Male"}
                    onChange={handleChange}
                  ></input>
                  <label className="">Male</label>
                  <input
                    type="radio"
                    name="gender"
                    className="h-5 w-5"
                    value={"Female"}
                    onChange={handleChange}
                  ></input>
                  <label>Female</label>
                </div>
                <input
                  onChange={handleChange}
                  name="age"
                  className="h-8 w-full"
                ></input>
                <input
                  onChange={handleChange}
                  name="height"
                  className="h-8 w-full"
                ></input>
                <input
                  onChange={handleChange}
                  name="weight"
                  className="h-8 w-full"
                ></input>
                <input
                  value={bmiValue}
                  disabled
                  name="bmiValue"
                  className="h-8 w-full"
                ></input>
              </div>
            </div>
          </div>
          {bmiRange ? (
            <h2 className="row-span-1 w-full text-center justify-center items-center flex">
              Your BMI falls within the {bmiRange} category.
            </h2>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
