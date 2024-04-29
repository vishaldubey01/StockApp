import React, { useState } from "react";
import { useAuth } from "../store/AuthContext";
import { trpcDirect } from "../config/api";

const LoginSignUpPage = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const { SignIn, SignUp } = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSignUp) {
            await SignUp({ email, password, firstName, lastName });
        } else {
            await SignIn({ email, password });
            await trpcDirect.user.getCurrentUser.query();
        }
    };

    return (
        <body className='flex justify-center'>
            <div className='min-h-screen flex items-center justify-center'>
                <div className='w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10'>
                    <div className='text-center'>
                        <h2 className='mt-6 text-3xl font-bold text-gray-900'>
                            {isSignUp ? "Sign Up" : "Login"}
                        </h2>
                    </div>
                    <form className='space-y-6' onSubmit={handleSubmit}>
                        <input
                            type='email'
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Email'
                            required
                            className='w-full px-3 py-2 border border-gray-300 rounded-md'
                        />
                        <input
                            type='password'
                            name='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Password'
                            required
                            className='w-full px-3 py-2 border border-gray-300 rounded-md'
                        />
                        {isSignUp && (
                            <div className='flex-row w-full'>
                                <input
                                    type='text'
                                    name='firstName'
                                    value={firstName}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                    placeholder='First Name'
                                    className='px-3 py-2 border border-gray-300 rounded-md mr-2'
                                />

                                <input
                                    type='text'
                                    name='lastName'
                                    value={lastName}
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                    placeholder='Last Name'
                                    className='px-3 py-2 border border-gray-300 rounded-md'
                                />
                            </div>
                        )}
                        <button
                            type='submit'
                            className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        >
                            {isSignUp ? "Sign Up" : "Login"}
                        </button>
                        <button
                            type='button'
                            onClick={() => setIsSignUp(!isSignUp)}
                            className='w-full flex justify-center py-2 px-4 border-transparent rounded-md text-md font-medium text-indigo-600 bg-transparent'
                        >
                            {isSignUp
                                ? "Already have an account? Login"
                                : "Don't have an account? Sign Up"}
                        </button>
                    </form>
                </div>
            </div>
        </body>
    );
};

export default LoginSignUpPage;
