import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "Your API Key",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your project Id",
  storageBucket: "your-app-name.appspot.com",
  messagingSenderId: "Your ID",
  appId: "Your app Id",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
