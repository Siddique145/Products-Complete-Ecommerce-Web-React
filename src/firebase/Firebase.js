import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword,GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7dXUWaZgEuIbSE_mkNc7QwvzjYtqw37k",
  authDomain: "ecommerce-web-30b1b.firebaseapp.com",
  projectId: "ecommerce-web-30b1b",
  storageBucket: "ecommerce-web-30b1b.appspot.com",
  messagingSenderId: "1020695231504",
  appId: "1:1020695231504:web:78cac61013b8b198571e95",
  measurementId: "G-S6HQH047BC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

console.log(app);

export { app, auth, analytics,firestore, db, storage, createUserWithEmailAndPassword,provider, signInWithPopup  };