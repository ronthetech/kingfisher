import { getApp, initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  isSignInWithEmailLink,
  onAuthStateChanged,
  sendEmailVerification,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
  signInWithEmailLink,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCjAzxE9sxrpyk0zt2zrTbW3PI9XFrglMM",
  authDomain: "kingfisher-a9dbe.firebaseapp.com",
  projectId: "kingfisher-a9dbe",
  storageBucket: "kingfisher-a9dbe.appspot.com",
  messagingSenderId: "361076513150",
  appId: "1:361076513150:web:270890ac4442120467fb2f",
};

function createFirebaseApp(config) {
  try {
    return getApp();
  } catch {
    return initializeApp(config);
  }
}

const firebaseApp = createFirebaseApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

const createUserEmailPassword = async (txtEmail, txtPassword) => {
  const signUpEmail = txtEmail.value;
  const signUpPassword = txtPassword.value;
  console.log(signUpEmail);

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    signUpEmail,
    signUpPassword,
  );
  console.log(userCredential.user);
};

const signInEmailPassword = async (txtEmail, txtPassword) => {
  const loginEmail = txtEmail.value;
  const loginPassword = txtPassword.value;
  console.log(loginEmail);

  const userCredential = await signInWithEmailAndPassword(
    auth,
    loginEmail,
    loginPassword,
  );
  console.log(userCredential.user);
};

export {
  db,
  auth,
  createUserWithEmailAndPassword,
  isSignInWithEmailLink,
  onAuthStateChanged,
  sendEmailVerification,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
  signInWithEmailLink,
  signOut,
  updateProfile,
};
