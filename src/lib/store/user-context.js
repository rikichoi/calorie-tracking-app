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
});

export default function UserContextProvider({ children }) {
  const { user } = useContext(authContext);
  const [userData, setUserData] = useState([]);

  // TODO: Create getUserData, postUserData, putUserData, deleteUserData functions
  useEffect(() => {
    const getUserData = async () => {
      const collectionRef = collection(db, "userData");
      let q = query(
        collectionRef,
        where("userID", "==", "oHJR25TMC1SASTiKMyNnjV5ZMLx1")
      );
      const docsSnap = await getDocs(q);
    //   const docsSnap = await getDocs(collectionRef);
      const data = docsSnap.docs.map((doc) => {
        return {
          ...doc.data()
        };
      });
      setUserData(data[0]);
    };
    getUserData();
  }, []);

  console.log(userData);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}
