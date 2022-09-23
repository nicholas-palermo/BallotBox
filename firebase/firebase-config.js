import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBJpovLRyPo8z_a3bedIggrTwMIrFEFxF8",
  authDomain: "ballotbox-93d61.firebaseapp.com",
  projectId: "ballotbox-93d61",
  storageBucket: "ballotbox-93d61.appspot.com",
  messagingSenderId: "720502254337",
  appId: "1:720502254337:web:2bf4f5398ea76023e2c900",
  measurementId: "G-H3Q9C2DFNX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth(app)

export { auth, db }
