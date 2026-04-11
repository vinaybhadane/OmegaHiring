import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./config";

const provider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Login Error:", error);
  }
};