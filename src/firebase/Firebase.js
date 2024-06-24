// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtdGYNt1WlZldC-TgwCSKEfgy1VgooX8k",
  authDomain: "chat-app-cd87f.firebaseapp.com",
  projectId: "chat-app-cd87f",
  storageBucket: "chat-app-cd87f.appspot.com",
  messagingSenderId: "553366297442",
  appId: "1:553366297442:web:452cecd82648381ba9aa3b",
  measurementId: "G-H4B81R3XHL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };