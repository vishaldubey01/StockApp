import { initializeApp, getApps, FirebaseApp, getApp } from "firebase/app";
import { initializeAuth, getAuth, Auth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    // measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID,
};

console.log(import.meta.env.VITE_FIREBASE_API_KEY);
// console.log(process.env.VITE_FIREBASE_API_KEY);

let firebaseApp: FirebaseApp;
let firebaseAuth: Auth;
if (getApps().length === 0) {
    firebaseApp = initializeApp(firebaseConfig);
    firebaseAuth = initializeAuth(firebaseApp, {
        // persistence: getReactNativePersistence(AsyncStorage),
    });
} else {
    firebaseApp = getApp();
    firebaseAuth = getAuth();
}
const firebaseStorage = getStorage(firebaseApp);

export { firebaseAuth, firebaseStorage };
export default firebaseApp;
