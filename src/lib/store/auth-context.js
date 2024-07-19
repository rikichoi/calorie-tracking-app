'use client'

import { createContext } from "react";

import {auth} from '@/lib/firebase'
import { GoogleAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {useAuthState} from 'react-firebase-hooks/auth'
import { useRouter } from "next/navigation";

export const authContext = createContext({
    user:null,
    leading: false,
    googleLoginHandler: async () => {},
    signupWithEmailPassword: async (email, password) => {},
    emailPasswordLoginHandler: async (email, password) => {},
    logout: async () => {}
});

export default function AuthContextProvider({children}){
    const [user, loading] = useAuthState(auth);

    const googleProvider = new GoogleAuthProvider(auth);

    const googleLoginHandler = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
        } catch (error) {
            throw error
        }
    };

    const signupWithEmailPassword = async (email, password) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            .then((cred)=>{

            }
        )
        } catch (error) {
            throw error
        }
    };

    const emailPasswordLoginHandler = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            .then((cred)=>{
                
            }
        )
        } catch (error) {
            throw error
        }
    };

    const logout = () => {
        signOut(auth);
    };


    const values = {
        user,
        loading,
        googleLoginHandler,
        signupWithEmailPassword,
        emailPasswordLoginHandler,
        logout
    };
    return <authContext.Provider value={values}>{children}</authContext.Provider>
}