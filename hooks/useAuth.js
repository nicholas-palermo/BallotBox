import { View, Text } from 'react-native'
import React, { createContext, useContext, useEffect, useState, useMemo } from 'react'

//Firebase Authentication
import { db } from '../firebase/firebase-config';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

  const auth = getAuth();

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
              gender: gender,
              profileImage: 'https://firebasestorage.googleapis.com/v0/b/ballotbox-93d61.appspot.com/o/profilePics%2FemptyProfilePicture.png?alt=media&token=5be01d75-66b1-4e66-b793-d4232b654cab'
          });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(errorCode + ' ' + errorMessage);
          })
          .then(async () => {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
              setUserInfo(docSnap.data());
            } else {
              console.log("Error: Unable to retrieve user data!")
            }
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
          .then(async () => {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
              setUserInfo(docSnap.data());
            } else {
              console.log("Error: Unable to retrieve user data!")
            }
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
    setUserInfo,
    logout
  }), [user, loading, error, userInfo])

  return (
    <AuthContext.Provider value={memoedValue}>
      { !loadingInitial && children }
    </AuthContext.Provider>
  );
}

export default function useAuth() {
    return useContext(AuthContext);
}