import { KeyboardAvoidingView, Image, TouchableOpacity, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/elements';
import { Ionicons } from '@expo/vector-icons';


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
    <View style={styles.Container}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Login")}>
            <Ionicons name="arrow-back" size={32} color="lightgrey" />
        </TouchableOpacity>
      </View>
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
          onChangeText={(email) => { setEmail(email) }}

        ></TextInput>

        <TextInput
          placeholder='Password'
          style={styles.Input}
          value={password}
          onChangeText={(password) => { setPassword(password) }}
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
          <Text style={{fontWeight: '800', color: 'grey'}}>Already have an account?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={styles.SignUpButton}
          ><Text style={{ textDecorationLine: 'underline', color: 'rgb(83, 159, 231)', fontWeight: '800' }}>Login</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  )
}

export default SignUpOneScreen

const styles = StyleSheet.create({
  Container: {
    height: '100%',
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: 'white'
  },
  backButtonContainer: {
    height: '5%',
    width: '100%'
  },
  InputContainer: {
    height: '35%',
    width: '80%',
    marginTop: 75
  },
  backButton: {
    zIndex: 1,
    position: 'absolute',
    marginTop: 60,
    marginLeft: 20
  },
  Title: {
    fontSize: 30,
    textAlign: 'left',
    paddingBottom: 20,
    fontWeight: '900',
    paddingLeft: 10
  },
  Input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginTop: 5,
    borderColor: "lightgrey",
    borderBottomWidth: 1,
    fontSize: 18
  },
  ButtonContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
  Button: {
      height: 40,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      backgroundColor: 'rgb(220, 230, 240)',
      marginTop: 5,
      marginBottom: 5
  },
  ButtonText: {
    fontWeight: '700',
    color: 'rgb(83, 159, 231)'
  },
  SignUpPrompt: {
    flexDirection: 'row',
    marginTop: 20
  },
  SignUpButton: {
    marginLeft: 5
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