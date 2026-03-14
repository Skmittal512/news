// lib/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from "firebase/storage"; 

// Your Firebase config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyAhZ8FU8oGwmKgimwoRyKnVWoXFUbdlV38",
  authDomain: "studybuddy-d48bb.firebaseapp.com",
  databaseURL: "https://studybuddy-d48bb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "studybuddy-d48bb",
  storageBucket: "studybuddy-d48bb.appspot.com",
  messagingSenderId: "229668529371",
  appId: "1:229668529371:web:dadc6ab1e65b84284898fe",
  measurementId: "G-80SNRCN5F0"
};

// Prevent re-initializing during hot reloads
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;