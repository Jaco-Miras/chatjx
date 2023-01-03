import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDkWKli5pESsbVRsFA0qEaBmBYV_gmPSI4",
  authDomain: "chatjx-44606.firebaseapp.com",
  projectId: "chatjx-44606",
  storageBucket: "chatjx-44606.appspot.com",
  messagingSenderId: "521248138469",
  appId: "1:521248138469:web:9336caa9d5615d2520600c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
