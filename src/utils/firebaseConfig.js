import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  query,
  orderBy,
  where,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCRd1LUssfmPQwQrw6FAdP_IgszXADMvFA",
  authDomain: "my-custom-extension.firebaseapp.com",
  projectId: "my-custom-extension",
  storageBucket: "my-custom-extension.firebasestorage.app",
  messagingSenderId: "580099700915",
  appId: "1:580099700915:web:e9050b94e2a7d54ae458c6",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
  db,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  query,
  orderBy,
  where,
};
