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
} from "firebase/firestore";

export const UserContext = createContext({
  userData: [],
  setUserData: () => {},
  postUserData: async () => {},
});

export default function UserContextProvider({ children }) {
  const { user } = useContext(authContext);
  const [userData, setUserData] = useState([]);

  // TODO: Create getUserData, postUserData, putUserData, deleteUserData functions
  
  const getUserData = async () => {
    const collectionRef = collection(db, "userData");
    let q = query(collectionRef, where("userID", "==", user.uid));
    const docsSnap = await getDocs(q);
    //   const docsSnap = await getDocs(collectionRef);
    const data = docsSnap.docs.map((doc) => {
      return {
        ...doc.data(),
      };
    });
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
      userBmiHistory: userBmi,
      userHeight: userHeight,
      userWeightHistory: userWeight,
      userMaintenanceCalories: userMaintenanceCalories,
    };
    const collectionRef = collection(db, "userData");
    try {
      const docSnap = await addDoc(collectionRef, newUserData);
      // toast.success("User logged successfully!");

      // calorieRef.current.value = "";
      // proteinRef.current.value = "";
      // fatRef.current.value = "";
      // carbRef.current.value = "";
      // mealNameRef.current.value = "";
      // weightRef.current.value = "";
      await getUserData();
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(userData);

  return (
    <UserContext.Provider value={{ userData, setUserData, postUserData }}>
      {children}
    </UserContext.Provider>
  );
}
