"use client";
import { React, useContext, useEffect, useState } from "react";
import { UserContext } from "@/lib/store/user-context";
import { authContext } from "@/lib/store/auth-context";
import { useServerInsertedHTML } from "next/navigation";

export default function UserSettingsModal({ show, onClose }) {
  const { user } = useContext(authContext);
  const { userData, postUserData } = useContext(UserContext);
  const [errors, setErrors] = useState({});
  const [genderInput, setGenderInput] = useState("");
  const [ageInput, setAgeInput] = useState(0);
  const [heightInput, setHeightInput] = useState(0);
  const [weightInput, setWeightInput] = useState(0);
  const [bmiValue, setBmiValue] = useState(0);
  const [bmiRange, setBmiRange] = useState(null);

  const [data, setData] = useState({
    activity: 1.2,
    bmiValue: 0,
    gender: "",
    height: "",
    weight: "",
    age: "",
    maintenanceCalories: "",
  });

  const handleChange = (e) => {
    if (e.target.type == "number" || e.target.name === "activity") {
      setData({ ...data, [e.target.name]: parseInt(e.target.value) });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    const validate = () => {
      let errors = {};
      if (data.age && isNaN(data.age)) {
        errors.age = "Please enter age in numbers";
      }
      if (data.height && isNaN(data.height)) {
        errors.height = "Please enter height in numbers";
      }
      if (data.weight && isNaN(data.weight)) {
        errors.weight = "Please enter in numbers";
      }
      setErrors(errors);
    };
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
        setBmiValue((data.weight / (data.height / 100) ** 2).toFixed(2));
      }
    };
    calculateBmi();
    validate();
  }, [data]);

  useEffect(() => {
    const calculateBmiRange = () => {
      if (bmiValue <= 0) {
        setBmiRange("");
      }
      if (bmiValue > 0 && bmiValue < 18.5) {
        setBmiRange(
          <span className="text-red-600">&nbsp;Underweight&nbsp;</span>
        );
      }
      if (bmiValue >= 18.5 && bmiValue <= 24.9) {
        setBmiRange(
          <span className="text-green-600">&nbsp;Healthy&nbsp;</span>
        );
      }
      if (bmiValue >= 25 && bmiValue < 29.9) {
        setBmiRange(
          <span className="text-orange-600">&nbsp;Overweight&nbsp;</span>
        );
      }
      if (bmiValue >= 30) {
        setBmiRange(<span className="text-red-600">&nbsp;Obese&nbsp;</span>);
      }
    };
    calculateBmiRange();
  }, [bmiValue]);

  useEffect(() => {
    const calculateMaintenanceCalories = () => {
      if (!data.gender && !data.age && !data.height && !data.weight) {
        return;
      }
      if (data.gender && data.gender == "Male" && data.age && data.height && data.weight) {
        let bmr = 10 * data.weight + 6.25 * data.height - 5 * data.age + 5;
        let maintenanceCalories = bmr * data.activity;
        setData({...data, maintenanceCalories: maintenanceCalories});
      }
      if (data.gender && data.gender == "Female" && data.age && data.height && data.weight) {
        let bmr = 10 * data.weight + 6.25 * data.height - 5 * data.age - 161;
        let maintenanceCalories = bmr * data.activity;
        setData({...data, maintenanceCalories: maintenanceCalories});
      }
    };
    calculateMaintenanceCalories();
  }, [bmiValue]);

  return (
    <div className="grid h-[71vh] font-poppins grid-rows-9">
      <div className="w-full row-span-1 flex flex-row justify-end p-4">
        {userData ? (
          <button
            onClick={() => onClose(!show)}
            className="hover:shadow-gray-900 transition-all duration-100 hover:shadow-inner active:scale-110 w-10 h-10 rounded-full bg-red-700 border-2 border-black text-white font-bold"
          >
            X
          </button>
        ) : (
          ""
        )}
      </div>
      <div className="w-full row-span-1 flex justify-center font-bold text-3xl">
        <h1 className="row-span-1">
          {" "}
          {userData ? (
            <span>Profile Settings</span>
          ) : (
            <span>Set Up Your Profile</span>
          )}
        </h1>
      </div>
      <div className="row-span-7 text-lg mx-20">
        <div className="row-span-1 grid grid-rows-6">
          <div className="grid row-span-5 grid-cols-3">
            <div className="flex flex-col gap-10">
              <h2 className="row-span-1">
                Gender <span className="text-red-600">*</span>
              </h2>
              <h2 className="row-span-1">
                Age <span className="text-red-600">*</span>
              </h2>
              <h2 className="row-span-1">
                Activity Level <span className="text-red-600">*</span>
              </h2>
              <h2 className="row-span-1">
                Height (cm) <span className="text-red-600">*</span>
              </h2>
              <h2 className="row-span-1">
                Weight (kg) <span className="text-red-600">*</span>
              </h2>
              <h2 className="row-span-1">BMI</h2>
            </div>
            <div className="col-span-2 flex w-full flex-row justify-between ">
              <div className="flex flex-col w-full gap-10">
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
                  type="number"
                  className="h-8 w-full"
                ></input>
                {errors.age ? (
                  <p className=" text-red-600">{errors.age}</p>
                ) : (
                  ""
                )}
                <select
                  onChange={handleChange}
                  name="activity"
                  className="h-8 w-full"
                  defaultValue={1.2}
                  type="number"
                >
                  <option type="number" value={1.2}>
                    Sedentary
                  </option>
                  <option type="number" value={1.375}>
                    Lightly active
                  </option>
                  <option type="number" value={1.55}>
                    Moderately active
                  </option>
                  <option type="number" value={1.725}>
                    Very active
                  </option>
                  <option type="number" value={1.9}>
                    Super active
                  </option>
                </select>
                {errors.age ? (
                  <p className=" text-red-600">{errors.age}</p>
                ) : (
                  ""
                )}
                <input
                  onChange={handleChange}
                  name="height"
                  type="number"
                  className="h-8 w-full"
                ></input>
                {errors.height ? (
                  <p className=" text-red-600">{errors.height}</p>
                ) : (
                  ""
                )}

                <input
                  onChange={handleChange}
                  name="weight"
                  type="number"
                  className="h-8 w-full"
                ></input>
                {errors.weight ? (
                  <p className=" text-red-600">{errors.weight}</p>
                ) : (
                  ""
                )}

                <input
                  value={bmiValue}
                  disabled
                  type="number"
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
          <button
            // onClick={() => console.log(data)}
            onClick={() =>
              postUserData(
                data.activity,
                data.bmiValue,
                data.height,
                data.weight,
                data.maintenanceCalories,
                user.uid
              )
            }
            className="hover:shadow-gray-900 mt-6 transition-all duration-100 mx-auto hover:shadow-inner active:scale-110 w-2/3 h-10 rounded-full bg-green-700 border-2 border-black text-white font-bold"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
