// import { update } from "firebase/database";
// import { auth } from "./Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./Firebase";
// import { auth } from './Firebase';

// import { createUserWithEmailAndPassword, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, updatePassword } from "./Firebase/auth";
// import { sendEmailVerification } from "firebase/auth/cordova";


export const doSignInWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}

// export const doCreateUserWithEmailAndPassword = async (email, password) => {
//     return createUserWithEmailAndPassword(auth, email, password);
// };

// export const doSignInWithEmailAndPassword = (email, password) => {
//     return signInWithEmailAndPassword(auth, email, password);
// }

// export const doSignInWithGoogle = async () => {
//     const provider = new GoogleAuthProvider();
//     const result = await signInWithPopup(auth, provider);
//     // result.user
//     return result;
// }

// export const doSignOut = () => {
//     return auth.signOut();
// };

// export const doPasswordReset = (email) => {
//     return sendPasswordResetEmail(auth, email);
// };


// export const doPasswordChange =(password) => {
//     return updatePassword(auth.currentUser, password);
// }

// export const doSendVerification = () => {
//     return sendEmailVerification(auth.currentUser, {
//         url: `${window.location.origin}/home`,
//     });
// }

















