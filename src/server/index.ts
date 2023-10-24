import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAiIktHS3q7a15dV9NIYsRBd3_cxDs-Q5E",
  authDomain: "raiddemo-ee237.firebaseapp.com",
  databaseURL:
    "https://raiddemo-ee237-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "raiddemo-ee237",
  storageBucket: "raiddemo-ee237.appspot.com",
  messagingSenderId: "649490409928",
  appId: "1:649490409928:web:46fcdd51facd351fb038fd",
  measurementId: "G-X8JFV8NMVG",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage(firebaseApp);
storage.maxUploadRetryTime = 3000;

export { db, storage };
