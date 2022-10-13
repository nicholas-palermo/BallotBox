import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import { useHeaderHeight } from '@react-navigation/elements';

const SignUpTwoScreen = ({route}) => {
  const navigation = useNavigation();

    const { user, signUpUser } = useAuth();

    const { firstName, lastName, email, password } = route.params;

    const [address1, setAddress1] = useState(null);
    const [address2, setAddress2] = useState(null);
    const [city, setCity] = useState(null);
    const [state, setState] = useState(null);
    const [zipCode, setZipCode] = useState(null);

    const headerHeight = useHeaderHeight();

    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false
      })
    }, [])

    const toSignUpThree = () => {
      if (address1 && city && state && zipCode) {
        navigation.navigate("SignUpThree", {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          address1: address1,
          address2: address2,
          city: city,
          state: state,
          zipCode: zipCode
        })
      } else {
        alert("Please fill out all fields!");
      }
    }

    return (
        <KeyboardAvoidingView style={styles.Container} keyboardVerticalOffset={headerHeight} behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <View style={styles.InputContainer}>
            <Text style={styles.Title}>Where do you live?</Text>
            <TextInput
              placeholder='Street Address'
              style={styles.Input}
              value={address1}
              onChangeText={(address1) => setAddress1(address1)}
    
    
            ></TextInput>
            <TextInput
              placeholder='Apt #, Suite, Floor (optional)'
              style={styles.Input}
              value={address2}
              onChangeText={(address2) => setAddress2(address2)}
    
            ></TextInput>

            <TextInput
              placeholder='City'
              style={styles.Input}
              value={city}
              onChangeText={(city) => {setCity(city)}}
    
            ></TextInput>

            <TextInput
              placeholder='State'
              style={styles.Input}
              value={state}
              onChangeText={(state) => {setState(state)}}

            ></TextInput>

            <TextInput
              placeholder='Zip Code'
              style={styles.Input}
              value={zipCode}
              onChangeText={zipCode => setZipCode(zipCode)}
    
            ></TextInput>
          </View>
    
          <View style={styles.ButtonContainer}>
    
            <TouchableOpacity
              onPress={() => toSignUpThree()}
              style={styles.Button}
            >
              <Text style={styles.ButtonText}>Next</Text>
            </TouchableOpacity>
    
    
          </View>
        </KeyboardAvoidingView>
    )
}

export default SignUpTwoScreen

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