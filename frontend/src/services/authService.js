import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { auth } from "../utils/firebase";

// Sign up a new user
export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Log in an existing user
export const logIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Log out the current user
export const logOut = () => {
  return signOut(auth);
};

// Listen for authentication state changes
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};