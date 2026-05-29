import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "./config";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const provider = new GoogleAuthProvider();

export const saveUserToFirestore = async (user: any) => {
  if (!user) return;
  try {
    await setDoc(
      doc(db, "users", user.uid),
      {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        lastLogin: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error("Error saving user to Firestore:", error);
  }
};

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result?.user;
  } catch (error) {
    console.error("Login Error:", error);
  }
};