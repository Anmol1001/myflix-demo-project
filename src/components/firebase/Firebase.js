import { initializeApp } from "firebase/app";
import {getFirestore, collection} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC3Q9OrY6nYFyRQqgmPMuXYlaGDLeDqx_Q",
  authDomain: "myflix-9749a.firebaseapp.com",
  projectId: "myflix-9749a",
  storageBucket: "myflix-9749a.appspot.com",
  messagingSenderId: "364539004444",
  appId: "1:364539004444:web:233f7f1639829582d181d9"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const moviesRef = collection(db, "movies")

export default app;