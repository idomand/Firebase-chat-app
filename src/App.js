import React, { useState, useRef } from "react";
import "./App.css";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyCObDTNER18Sf9ek0L7nZcg_0wkCb5F60I",
    authDomain: "react-firebase-chat-app-6121e.firebaseapp.com",
    projectId: "react-firebase-chat-app-6121e",
    storageBucket: "react-firebase-chat-app-6121e.appspot.com",
    messagingSenderId: "845791383557",
    appId: "1:845791383557:web:221e367c522bcf74330c6c",
  });
} else {
  firebase.app(); // if already initialized, use that one
}

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);
  console.log(`user`, user);
  return (
    <div className="App">
      <header>
        <h1>⚛️🔥💬</h1>
        <SignOut />
      </header>

      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}
function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      <p>holy shit this is cool </p>
    </>
  );
}

function SignOut() {
  return (
    auth.currentUser && (
      <button className="sign-out" onClick={() => auth.signOut()}>
        Sign Out
      </button>
    )
  );
}

function ChatRoom() {
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(250);

  const dummy = useRef();

  const [messages] = useCollectionData(query, { idField: "id" });
  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;
    const userFirstName = auth.currentUser.displayName.split(" ")[0];

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      userFirstName: userFirstName,
    });

    setFormValue("");

    dummy.current.scrollIntoView({ behavior: "smooth" });
  };
  // console.log(`messages`, messages);
  return (
    <>
      <main>
        <div>
          {messages &&
            messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        </div>
        <div ref={dummy}></div>
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => {
            setFormValue(e.target.value);
          }}
        />
        <button type="submit">submit</button>
      </form>
    </>
  );
}
const ChatMessage = (props) => {
  const { text, uid, photoURL, userFirstName } = props.message;

  const messageClass = uid === auth.currentUser.uid ? "send" : "received";

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} alt="person" />
      <h1>{userFirstName}</h1>
      <p>{text}</p>
    </div>
  );
};
export default App;
