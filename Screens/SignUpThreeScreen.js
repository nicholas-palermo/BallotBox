import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import { useHeaderHeight } from '@react-navigation/elements';
import DropDownPicker from 'react-native-dropdown-picker';
import { Ionicons } from '@expo/vector-icons';


const SignUpThreeScreen = ({ route }) => {
  const navigation = useNavigation();

  const { signUpUser } = useAuth();
  const { firstName, lastName, email, password, address1, address2, city, state, zipCode } = route.params;

  const [phoneNumber, setPhoneNumber] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(null);

  const [genderOpen, setGenderOpen] = useState(false);
  const [gender, setGender] = useState(null);
  const [genderItems, setGenderItems] = useState([
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Non-Binary', value: 'nonBinary' },
    { label: 'Transgender', value: 'transgender' },
    { label: 'Prefer not to say', value: 'preferNotToSay' },
  ]);

  const [polAffOpen, setPolAffOpen] = useState(false);
  const [politicalAffiliation, setPoliticalAffiliation] = useState(null);
  const [polAffItems, setPolAffItems] = useState([
    { label: 'Democrat', value: 'democrat' },
    { label: 'Republican', value: 'republican' },
    { label: 'Independent', value: 'independent' },
    { label: 'Other', value: 'other' },
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
    <View style={styles.Container} keyboardVerticalOffset={headerHeight} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("SignUpTwo", {firstName: firstName, lastName: lastName, email: email, password: password})}>
            <Ionicons name="arrow-back" size={32} color="lightgrey" />
        </TouchableOpacity>
      </View>
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
          open={genderOpen}
          value={gender}
          items={genderItems}
          setOpen={setGenderOpen}
          setValue={setGender}
          setItems={setGenderItems}
          style={styles.dropDownInput}
          placeholder="Gender"
          containerProps={{
            height: genderOpen === true ? 250 : null
          }}
          dropDownContainerStyle={{
            borderColor: 'lightgrey',
            borderRadius: 0,
            zIndex: 10
          }}
          listItemLabelStyle={{
            color: 'black',
            fontSize: 18,
          }}
          selectedItemLabelStyle={{
            fontWeight: '600'
          }}
        />

        <DropDownPicker
          open={polAffOpen}
          value={politicalAffiliation}
          items={polAffItems}
          setOpen={setPolAffOpen}
          setValue={setPoliticalAffiliation}
          setItems={setPolAffItems}
          style={{
            borderColor: 'white',
            borderBottomColor: 'lightgrey',
            borderRadius: 0,
            labelStyle: {
              color:'red'
            }
          }}
          placeholder="Political Affiliation"
          containerProps={{
            height: polAffOpen === true ? 220 : null
          }}
          dropDownContainerStyle={{
            borderColor: 'lightgrey',
            borderRadius: 0
          }}
          listItemLabelStyle={{
            color: 'black',
            fontSize: 18,
          }}
          selectedItemLabelStyle={{
            fontWeight: '600'
          }}
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
    </View>
  )
}

export default SignUpThreeScreen

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
  dropDownInput: {
    borderColor: 'white',
    borderBottomColor: 'lightgrey',
    borderRadius: 0,
    color: 'lightgrey'
  },
  ButtonContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center"
  },
  Button: {
      height: 40,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      backgroundColor: 'rgb(220, 230, 240)',
      marginTop: 20
  },
  ButtonText: {
    fontWeight: '700',
    color: 'rgb(83, 159, 231)'
  }

})