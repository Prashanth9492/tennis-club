import { initializeApp, getApps } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Validate required Firebase config
if (!firebaseConfig.projectId) {
  console.error('Firebase PROJECT_ID is missing. Check your .env file.');
}

if (!firebaseConfig.databaseURL) {
  console.error('Firebase DATABASE_URL is missing. Check your .env file.');
}


// Initialize Firebase only if no apps are already initialized
let app;
let db;
let storage;
let rtdb;

try {
  app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  db = getFirestore(app);
  storage = getStorage(app);
  rtdb = getDatabase(app);
  console.log('✅ Firebase initialized successfully');
} catch (error) {
  console.error('❌ Firebase initialization error:', error);
  // Create fallback app for development
  app = null;
  db = null;
  storage = null;
  rtdb = null;
}

export default app;
export { db, storage, rtdb };
