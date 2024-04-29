import { firebaseAuth } from "../../src/firebase/FirebaseConfig";
import { createContext, useContext, useEffect, useState } from "react";
import { IAuth, LoginFormValues, UserFormValues } from "../interfaces";
import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
    FirebaseSignIn,
    FirebaseSignOut,
    FirebaseSignUp,
} from "../firebase/AuthService";
import toast, { Toaster } from "react-hot-toast";
import { trpcDirect, User } from "../config/api";

const AuthContext = createContext<IAuth>({
    user: null,
    loading: false,
    SignIn: () => {},
    SignUp: () => {},
    SignOut: () => {},
    refetchUserData: () => Promise.resolve(),
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

    //Sign up
    const SignUp = async (creds: UserFormValues) => {
        try {
            setIsLoading(true);
            const userCredential = await FirebaseSignUp(creds);
            const firebaseUser = userCredential.user;
            if (firebaseUser) {
                const userData =
                    await trpcDirect.user.createNewUserIfRequired.mutate({
                        firstName: creds.firstName,
                        lastName: creds.lastName,
                    });
                setUser({
                    ...userData.data,
                    id: firebaseUser.uid,
                    email: firebaseUser.email!,
                });
            } else {
                setIsLoading(false);
            }
        } catch (error: any) {
            console.error(error);
            if (error.code === "auth/email-already-in-use") {
                toast("Email has already has an account. Please login.");
            } else if (error.code === "auth/too-many-requests") {
                toast("Sorry, something went wrong. Please try again later.");
            } else {
                toast("Sorry, something went wrong. Please try again later.");
            }
            setIsLoading(false);
        }
    };

    //Sign in
    const SignIn = async (creds: LoginFormValues) => {
        try {
            setIsLoading(true);
            const userCredential = await FirebaseSignIn(creds);
            const firebaseUser = userCredential.user;
            if (firebaseUser) {
                const userData = await trpcDirect.user.getCurrentUser.query();
                setUser({
                    ...userData,
                    id: firebaseUser.uid,
                    email: firebaseUser.email!,
                });
            } else {
                setIsLoading(false);
            }
        } catch (error: any) {
            console.error(error);
            console.error(JSON.stringify(error, null, 2));
            console.error(error.code);
            if (error.code == "auth/wrong-password") {
                toast("Incorrect password entered. Please try again.");
            } else if (error.code == "auth/invalid-credential") {
                console.log("HERE");
                toast("Incorrect email/password entered. Please try again.");
            } else if (error.code == "auth/too-many-requests") {
                toast("Sorry, something went wrong. Please try again later.");
            } else {
                toast("Sorry, something went wrong. Please try again later.");
            }
            setIsLoading(false);
        }
    };

    //Sign out
    const SignOut = async () => {
        setIsLoading(true);
        try {
            await FirebaseSignOut();
            setUser(null);
            // navigate("/signin", { replace: true });
        } catch (error) {
            setIsLoading(false);
            //show error alert
        }
    };

    const refetchUserData = React.useCallback(async () => {
        const userData = await trpcDirect.user.getCurrentUser.query();
        setUser(() => ({
            ...userData,
            id: firebaseAuth.currentUser!.uid!,
            email: firebaseAuth.currentUser!.email!,
        }));
    }, []);

    useEffect(() => {
        //onAuthStateChanged check if the user is still logged in or not
        const unsubscribe = onAuthStateChanged(
            firebaseAuth,
            async (firebaseUser) => {
                if (firebaseUser) {
                    const userDataFromDb =
                        await trpcDirect.user.getCurrentUser.query();
                    const uid = firebaseUser.uid;
                    const email = firebaseUser.email;
                    setUser({
                        ...userDataFromDb,
                        id: uid,
                        email: email!,
                    });
                } else {
                    setUser(null);
                }
                setIsAuthLoading(false);
            }
        );
        return unsubscribe;
    }, []);

    //create Auth Values
    const authValues: IAuth = {
        user: user,
        loading: isLoading,
        SignIn,
        SignUp,
        SignOut,
        refetchUserData,
    };

    //If loading for the first time when visiting the page
    if (isAuthLoading) return <h3>Loading</h3>;

    return (
        <AuthContext.Provider value={authValues}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
