import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

firebase.initializeApp({
  apiKey: "AIzaSyC9ZMN7O_qaQ858XZyBA7yt7JiH03AfmNs",
  authDomain: "blogapp-431e3.firebaseapp.com",
  projectId: "blogapp-431e3",
  storageBucket: "blogapp-431e3.appspot.com",
  messagingSenderId: "710576122437",
  appId: "1:710576122437:web:12a613be5ad560a8b7d12c",
  measurementId: "G-9V06FM5V6K",
});

const fb = firebase;

export default fb;
