// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBKKEv-eAQ76wM8F0nRMfDqXzFK9r_HMl4",
  authDomain: "chats-app-1291e.firebaseapp.com",
  projectId: "chats-app-1291e",
  storageBucket: "chats-app-1291e.appspot.com",
  messagingSenderId: "819982351425",
  appId: "1:819982351425:web:8de9d71710e6da36bc9ac0",
  measurementId: "G-Y0P2TP4S5E"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

 const auth = getAuth(app);
const firestore = getFirestore(app)

export {auth, firestore}

