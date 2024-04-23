import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCK91-g48LlDCSya7zfzmg8X5ZENgejVuo",
  authDomain: "bar-pos-7aef0.firebaseapp.com",
  databaseURL: "https://bar-pos-7aef0-default-rtdb.firebaseio.com",
  projectId: "bar-pos-7aef0",
  storageBucket: "bar-pos-7aef0.appspot.com",
  messagingSenderId: "502872690355",
  appId: "1:502872690355:web:0b4e0e19643c535a9a6ac6",
};

const app = initializeApp(firebaseConfig);

const projectFirestore = getFirestore(app);

const timestamp = serverTimestamp();

export { projectFirestore, timestamp };
