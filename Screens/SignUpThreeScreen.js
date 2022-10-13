import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import { useHeaderHeight } from '@react-navigation/elements';
import DropDownPicker from 'react-native-dropdown-picker';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';

const SignUpThreeScreen = ({route}) => {
  const navigation = useNavigation();

    const { signUpUser } = useAuth();
    const { firstName, lastName, email, password, address1, address2, city, state, zipCode } = route.params;

    const [phoneNumber, setPhoneNumber] = useState(null);
    const [dateOfBirth, setDateOfBirth] = useState(null);
    
    const [genderOpen, setGenderOpen] = useState(false);
    const [gender, setGender] = useState(null);
    const [genderItems, setGenderItems] = useState([
        {label: 'Male', value: 'male'},
        {label: 'Female', value: 'female'},
        {label: 'Non-Binary', value: 'nonBinary'},
        {label: 'Transgender', value: 'transgender'},
        {label: 'Prefer not to say', value: 'preferNotToSay'},
    ]);

    const [polAffOpen, setPolAffOpen] = useState(false);
    const [politicalAffiliation, setPoliticalAffiliation] = useState(null);
    const [polAffItems, setPolAffItems] = useState([
        {label: 'Democrat', value: 'democrat'},
        {label: 'Republican', value: 'republican'},
        {label: 'Independent', value: 'independent'},
        {label: 'Other', value: 'other'},
    ]);

    const headerHeight = useHeaderHeight();

    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false
      })
    }, [])

    const registerUser = () => {
        if (phoneNumber && dateOfBirth && gender && politicalAffiliation) {
            signUpUser(email, password, firstName, lastName, address1, address2, city, state, zipCode, phoneNumber, dateOfBirth, gender, politicalAffiliation);
        } else {
            alert("Please fill out all fields!")
        }
        
        
    }

    return (
        <KeyboardAvoidingView style={styles.Container} keyboardVerticalOffset={headerHeight} behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <View style={styles.InputContainer}>
            <Text style={styles.Title}>Tell us more about you!</Text>
            <TextInput
              placeholder='Phone Number'
              style={styles.Input}
              value={phoneNumber}
              onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
    
    
            ></TextInput>
            <TextInput
              placeholder='Date of Birth'
              style={styles.Input}
              value={dateOfBirth}
              onChangeText={(dateOfBirth) => setDateOfBirth(dateOfBirth)}
    
            ></TextInput>

            <DropDownPicker 
                open= {genderOpen}
                value={gender}
                items={genderItems}
                setOpen={setGenderOpen}
                setValue= {setGender}
                setItems={setGenderItems}
                style={styles.Input}
            />
           
           <DropDownPicker 
                open= {polAffOpen}
                value={politicalAffiliation}
                items={polAffItems}
                setOpen={setPolAffOpen}
                setValue= {setPoliticalAffiliation}
                setItems={setPolAffItems}
                style={styles.Input}
            />

          </View>
    
          <View style={styles.ButtonContainer}>
    
            <TouchableOpacity
              onPress={() => registerUser()
              }
              style={styles.Button}
            >
              <Text style={styles.ButtonText}>Finish Sign Up!</Text>
            </TouchableOpacity>
    
    
          </View>
        </KeyboardAvoidingView>
    )
}

export default SignUpThreeScreen

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