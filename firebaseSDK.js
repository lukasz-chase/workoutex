import { initializeApp } from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA2papKSVIiOaBWL53o4v_NHkCnrloeDP0",
  authDomain: "workoutex-2254b.firebaseapp.com",
  projectId: "workoutex-2254b",
  storageBucket: "workoutex-2254b.appspot.com",
  messagingSenderId: "592320059643",
  appId: "1:592320059643:web:43c26a0d7b02666a1bf85e",
  measurementId: "G-CB3W0DYSHP",
};

const app = initializeApp(firebaseConfig);

export default app;
