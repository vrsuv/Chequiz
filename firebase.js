import firebase from "firebase";
// Import the functions you need from the SDKs you need

/*
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
*/

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwPFfriOuPO5zbkjZM-ciZC1eJ9CkgmeI",
  authDomain: "chequiz-eafe3.firebaseapp.com",
  projectId: "chequiz-eafe3",
  storageBucket: "chequiz-eafe3.appspot.com",
  messagingSenderId: "407469539400",
  appId: "1:407469539400:web:b29aae1904159dd007987d"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth()

export { auth };
