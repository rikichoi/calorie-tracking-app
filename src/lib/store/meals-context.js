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

export const MealContext = createContext({
  mealsData: [],
  getUserMealsData: async () => {},
});

export default function MealContextProvider({ children }) {
  const { user } = useContext(authContext);
  const [mealsData, setMealsData] = useState([]);

  const getUserMealsData = async () => {
    const collectionRef = collection(db, "mealLog");
    const q = query(collectionRef, where("uid", "==", user.uid));

    const docsSnap = await getDocs(q);

    const data = docsSnap.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setMealsData(data);
  };

  useEffect(() => {
    if(!user) return;
    getUserMealsData();
  }, [user]);

  return (
    <MealContext.Provider value={{ mealsData, getUserMealsData}}>
      {children}
    </MealContext.Provider>
  );
}
