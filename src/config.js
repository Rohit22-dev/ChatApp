// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDXnjxgWsOc1e86QsPiu2rAyB4wFDPP_9U",
  authDomain: "chatapp-1e7a3.firebaseapp.com",
  projectId: "chatapp-1e7a3",
  storageBucket: "chatapp-1e7a3.appspot.com",
  messagingSenderId: "320343470793",
  appId: "1:320343470793:web:50b65afd522e2876239318",
  measurementId: "G-13P1GPKPCE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);
const db = getFirestore(app);

export { app, auth, provider, storage, db };
