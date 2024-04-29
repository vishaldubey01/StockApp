import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    setPersistence,
    browserLocalPersistence,
} from "firebase/auth";
import { firebaseAuth } from "./FirebaseConfig";
import { LoginFormValues, UserFormValues } from "../interfaces";

setPersistence(firebaseAuth, browserLocalPersistence);

//Sign in functionality
export const FirebaseSignIn = async ({ email, password }: LoginFormValues) => {
    const result = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
    );
    return result;
};

//Sign up functionality
export const FirebaseSignUp = async ({ email, password }: UserFormValues) => {
    const result = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
    );
    return result;
};

//Sign out functionality
export const FirebaseSignOut = async () => {
    await signOut(firebaseAuth);
};
