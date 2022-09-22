import { KeyboardAvoidingView, Image, TouchableOpacity, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const SignUpScreen = () => {

    const navigation = useNavigation();

    return (

      <KeyboardAvoidingView style={styles.Container}>
        <View style={styles.LogoContainer}>
          <Image style={styles.Logo} source={require('/Users/nicholas.palermo/Desktop/CSC450/BallotBox/assets/Logo.png')}></Image>
        </View>
        <View style={styles.InputContainer}>
          <TextInput
            placeholder='First Name'
            style={styles.Input}
            // value={ }
            // onChange={text => }
  
  
          ></TextInput>
          <TextInput
            placeholder='Last Name'
            style={styles.Input}
            // value={ }
            // onChange={text => }
  
          ></TextInput>

          <TextInput
            placeholder='Email'
            style={styles.Input}
            // value={ }
            // onChange={text => }
  
          ></TextInput>

          <TextInput
            placeholder='Username'
            style={styles.Input}
            // value={ }
            // onChange={text => }
  
          ></TextInput>

          <TextInput
            placeholder='Password'
            style={styles.Input}
            // value={ }
            // onChange={text => }
            secureTextEntry

          ></TextInput>

          <TextInput
            placeholder='Confirm Password'
            style={styles.Input}
            // value={ }
            // onChange={text => }
  
          ></TextInput>
        </View>
  
        <View style={styles.ButtonContainer}>
  
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            style={styles.Button}
          >
            <Text style={styles.ButtonText}>Sign Up!</Text>
          </TouchableOpacity>
  
          <View style={styles.SignUpPrompt}>
            <Text>Already have an account?</Text>
            <TouchableOpacity 
              onPress={() => navigation.navigate("Login")}
              style={styles.SignUpButton}
              ><Text style={{textDecorationLine: 'underline', color: 'blue'}}>Login</Text>
            </TouchableOpacity>
          </View>
  
        </View>
      </KeyboardAvoidingView>
    )
}

export default SignUpScreen

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  InputContainer: {
    width: "90%"
  },
  Input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 6,
    marginTop: 15,
    borderColor: "lightgrey",
    borderWidth: 1
  },
  ButtonContainer: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
  Button: {
    backgroundColor: "#04306B",
    width: "100%",
    paddingVertical: 10,
    borderRadius: 40,
    alignItems: "center",
    marginTop: 20
  },
  ButtonText: {
    color: "white"
  },
  SignUpPrompt: {
    flexDirection: 'row',
    marginTop: 30
  },
  SignUpButton: {
    marginLeft: 2,
  },
  LogoContainer: {
    marginBottom: 40,
    marginLeft: 20
  },
  Logo: {
    width: 200,
    height: 220,
    resizeMode: 'stretch'
  }

})