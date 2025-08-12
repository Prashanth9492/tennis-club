// Re-export everything from firebaseConfig.ts to avoid duplicate initialization
export { default as app, db, storage, rtdb } from '../firebaseConfig';
// If you need auth or analytics, import and initialize them in your component using the exported app instance.