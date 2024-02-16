import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNkllGzLTXXzpkNPmqKstZQ1jMoMoJsCs",
  authDomain: "olx-clone-6c30c.firebaseapp.com",
  projectId: "olx-clone-6c30c",
  storageBucket: "olx-clone-6c30c.appspot.com",
  messagingSenderId: "1061793869937",
  appId: "1:1061793869937:web:90066fab4ce12ce3b3abd0",
  measurementId: "G-JMZJF8SFE7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
//export const auth = getAuth(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);