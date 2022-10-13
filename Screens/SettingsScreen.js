import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useAuth from '../hooks/useAuth'

const SettingsScreen = () => {

    const { logout } = useAuth();

  return (
    <View>
      <Text>This is the settings screen</Text>
      <Button title="Logout" onPress={logout}></Button>
    </View>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({})