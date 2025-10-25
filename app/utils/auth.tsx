import { auth } from './firebase';
import { sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";

export const sendMagicLink = async (email: string) => {
    const actionCodeSettings = {
      url: 'http://localhost:3000/completeSignIn', // change this later
      handleCodeInApp: true,
};

await sendSignInLinkToEmail(auth, email, actionCodeSettings);
// Save email to localStorage for completing sign-in later
window.localStorage.setItem("emailForSignIn", email);
};

export const completeSignIn = async () => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        // Ask user to input their email if it's not in localStorage
        email = window.prompt("Please enter your email to complete sign-in")!;
      }
      const result = await signInWithEmailLink(auth, email, window.location.href);
      window.localStorage.removeItem("emailForSignIn");
      return result.user;
    }
};