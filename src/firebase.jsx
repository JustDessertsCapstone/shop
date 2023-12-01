// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJUHucZWocZDrpEu9UpEOhiBpYXXsAtZY",
  authDomain: "justdesserts-403216.firebaseapp.com",
  projectId: "justdesserts-403216",
  storageBucket: "justdesserts-403216.appspot.com",
  messagingSenderId: "43903682458",
  appId: "1:43903682458:web:ee3d16c6cd619228c09c23",
  measurementId: "G-WKHHRGXL5F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const db = getFirestore(app);

export default db;
export { auth };