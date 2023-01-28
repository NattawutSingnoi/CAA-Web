import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyChp3XR9L3L2i091STdHUH9jM3pa0OmMcE",
    authDomain: "safetyassessmentapp.firebaseapp.com",
    databaseURL: "https://safetyassessmentapp-default-rtdb.firebaseio.com",
    projectId: "safetyassessmentapp",
    storageBucket: "safetyassessmentapp.appspot.com",
    messagingSenderId: "713522891685",
    appId: "1:713522891685:web:76bb754a280c94a9ccf64c",
    measurementId: "G-DQ27BDC2KK"
  });

export default firebaseConfig;

export const db = getFirestore(firebaseConfig)