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
    userActivity,
    userBmi,
    userHeight,
    userWeight,
    userMaintenanceCalories,
    userID
  ) => {
    const newUserData = {
      userID: userID,
      userActivity: userActivity,
      userBmiHistory: [userBmi],
      userHeight: userHeight,
      userWeightHistory: [userWeight],
      userMaintenanceCalories: userMaintenanceCalories,
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
    userActivity,
    userBmi,
    userHeight,
    userWeight,
    userMaintenanceCalories,
    userID
  ) => {
    const collectionRef = collection(db, "userData");
    const docRef = doc(collectionRef, userDataID);
    let newBmiHistory = new Array(userData.userBmiHistory);
    newBmiHistory[0].push(userBmi);
    let newWeightHistory = new Array(userData.userWeightHistory);
    newWeightHistory[0].push(userWeight);
    const newUserData = {
      userID: userID,
      userActivity: userActivity,
      userBmiHistory: newBmiHistory[0],
      userHeight: userHeight,
      userWeightHistory: newWeightHistory[0],
      userMaintenanceCalories: userMaintenanceCalories,
    };
    try {
      await updateDoc(docRef, newUserData)
      toast.success("User Settings Updated Successfully!");
      await getUserData();
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
