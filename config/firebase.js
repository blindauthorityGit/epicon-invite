import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, setDoc, addDoc } from "firebase/firestore/lite";
import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.NEXT_FIREBASE,
    authDomain: "epicon-79988.firebaseapp.com",
    projectId: "epicon-79988",
    storageBucket: "epicon-79988.appspot.com",
    messagingSenderId: "285477271889",
    appId: "1:285477271889:web:272572e2e50ec40e36fb70",
    measurementId: "G-01F2QD533M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };
