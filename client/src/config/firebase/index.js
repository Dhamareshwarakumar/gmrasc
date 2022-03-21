import { initializeApp } from 'firebase/app';


let firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API,
    authDomain: "gmrasc.firebaseapp.com",
    projectId: "gmrasc",
    storageBucket: "gmrasc.appspot.com",
    messagingSenderId: "538022937976",
    appId: "1:538022937976:web:7aa03c4b41a5236750b48d"
}

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;

