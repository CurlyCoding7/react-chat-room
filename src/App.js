import { useState, useEffect } from "react";
import { app } from "./firebase";
import Home from "./pages/Home";
import Login from "./pages/Login";

import {
  onAuthStateChanged,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

const auth = getAuth(app);
const db = getFirestore(app);

const loginHandler = () => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider);
};

const logoutHandler = () => {
  signOut(auth);
};

function App() {
  const [user, setUser] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "Messages"), orderBy("createdAt", "asc"));

    const unsubscribe = onAuthStateChanged(auth, (data) => {
      setUser(data);
    });

    const unsubForMsg = onSnapshot(q, (snap) => {
      setMessages(
        snap.docs.map((item) => {
          const id = item.id;
          return { id, ...item.data() };
        })
      );
    });

    return () => {
      unsubscribe();
      unsubForMsg();
    };
  }, []);

  const sendHandler = async () => {
    try {
      await addDoc(collection(db, "Messages"), {
        text: message,
        uid: user.uid,
        url: user.photoURL,
        createdAt: serverTimestamp(),
      });

      setMessage("");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="App">
      {user ? (
        <Home
          logoutHandler={logoutHandler}
          sendHandler={sendHandler}
          message={message}
          setMessage={setMessage}
          messages={messages}
          setMessages={setMessages}
          user={user}
        />
      ) : (
        <Login loginHandler={loginHandler} />
      )}
    </div>
  );
}

export default App;
