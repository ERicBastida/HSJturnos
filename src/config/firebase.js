import firebase from 'firebase/app'
import 'firebase/firestore';

// Your web app's Firebase configuration
firebase.initializeApp(
  {
   apiKey: "AIzaSyB_mus3hgGlbCaN-BbxrGNuSYRQJn5e4Gg",
   authDomain: "turnovacunacionfederacion.firebaseapp.com",
   projectId: "turnovacunacionfederacion",
   storageBucket: "turnovacunacionfederacion.appspot.com",
   messagingSenderId: "78734930995",
   appId: "1:78734930995:web:d4d17b8624156fdc249f46",
   measurementId: "G-VQCDVVWM99"
 }
)
// Initialize Firebase
export const db = firebase.firestore();