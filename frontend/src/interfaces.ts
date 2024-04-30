import { RouterOutput, User } from "../src/config/api"; //type User import

export interface LoginFormValues {
    email: string;
    password: string;
}

export interface UserFormValues {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

// Firebase Auth Context
export interface IAuth {
    user: User | null; //type User comes from db
    loading: boolean;
    SignIn: (creds: LoginFormValues) => void;
    SignUp: (creds: UserFormValues) => void;
    SignOut: () => void;
    refetchUserData: () => Promise<void>;
}

export type Stock = RouterOutput["user"]["getStocks"][number];
