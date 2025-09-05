import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDn48Tb2b0R0J5edZCiRE55kr7478t53ns",
  authDomain: "chatroom-2008.firebaseapp.com",
  databaseURL: "https://chatroom-2008-default-rtdb.firebaseio.com",
  projectId: "chatroom-2008",
  storageBucket: "chatroom-2008.appspot.com",
  messagingSenderId: "437095183283",
  appId: "1:437095183283:web:5e3f3e3d30404abe"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();