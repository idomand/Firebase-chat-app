import React from "react";
import { auth } from "../firebase";

export default function ChatMessage(props) {
  const { text, uid, photoURL, userFirstName } = props.message;

  const messageClass = uid === auth.currentUser.uid ? "send" : "received";

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} alt="person" />
      <h1>{userFirstName}</h1>
      <p>{text}</p>
    </div>
  );
}
