import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyCwgMcU8lbGvcevss0YqLFnbfzKPzHLQcI",
  authDomain: "chall22.firebaseapp.com",
  databaseURL: "https://chall22-default-rtdb.firebaseio.com/",
  projectId: "chall22",
  storageBucket: "chall22.firebasestorage.app",
  messagingSenderId: "680566849686",
  appId: "1:680566849686:web:fc3cf542957bb54af342b7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const db = getDatabase(app);
const auth = getAuth(app);

// Export the database instance
export { db , auth };



// Import the functions you need from the SDKs you need

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// const firebaseConfig = {
//   apiKey: "AIzaSyCwgMcU8lbGvcevss0YqLFnbfzKPzHLQcI",
//   authDomain: "chall22.firebaseapp.com",
//   projectId: "chall22",
//   storageBucket: "chall22.firebasestorage.app",
//   messagingSenderId: "680566849686",
//   appId: "1:680566849686:web:fc3cf542957bb54af342b7",
//   measurementId: "G-2RJQF1G6QH"
// };

// Initialize Firebase

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);