// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBy7dJyQoUDYc-DS5HKO4A--yfF0oQY2A8",
  authDomain: "comfy-store-62b4e.firebaseapp.com",
  projectId: "comfy-store-62b4e",
  storageBucket: "comfy-store-62b4e.appspot.com",
  messagingSenderId: "900840032694",
  appId: "1:900840032694:web:533fad609e02df30221917",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
