import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAVm8p2H4_BWoK4Ul-HEaFFoc3qLOv9KGU",
  authDomain: "cricket-9924d.firebaseapp.com",
  projectId: "cricket-9924d",
  storageBucket: "cricket-9924d.appspot.com",
  messagingSenderId: "600545395656",
  appId: "1:600545395656:web:ae1084561c44a51e71b6fd",
  measurementId: "G-WHD3L65E76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;