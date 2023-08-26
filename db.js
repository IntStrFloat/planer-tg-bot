// Import the functions you need from the SDKs you need
const { initializeApp,firebase  } = require("firebase/app");
const { getAnalytics } = require("firebase/analytics");
const { getFirestore, collection, getDocs } = require('firebase/firestore/lite');
require('dotenv').config()
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId
  }

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
module.exports = {db}