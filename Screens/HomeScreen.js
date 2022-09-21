import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CurrentRenderContext } from '@react-navigation/native'

const HomeScreen = () => {
  return (
    <View style={styles.view}>
      <Text>HomeScreen</Text>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    view: {
        justifyContent: 'center',
        alignContent: 'center',
        flex: 1
    }
})