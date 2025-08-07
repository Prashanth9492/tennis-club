import { initializeApp, getApps } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAVm8p2H4_BWoK4Ul-HEaFFoc3qLOv9KGU",
  authDomain: "cricket-9924d.firebaseapp.com",
  databaseURL: "https://cricket-9924d-default-rtdb.firebaseio.com",
  projectId: "cricket-9924d",
  storageBucket: "cricket-9924d.appspot.com",
  messagingSenderId: "600545395656",
  appId: "1:600545395656:web:ae1084561c44a51e71b6fd",
  measurementId: "G-WHD3L65E76"
};


// Initialize Firebase only if no apps are already initialized

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const rtdb = getDatabase(app);
