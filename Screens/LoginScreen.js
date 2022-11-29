import { Image, KeyboardAvoidingView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, Appearance, useColorScheme } from 'react-native'
import React, { useState, useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';


const LoginScreen = () => {

  const navigation = useNavigation();

  const { loginUser } = useAuth();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const theme = useColorScheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])

  const signInUser = () => {
    if (email === null) {
      alert("Please enter a valid email address!")
    } else if (!(password.length >= 8)) {
      alert("Please enter a valid password!")
    } else {
      loginUser(email, password);
    }

  }

  return (

    <KeyboardAvoidingView style={[ theme === 'dark' ? darkStyles.Container : lightStyles.Container ]}>

      <StatusBar
        animated={true}
        backgroundColor="white"
        barStyle="dark-content"
      />

      <View style={[ theme === 'dark' ? darkStyles.LogoContainer : lightStyles.LogoContainer ]}>
        <Image style={[ theme === 'dark' ? darkStyles.Logo : lightStyles.Logo ]} source={require('/Users/nicholas.palermo/Desktop/CSC450/BallotBox/assets/logo.png')}></Image>
      </View>

      <View style={[ theme === 'dark' ? darkStyles.InputContainer : lightStyles.InputContainer ]}>
        <TextInput
          placeholder='Email'
          style={[ theme === 'dark' ? darkStyles.Input : lightStyles.Input ]}
          value={email}
          onChangeText={email => setEmail(email)}


        ></TextInput>
        <TextInput
          placeholder='Password'
          style={[ theme === 'dark' ? darkStyles.Input : lightStyles.Input ]}
          value={password}
          onChangeText={password => setPassword(password)}
          secureTextEntry={true}

        ></TextInput>
      </View>

      <View style={[ theme === 'dark' ? darkStyles.ButtonContainer : lightStyles.ButtonContainer ]}>

        <TouchableOpacity
          onPress={() => signInUser()}
          style={[ theme === 'dark' ? darkStyles.Button : lightStyles.Button ]}
        >
          <Text style={[ theme === 'dark' ? darkStyles.ButtonText : lightStyles.ButtonText ]}>Login</Text>
        </TouchableOpacity>

        <Text style={{ marginTop: 20, marginBottom: 20 }}>OR</Text>

        <TouchableOpacity style={[ theme === 'dark' ? darkStyles.Button : lightStyles.Button ]}>
          <Text style={[ theme === 'dark' ? darkStyles.ButtonText : lightStyles.ButtonText ]}>Google Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[ theme === 'dark' ? darkStyles.Button : lightStyles.Button ]}>
          <Text style={[ theme === 'dark' ? darkStyles.ButtonText : lightStyles.ButtonText ]}>Apple Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[ theme === 'dark' ? darkStyles.Button : lightStyles.Button ]}>
          <Text style={[ theme === 'dark' ? darkStyles.ButtonText : lightStyles.ButtonText ]}>Facebook Sign In</Text>
        </TouchableOpacity>

        <View style={[ theme === 'dark' ? darkStyles.SignUpPrompt : lightStyles.SignUpPrompt ]}>
          <Text style={{ fontWeight: '800', color: 'grey' }}>Don't have an account yet?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignUpOne")}
            style={[ theme === 'dark' ? darkStyles.SignUpButton : lightStyles.SignUpButton ]}
          ><Text style={{ textDecorationLine: 'underline', color: 'rgb(83, 159, 231)', fontWeight: '800' }}>Sign Up</Text>
          </TouchableOpacity>
        </View>

      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const lightStyles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'white'
  },
  InputContainer: {
    width: "80%"
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
    marginTop: 20,
  },
  SignUpButton: {
    marginLeft: 5,
  },
  LogoContainer: {

  },
  Logo: {
    width: 300,
    height: 300,
    resizeMode: 'stretch'
  }

})

const darkStyles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgb(25,25,25)'
  },
  InputContainer: {
    width: "80%"
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
    marginTop: 20,
  },
  SignUpButton: {
    marginLeft: 5,
  },
  LogoContainer: {

  },
  Logo: {
    width: 300,
    height: 300,
    resizeMode: 'stretch'
  }

})