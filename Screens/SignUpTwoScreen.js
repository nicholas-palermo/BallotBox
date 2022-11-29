import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import { useHeaderHeight } from '@react-navigation/elements';
import { Ionicons } from '@expo/vector-icons';

const SignUpTwoScreen = ({ route }) => {
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
    <View style={styles.Container} keyboardVerticalOffset={headerHeight} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("SignUpOne")}>
          <Ionicons name="arrow-back" size={32} color="lightgrey" />
        </TouchableOpacity>
      </View>
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
          onChangeText={(city) => { setCity(city) }}

        ></TextInput>

        <TextInput
          placeholder='State'
          style={styles.Input}
          value={state}
          onChangeText={(state) => { setState(state) }}

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
    </View>
  )
}

export default SignUpTwoScreen

const styles = StyleSheet.create({
  Container: {
    height: '100%',
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: 'white',
  },
  backButtonContainer: {
    height: '5%',
    width: '100%'
  },
  InputContainer: {
    height: '35%',
    width: "80%",
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