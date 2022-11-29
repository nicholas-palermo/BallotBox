import { Button, StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import useAuth from '../hooks/useAuth'
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';

const SettingsScreen = () => {

    const { logout } = useAuth();

    const navigation = useNavigation()

    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false
      })
    }, [])

  return (
    <SafeAreaView>
      <View>
        <Text>Account Settings</Text>
        <Button title='toProfile' onPress={() => navigation.navigate("Profile")}>Profile</Button>
      </View>
      <Button title="Logout" onPress={logout}></Button>
    </SafeAreaView>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({})