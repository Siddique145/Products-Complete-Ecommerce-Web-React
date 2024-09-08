// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
console.log(app);
export { app, auth, createUserWithEmailAndPassword };
