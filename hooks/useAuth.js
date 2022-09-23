import { View, Text } from 'react-native'
import React, { createContext, useContext, useEffect, useState } from 'react'

//Firebase Authentication
import { auth } from '../firebase/firebase-config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const signUpUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            setUser(userCredential.user);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          });
  }
  
  const loginUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in 
            setUser(userCredential.user);
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          });
  }
  


  return <AuthContext.Provider value={{ 
    user: user,
    signUpUser,
    loginUser
    }}>{ children }</AuthContext.Provider>
}

export default function useAuth() {
    return useContext(AuthContext);
}