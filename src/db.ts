// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, onValue } from 'firebase/database';
import { getFirestore } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD04Q_li0PI_iYkz2rEEvkZ_CbB_QqltFQ",
    authDomain: "ppt-online-f631a.firebaseapp.com",
    projectId: "ppt-online-f631a",
    storageBucket: "ppt-online-f631a.firebasestorage.app",
    messagingSenderId: "997870272203",
    appId: "1:997870272203:web:74cd845bb37f507749a54e"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const dbFirestore = getFirestore(app)
console.log(dbFirestore);
