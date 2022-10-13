import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import useAuth from '../hooks/useAuth'
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';

const HomeScreen = () => {

  const { user, userInfo, setUserInfo } = useAuth();

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])

  useEffect(() => {
      fetchUserData(user.uid);
  }, [])
  
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
  

  return (
    <View style={styles.view}>
      <Text>Welcome {userInfo.firstName}!</Text>
      <Button title="toSettings" onPress={() => navigation.navigate("Settings")}></Button>
      <Text></Text>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    view: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
})