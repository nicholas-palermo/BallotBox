import { View, Text } from 'react-native'
import React, { createContext, useContext, useEffect, useState, useMemo } from 'react'

//Firebase Authentication
import { auth, db } from '../firebase/firebase-config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(
    () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          //Logged in...
          const userData = fetchUserData(user.uid);
          setUser(user);
  
        } else {
          //Not Logged in...
          setUser(null);
        }

        setLoadingInitial(false)
      })
    }, 
    []
  );

  const fetchUserData = async(uid) => {
    try {
      const userRef = doc(db, "users", uid);
      
      await getDoc(userRef)
        .then((snapshot) => {
          //MARK: Success
          if(snapshot.exists){
            setUserInfo(snapshot.data())
          } else {
            alert("NO USER FOUND")
          }
        })

    } catch (error) {
      console.log("error", error);
    }
  };
  

  const signUpUser = (
    email, 
    password, 
    firstName, 
    lastName, 
    address1, 
    address2, 
    city, 
    state, 
    zipCode, 
    phoneNumber, 
    dateOfBirth, 
    gender, 
    politicalAffiliation
    ) => {
    setLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            setUser(userCredential.user)
            setDoc(doc(db, 'users', userCredential.user.uid), {
              id: userCredential.user.uid,
              firstName: firstName,
              lastName: lastName,
              email: email,
              phoneNumber: phoneNumber,
              address1: address1,
              address2: address2,
              city: city,
              zipCode: zipCode,
              state: state,
              politicalAffiliation: politicalAffiliation,
              dateOfBirth: dateOfBirth,
              gender: gender
          });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(errorCode + ' ' + errorMessage);
          })
          .finally(() => setLoading(false));
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
            setError(errorCode + ' ' + errorMessage);
          })
          .finally(() => setLoading(false));
  }

  const logout = () => {
    setLoading(true);

    signOut(auth)
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }
  
  const memoedValue = useMemo(() => ({
    user: user,
    userInfo: userInfo,
    loading,
    error,
    signUpUser,
    loginUser,
    logout
  }), [user, loading, error])

  return (
    <AuthContext.Provider value={memoedValue}>
      { !loadingInitial && children }
    </AuthContext.Provider>
  );
}

export default function useAuth() {
    return useContext(AuthContext);
}