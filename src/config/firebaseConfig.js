import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9t0x2at_W_HdfXHBwiznfj-GVwDwGb5c",
  authDomain: "fir-auth-41fc3.firebaseapp.com",
  projectId: "fir-auth-41fc3",
  storageBucket: "fir-auth-41fc3.appspot.com", // Fixed storage bucket URL
  messagingSenderId: "832028839151",
  appId: "1:832028839151:web:f1458b0d890eff161e1f1a",
  measurementId: "G-LM803DXR17",
};

// Check if Firebase is already initialized
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const auth = getAuth(app); // Initialize Firebase Auth
const analytics = getAnalytics(app); // Initialize Firebase Analytics (optional)

export { auth, analytics };
