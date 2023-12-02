const { initializeApp } = require("firebase/app");
const { getDatabase } = require("firebase/database");

const firebaseConfig = {
  apiKey: "AIzaSyAaJFGXGnH3MMNXFpwQGj3dmU7KnHo5R_k",
  authDomain: "astra-bcf1a.firebaseapp.com",
  databaseURL: "https://astra-bcf1a-default-rtdb.firebaseio.com",
  projectId: "astra-bcf1a",
  storageBucket: "astra-bcf1a.appspot.com",
  messagingSenderId: "659053178326",
  appId: "1:659053178326:web:a4361d7b0f6ad040b88877",
  measurementId: "G-003NE1MSG4"
};

// Initialize Firebase
const app1 = initializeApp(firebaseConfig);
const db = getDatabase(app1);

module.exports = db;