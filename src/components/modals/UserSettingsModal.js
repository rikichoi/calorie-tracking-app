"use client";
import { React, useContext, useEffect, useState } from "react";
import { UserContext } from "@/lib/store/user-context";
import { authContext } from "@/lib/store/auth-context";
import { useServerInsertedHTML } from "next/navigation";

export default function UserSettingsModal({ show, onClose, selectedDate }) {
  const { user } = useContext(authContext);
  const { userData, postUserData, editUserData } = useContext(UserContext);
  const [errors, setErrors] = useState({});
  const [genderInput, setGenderInput] = useState("");
  const [ageInput, setAgeInput] = useState(0);
  const [heightInput, setHeightInput] = useState(0);
  const [weightInput, setWeightInput] = useState(0);
  const [bmiValue, setBmiValue] = useState(0);
  const [bmiRange, setBmiRange] = useState(null);

  const [data, setData] = useState({
    activity: 1.2,
    bmiValue: "",
    gender: "",
    height: "",
    weight: "",
    age: "",
    maintenanceCalories: "",
  });

  const initialState = {
    activity: 1.2,
    bmiValue: "",
    gender: "",
    height: "",
    weight: "",
    age: "",
    maintenanceCalories: "",
  };

  const handleChange = (e) => {
    if (e.target.type == "number" || e.target.name === "activity") {
      setData({ ...data, [e.target.name]: parseFloat(e.target.value) });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  const validate = () => {
    let errors = {};
    if (!data.gender) {
      errors.gender = "Please select your gender";
    }
    if (!data.age || isNaN(data.age) || data.age < 0) {
      errors.age = "Please enter age in numbers";
    }
    if (!data.height || isNaN(data.height) || data.height < 0) {
      errors.height = "Please enter height in numbers";
    }
    if (!data.weight || isNaN(data.weight) || data.weight < 0) {
      errors.weight = "Please enter in numbers";
    }
    return errors;
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
        setBmiValue(
          parseFloat((data.weight / (data.height / 100) ** 2).toFixed(2))
        );
      }
    };
    calculateBmi();
    validate();
  }, [data.weight, data.height]);

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
      if (
        data.gender &&
        data.gender == "Male" &&
        data.age &&
        data.height &&
        data.weight
      ) {
        let bmr = 10 * data.weight + 6.25 * data.height - 5 * data.age + 5;
        let maintenanceCalories = bmr * data.activity;
        setData({ ...data, maintenanceCalories: maintenanceCalories });
      }
      if (
        data.gender &&
        data.gender == "Female" &&
        data.age &&
        data.height &&
        data.weight
      ) {
        let bmr = 10 * data.weight + 6.25 * data.height - 5 * data.age - 161;
        let maintenanceCalories = bmr * data.activity;
        setData({ ...data, maintenanceCalories: maintenanceCalories });
      }
    };
    calculateMaintenanceCalories();
  }, [
    bmiValue,
    data.height,
    data.weight,
    data.activity,
    data.age,
    data.bmiValue,
  ]);

  useEffect(() => {
    if (userData) {
      setData({
        gender: userData.userGender,
        age: userData.userAge,
        activity: userData.userActivity,
        bmiValue:
          userData.userBmiHistory[userData.userBmiHistory.length - 1].userBmi,
        height: userData.userHeight,
        weight:
          userData.userWeightHistory[userData.userWeightHistory.length - 1]
            .userWeight,
        maintenanceCalories: userData.userMaintenanceCalories,
      });
    }
  }, [userData, show]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = validate();
    if (Object.keys(errors).length) {
      return setErrors(errors);
    }
    if (userData) {
      await editUserData(
        data.gender,
        data.age,
        data.activity,
        bmiValue,
        data.height,
        data.weight,
        data.maintenanceCalories,
        user.uid,
        selectedDate
      );
      // setData(initialState);
    } else {
      await postUserData(
        data.gender,
        data.age,
        data.activity,
        bmiValue,
        data.height,
        data.weight,
        data.maintenanceCalories,
        user.uid
      );
    }
    onClose(!show);
  };

  return (
    <div className="flex flex-col max-h-[71vh] font-poppins ">
      <div className="flex flex-row justify-end p-4">
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
      <div className="flex justify-center font-bold md:text-lg text-3xl mb-10">
        <h1 className="">
          {" "}
          {userData ? (
            <span>Profile Settings</span>
          ) : (
            <span>Set Up Your Profile</span>
          )}
        </h1>
      </div>

      <div className="md:text-sm text-lg mx-auto md:px-2">
        <form onSubmit={handleSubmit} className=" flex flex-col">
          <div className="  flex flex-row">
            <div className="flex flex-col gap-10 ">
              <div className="flex flex-row items-center ">
                <h2 className="max-w-52 w-full ">
                  Gender <span className="text-red-600">*</span>
                </h2>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    checked={data.gender == "Male"}
                    className="h-5 w-5"
                    value={"Male"}
                    onChange={handleChange}
                  ></input>
                  <label className="">Male</label>
                  <input
                    type="radio"
                    name="gender"
                    checked={data.gender == "Female"}
                    className="h-5 w-5"
                    value={"Female"}
                    onChange={handleChange}
                  ></input>
                  <label>Female</label>
                </div>
              </div>

              <div className="flex flex-row items-center ">
                <h2 className=" max-w-52 w-full">
                  Age <span className="text-red-600">*</span>
                </h2>
                <div>
                  <input
                    onChange={handleChange}
                    name="age"
                    value={data.age}
                    type="number"
                    required
                    className="[appearance:textfield]  max-w-20"
                  ></input>
                </div>
              </div>

              <div className="flex flex-row items-center ">
                <h2 className="max-w-52 w-full">
                  Activity Level <span className="text-red-600">*</span>
                </h2>
                <select
                  onChange={handleChange}
                  name="activity"
                  value={data.activity}
                  className=""
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
              </div>

              <div className="flex flex-row items-center ">
                <h2 className="max-w-52 w-full ">
                  Height (cm) <span className="text-red-600">*</span>
                </h2>
                <input
                  onChange={handleChange}
                  name="height"
                  type="number"
                  value={data.height}
                  required
                  className="[appearance:textfield] max-w-20"
                ></input>
              </div>

              <div className="flex flex-row items-center ">
                <h2 className="max-w-52 w-full ">
                  Weight (kg) <span className="text-red-600">*</span>
                </h2>
                <input
                  onChange={handleChange}
                  name="weight"
                  value={data.weight}
                  type="number"
                  required
                  className="[appearance:textfield] max-w-20"
                ></input>
              </div>

              <div className="flex flex-row items-center ">
                <h2 className="max-w-52 w-full ">BMI</h2>

                <input
                  value={bmiValue}
                  disabled
                  type="number"
                  name="bmiValue"
                  className="[appearance:textfield] cursor-not-allowed  max-w-20"
                ></input>
              </div>

              {bmiRange ? (
                <div className="flex justify-center text-center">
                  <h2 className="">
                    Your BMI falls within the {bmiRange} category.
                  </h2>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <button
            // onClick={() => console.log(data)}

            className="hover:shadow-gray-900 my-6 transition-all duration-100 mx-auto hover:shadow-inner active:scale-110 w-2/3 h-10 rounded-full bg-green-700 border-2 border-black text-white font-bold"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
}
