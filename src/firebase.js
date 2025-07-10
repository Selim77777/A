// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHkvLpagO_54JH_M-iyUI_N6rA_XYrM5M",
  authDomain: "esl-pathway-app.firebaseapp.com",
  projectId: "esl-pathway-app",
  storageBucket: "esl-pathway-app.firebasestorage.app",
  messagingSenderId: "856246997896",
  appId: "1:856246997896:web:da17ae273b0361b70de03d",
  measurementId: "G-5K5R5XC0J2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
