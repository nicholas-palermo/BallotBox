import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import useAuth from '../hooks/useAuth'
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

const HomeScreen = () => {

  const { user, userInfo } = useAuth();

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])

  useEffect(() => {
      console.log(user);
  }, [])
  
  
  

  return (
    <View style={styles.view}>
      <Text>Homescreen</Text>
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