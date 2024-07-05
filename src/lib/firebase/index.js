// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRddrW_vZHxwY3S-jP-yIthHJIF4AkXCk",
  authDomain: "calorie-tracker-61345.firebaseapp.com",
  projectId: "calorie-tracker-61345",
  storageBucket: "calorie-tracker-61345.appspot.com",
  messagingSenderId: "342118702479",
  appId: "1:342118702479:web:f0968c2f6b08ffd321bffa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const storage = getStorage(app);

export {app, db}