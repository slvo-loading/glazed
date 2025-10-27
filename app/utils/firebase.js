// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApuZiZ4N_5MC5aFKVBWjZSqwXl6J1cbaw",
  authDomain: "glazed-b5372.firebaseapp.com",
  projectId: "glazed-b5372",
  storageBucket: "glazed-b5372.firebasestorage.app",
  messagingSenderId: "1020586515551",
  appId: "1:1020586515551:web:a51a846abcf6bfc3590fea",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };