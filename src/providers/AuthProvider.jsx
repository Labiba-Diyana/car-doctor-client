/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from '../firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);
const provider = new GoogleAuthProvider()

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const singInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const singOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const singINWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            // console.log(currentUser);
            setLoading(false);
            if(currentUser && currentUser.email){
                const loggedUser = {
                    email: currentUser.email
                }
                fetch('https://car-doctor-server-eight-dusky.vercel.app/jwt', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(loggedUser)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            localStorage.setItem('car-access-token', data.token);
    
                        })
            }
            else{
                localStorage.removeItem('car-access-token');
            }
        });
        return () => {
            return unsubscribe();
        }
    },[])

    const authInfo = {
        user,
        loading,
        createUser,
        singInUser,
        singOut,
        singINWithGoogle
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;