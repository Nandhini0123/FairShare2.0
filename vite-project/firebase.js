import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "splithubstars.firebaseapp.com",
  projectId: "splithubstars",
  storageBucket: "splithubstars.appspot.com",
  messagingSenderId: "856025492605",
  appId: "1:856025492605:web:2b4682edb83eae5be85514",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
