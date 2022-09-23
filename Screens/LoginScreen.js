import { Image, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';


const LoginScreen = () => {

    const navigation = useNavigation();

    const { loginUser } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signInUser = () => {
        loginUser(email, password);
        navigation.navigate("Home");
    }



    return (

    <KeyboardAvoidingView style={styles.Container}>
      
      <View style={styles.LogoContainer}>
        <Image style={styles.Logo} source={require('/Users/nicholas.palermo/Desktop/CSC450/BallotBox/assets/Logo.png')}></Image>
      </View>

      <View style={styles.InputContainer}>
        <TextInput
          placeholder='Email'
          style={styles.Input}
          value={email}
          onChangeText={email => setEmail(email)}


        ></TextInput>
        <TextInput
          placeholder='Password'
          style={styles.Input}
          value={password}
          onChangeText={password => setPassword(password)}
          secureTextEntry = {true}

        ></TextInput>
      </View>

      <View style={styles.ButtonContainer}>

        <TouchableOpacity
          onPress={() => signInUser()}
          style={styles.Button}
        >
          <Text style={styles.ButtonText}>Login</Text>
        </TouchableOpacity>

        <Text style={{ marginTop: 20}}>OR</Text>

        <TouchableOpacity style={styles.Button}>
          <Text style={styles.ButtonText}>Google Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.Button}>
          <Text style={styles.ButtonText}>Apple Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.Button}>
          <Text style={styles.ButtonText}>Facebook Sign In</Text>
        </TouchableOpacity>

        <View style={styles.SignUpPrompt}>
          <Text>Don't have an account yet?</Text>
          <TouchableOpacity 
            onPress={() => navigation.navigate("SignUp")}
            style={styles.SignUpButton}
            ><Text style={{textDecorationLine: 'underline', color: 'blue'}}>Sign Up</Text>
          </TouchableOpacity>
        </View>

      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

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
    marginTop: 5,
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