// // Import the functions you need from the Firebase SDKs
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics"; // optional, only if you want analytics

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_APIKEY,
//   authDomain: import.meta.env.VITE_AUTHDOMAIN,
//   projectId: import.meta.env.VITE_PROJECTID,
//   storageBucket: import.meta.env.VITE_STORAGEBUCKET,
//   messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
//   appId: import.meta.env.VITE_APPID,
//   measurementId: import.meta.env.VITE_MEASUREMENTID // optional, but recommended
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Optional: initialize analytics
// const analytics = getAnalytics(app);

// // Initialize Firebase Authentication and export it
// export const auth = getAuth(app);
// export default app;




// Import Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase config from environment variables (Vite)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
};

// Basic validation to help catch misconfiguration early
const missingKeys = Object.entries(firebaseConfig)
  .filter(([, v]) => !v)
  .map(([k]) => k);

if (missingKeys.length) {
  // eslint-disable-next-line no-console
  console.error(
    "Firebase configuration missing required keys:",
    missingKeys.join(", "),
    "- Check your Vite env variables (e.g., .env or .env.local)"
  );
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase auth instance
export const auth = getAuth(app);
