import React, { createContext, useContext, useEffect, useState } from "react";
import { authContext } from "./auth-context";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  where,
  query,
  FieldValue,
  updateDoc
} from "firebase/firestore";
import { toast } from "react-toastify";

export const UserContext = createContext({
  userData: [],
  setUserData: () => {},
  postUserData: async () => {},
  editUserData: async () => {},
});

export default function UserContextProvider({ children }) {
  const { user } = useContext(authContext);
  const [userData, setUserData] = useState([]);
  const [userDataID, setUserDataID] = useState("");

  // TODO: Create getUserData, postUserData, putUserData, deleteUserData functions
  
  const getUserData = async () => {
    const collectionRef = collection(db, "userData");
    let q = query(collectionRef, where("userID", "==", user.uid));
    const docsSnap = await getDocs(q);
    //   const docsSnap = await getDocs(collectionRef);
    let dataID = docsSnap.docs.map((doc) => {
      return doc.id;
    });
    let data = docsSnap.docs.map((doc) => {
      return {
        ...doc.data(),
      };
    });
    setUserDataID(dataID[0]);
    setUserData(data[0]);
  };
  
  useEffect(() => {
    if (!user) return;
    getUserData();
  }, [user]);

  const postUserData = async (
    userGender,
    userAge,
    userActivity,
    userBmi,
    userHeight,
    userWeight,
    userMaintenanceCalories,
    userID,
  ) => {
    const newUserData = {
      userID: userID,
      userGender: userGender,
      userAge: userAge,
      userActivity: userActivity,
      userBmiHistory: [{userBmi: userBmi, createdAt: new Date()}],
      userHeight: userHeight,
      userWeightHistory: [{userWeight: userWeight, createdAt: new Date()}],
      userMaintenanceCalories: userMaintenanceCalories,
      createdAt: new Date()
    };
    const collectionRef = collection(db, "userData");
    try {
      const docSnap = await addDoc(collectionRef, newUserData);
      toast.success("User Settings Saved");

      await getUserData();
    } catch (error) {
      console.log(error.message);
    }
  };

  const editUserData = async (
    userGender,
    userAge,
    userActivity,
    userBmi,
    userHeight,
    userWeight,
    userMaintenanceCalories,
    userID,
    selectedDate,
  ) => {
    const collectionRef = collection(db, "userData");
    const docRef = doc(collectionRef, userDataID);
    let newBmiHistory = new Array(userData.userBmiHistory);
    newBmiHistory[0].push({userBmi, createdAt:selectedDate});
    let newWeightHistory = new Array(userData.userWeightHistory);
    newWeightHistory[0].push({userWeight, createdAt:selectedDate});
    const newUserData = {
      userID: userID,
      userGender: userGender,
      userAge: userAge,
      userActivity: userActivity,
      userBmiHistory: newBmiHistory[0],
      userHeight: userHeight,
      userWeightHistory: newWeightHistory[0],
      userMaintenanceCalories: userMaintenanceCalories,
      createdAt: selectedDate
    };
    try {
      await updateDoc(docRef, newUserData)
      toast.success("User Settings Updated Successfully!");
      await getUserData();
      console.log(newWeightHistory);
      // setErrors({});
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <UserContext.Provider value={{ userData, setUserData, postUserData, editUserData }}>
      {children}
    </UserContext.Provider>
  );
}
