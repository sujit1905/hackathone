// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics"; // optional

const firebaseConfig = {
  apiKey: "AIzaSyBn1Innr_5qqPap58wkrLy-kx9q_ghzps4",
  authDomain: "dnica-eventhub.firebaseapp.com",
  projectId: "dnica-eventhub",
  storageBucket: "dnica-eventhub.firebasestorage.app",
  messagingSenderId: "314293793048",
  appId: "1:314293793048:web:285c36c5e2b7aa53c6ae6d",
  measurementId: "G-V0E1BJ0856",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); // optional, not needed for auth

// *** THESE ARE WHAT LOGIN.JSX NEEDS ***
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
