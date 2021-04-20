import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCObDTNER18Sf9ek0L7nZcg_0wkCb5F60I",
  authDomain: "react-firebase-chat-app-6121e.firebaseapp.com",
  projectId: "react-firebase-chat-app-6121e",
  storageBucket: "react-firebase-chat-app-6121e.appspot.com",
  messagingSenderId: "845791383557",
  appId: "1:845791383557:web:221e367c522bcf74330c6c",
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
} else {
  firebase.app(); 
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
