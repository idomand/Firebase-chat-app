import React from "react";
import "./App.css";
// eslint-disable-next-line no-unused-vars
import firebaseFunc, { auth } from "./firebase";
/* //!======== MAKE SURE THAT THIS IS OKAY */
import SignIn from "../src/components/SignIn";
import SignOut from "../src/components/SignOut";
import ChatRoom from "../src/components/ChatRoom";

import { useAuthState } from "react-firebase-hooks/auth";

export default function App() {
  const [user] = useAuthState(auth);
  console.log(`user`, user);
  return (
    <div className="App">
      <header>
        <h1>🖥️💬✒️</h1>
        <SignOut />
      </header>

      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}
