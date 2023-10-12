import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDGyx_yjYxswKkZgFm_XbUQD-o8OHHQf50",
  authDomain: "firebaes-login.firebaseapp.com",
  projectId: "firebaes-login",
  storageBucket: "firebaes-login.appspot.com",
  messagingSenderId: "529188114499",
  appId: "1:529188114499:web:5710d134bc140a137404f6"
};

const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
