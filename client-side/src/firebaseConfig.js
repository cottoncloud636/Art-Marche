// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "art-marche.firebaseapp.com",
  projectId: "art-marche",
  storageBucket: "art-marche.appspot.com",
  messagingSenderId: "669183754389",
  appId: "1:669183754389:web:facce90713a28bfb3bdb9c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);