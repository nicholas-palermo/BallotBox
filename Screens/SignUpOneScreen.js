import { KeyboardAvoidingView, Image, TouchableOpacity, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import { useHeaderHeight } from '@react-navigation/elements';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';


const SignUpOneScreen = () => {

    const navigation = useNavigation();

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);


    const headerHeight = useHeaderHeight();

    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false
      })
    }, [])

    const toSignUpTwo = (() => {
      if (firstName !== null && lastName !== null && email !== null & password !== null) {
        if (password === confirmPassword) {
          navigation.navigate("SignUpTwo", {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
          })
        } else {
          alert("Passwords do not match!")
        }
      } else {
        alert("Please fill out all fields!")
      }
    })

    return (
        <KeyboardAvoidingView style={styles.Container} keyboardVerticalOffset={headerHeight} behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <View style={styles.InputContainer}>
            <Text style={styles.Title}>Get Started!</Text>
            <TextInput
              placeholder='First Name'
              style={styles.Input}
              value={firstName}
              onChangeText={(firstName) => setFirstName(firstName)}
    
    
            ></TextInput>
            <TextInput
              placeholder='Last Name'
              style={styles.Input}
              value={lastName}
              onChangeText={(lastName) => setLastName(lastName)}
    
            ></TextInput>

            <TextInput
              placeholder='Email'
              style={styles.Input}
              value={email}
              onChangeText={(email) => {setEmail(email)}}
    
            ></TextInput>

            <TextInput
              placeholder='Password'
              style={styles.Input}
              value={password}
              onChangeText={(password) => {setPassword(password)}}
              secureTextEntry

            ></TextInput>

            <TextInput
              placeholder='Confirm Password'
              style={styles.Input}
              value={confirmPassword}
              onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
              secureTextEntry
    
            ></TextInput>
          </View>
    
          <View style={styles.ButtonContainer}>
    
            <TouchableOpacity
              onPress={() => toSignUpTwo()}
              style={styles.Button}
            >
              <Text style={styles.ButtonText}>Next</Text>
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

export default SignUpOneScreen

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  InputContainer: {
    width: "90%"
  },
  Title: {
    fontSize: "25px",
    textAlign: 'center',
    paddingBottom: 20
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