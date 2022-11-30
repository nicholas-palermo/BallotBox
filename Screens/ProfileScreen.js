import { StyleSheet, Text, View, Image, TouchableHighlight, TouchableOpacity, ScrollView } from 'react-native';
import useAuth from '../hooks/useAuth';
import { useState, useEffect } from 'react';
import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import { uploadBytesResumable, ref, getDownloadURL, getStorage } from "firebase/storage";
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import PollingPlaceButton from '../Components/PollingPlaceButton';
import BottomDrawer from 'react-native-bottom-drawer-view';


const ProfileScreen = () => {

    const { user, userInfo, setUserInfo } = useAuth();
    const [profileImage, setProfileImage] = useState(null);
    const [profilePicture, setProfilePicture] = useState(userInfo.profileImage);
    const [loading, setloading] = useState(true);

    const storage = getStorage();

    const pickImageAsync = async () => {
        console.log("Picking Image")
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsMultipleSelection: false
        })

        if (!result.cancelled) {
            console.log(result);
            setProfileImage(result);
            uploadProfilePhoto(result);
        } else {
            alert('You did not select any image.')
        }
    }

    const uploadProfilePhoto = async (profileImage) => {
        const response = await fetch(profileImage.uri)
        const blob = await response.blob();

        // Upload file and metadata to the object 'images/mountains.jpg'
        const storageRef = ref(storage, 'profilePics/' + userInfo.id);

        const uploadTask = uploadBytesResumable(storageRef, blob);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        console.log("ERROR: You do not have permission to access this object.")
                        break;
                    case 'storage/canceled':
                        console.log("ERROR: Upload cancelled.")
                        break;
                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        console.log("ERROR: Unknown error. Please check error.serverResponse.")
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setProfilePicture(downloadURL)
                    updateDoc(doc(db, 'users', user.uid), {
                        profileImage: downloadURL
                    });
                });
            }
        );
    }

    useEffect(() => {
        if (userInfo.profileImage) {
            setProfilePicture(userInfo.profileImage)
            setloading(false)
        }




    }, [])

    return (
        <View style={styles.view}>
            <TouchableHighlight style={
                userInfo.politicalAffiliation === 'Democrat' ?
                    [styles.profileImgContainer, { borderColor: 'rgb(83, 159, 231)' }] :
                    userInfo.politicalAffiliation === 'Republican' ?
                        [styles.profileImgContainer, { borderColor: 'red' }] :
                        [styles.profileImgContainer, { borderColor: 'purple' }]
            } onPress={() => pickImageAsync()}>
                <Image style={styles.profileImg} source={{ uri: profilePicture }} />
            </TouchableHighlight>

            <Text style={styles.name}>{userInfo.firstName} {userInfo.lastName}</Text>
            <View style={{ flexDirection: 'row' }}>
                <Ionicons name="ios-location-outline" size={17} color="rgb(125,125,125)" />
                <Text style={styles.city}>{userInfo.city}, {userInfo.state}</Text>
            </View>


            <BottomDrawer
                containerHeight={875}
                startUp={false}
                downDisplay={200}
                roundedEdges={true}
                style={styles.profileInfoContainer}
            >
                <View style={styles.profileInfoInnerContainer}>
                <View style={{ width: 50, height: 5, backgroundColor: 'lightgrey', marginTop: 5, borderRadius: 25 }}></View>
                    <View style={styles.profileHeading}>
                        <View style={[styles.sectionIconContainer, { backgroundColor: 'rgb(217, 242, 255)' }]}>
                            <Ionicons style={styles.sectionIcon} name="person" size={16} color="rgb(26, 119, 244)" />
                        </View>
                        <Text style={styles.profileHeadingLabel}>
                            Personal Information
                        </Text>
                    </View>
                    <View style={styles.personalInfo}>
                        <View style={styles.profileInfoLabelContainer}>
                            <Text style={styles.profileSubHeadingLabel}>Legal Name</Text>
                            <Text style={styles.profileSubHeadingLabel}>Preferred Name</Text>
                            <Text style={styles.profileSubHeadingLabel}>Email</Text>
                            <Text style={styles.profileSubHeadingLabel}>Birthday</Text>
                        </View>
                        <View style={styles.profileInfoContentContainer}>
                            <Text style={styles.profileSubHeading}>{userInfo.firstName} {userInfo.lastName}</Text>
                            <Text style={styles.profileSubHeading}>{userInfo.preferredName} {userInfo.lastName}</Text>
                            <Text style={styles.profileSubHeading}>{userInfo.email}</Text>
                            <Text style={styles.profileSubHeading}>{userInfo.dateOfBirth}</Text>
                        </View>
                    </View>
                    <View style={styles.profileHeading}>
                        <View style={[styles.sectionIconContainer, { backgroundColor: 'rgb(235, 210, 210)' }]}>
                            <MaterialIcons name="how-to-vote" size={16} color="rgb(255,75,75)" />
                        </View>
                        <Text style={styles.profileHeadingLabel}>
                            Voter Information
                        </Text>
                    </View>
                    <View style={styles.voterInfo}>
                        <View style={styles.profileInfoLabelContainer}>
                            <Text style={[styles.profileSubHeadingLabel, { height: 35 }]}>Address</Text>
                            <Text style={styles.profileSubHeadingLabel}>Status</Text>
                            <Text style={styles.profileSubHeadingLabel}>Voter ID</Text>
                            <Text style={styles.profileSubHeadingLabel}>Party</Text>
                            <Text style={[styles.profileSubHeadingLabel, { marginTop: 5, marginBottom: 10 }]}>Districts</Text>
                            <Text style={[styles.profileSubHeadingLabel, { marginLeft: 50, fontSize: 16 }]}>Congressional</Text>
                            <Text style={[styles.profileSubHeadingLabel, { marginLeft: 50, fontSize: 16 }]}>Senate</Text>
                            <Text style={[styles.profileSubHeadingLabel, { marginLeft: 50, fontSize: 16 }]}>Assembly</Text>
                            <Text style={[styles.profileSubHeadingLabel, { marginTop: 10, marginBottom: 0 }]}>Polling Location</Text>
                        </View>
                        <View style={styles.profileInfoContentContainer}>
                            <Text style={[styles.profileSubHeading, { height: 35 }]}>{userInfo.address1} {"\n"}{userInfo.city}, {userInfo.state} {userInfo.zipCode}</Text>
                            <Text style={styles.profileSubHeading}>{userInfo.registered ? 'Active' : 'Inactive'}</Text>
                            <Text style={styles.profileSubHeading}>{userInfo.voterSerialNumber}</Text>
                            <Text style={styles.profileSubHeading}>{userInfo.politicalAffiliation}</Text>
                            <Text style={[styles.profileSubHeading, { marginTop: 5, marginBottom: 13 }]}></Text>
                            <Text style={[styles.profileSubHeading, { fontSize: 16 }]}>{userInfo.state}-{userInfo.votingDistricts.congressional}</Text>
                            <Text style={[styles.profileSubHeading, { fontSize: 16 }]}>{userInfo.votingDistricts.senate}</Text>
                            <Text style={[styles.profileSubHeading, { fontSize: 16 }]}>{userInfo.votingDistricts.assembly}</Text>
                        </View>
                        <View style={{ width: '110%' }}>
                            <PollingPlaceButton userInfo={userInfo}></PollingPlaceButton>
                        </View>
                    </View>
                </View>
            </BottomDrawer>




            <View style={styles.profileDetails}>

            </View>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
        flex: 1
    },
    profileImg: {
        height: '95%',
        aspectRatio: 1,
        borderRadius: 75

    },
    profileImgContainer: {
        height: 130,
        aspectRatio: 1,
        marginBottom: 10,
        marginTop: 30,
        borderRadius: 90,
        borderWidth: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    name: {
        fontSize: 25,
        fontWeight: '700'

    },
    city: {
        fontSize: 17,
        fontWeight: '600',
        marginTop: 2,
        color: 'rgb(125,125,125)'
    },
    profileInfoContainer: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        width: '100%',
        height: '100%',
        marginTop: 25,
        backgroundColor: 'white',
        shadowColor: 'grey',
        shadowOffset: {
            height: -2,
            width: 0
        },
        shadowRadius: 10,
        shadowOpacity: 0.3,
        alignItems: 'center'
    },
    profileInfoInnerContainer: {
        width: '100%', 
        height: '100%', 
        alignItems: 'center', 
        zIndex: 5, 
        borderRadius: 20, 
        backgroundColor: 'white', 
        top: -15,
        shadowColor: 'grey',
        shadowOffset: {
            height: -2,
            width: 0
        },
        shadowRadius: 10,
        shadowOpacity: 0.3,
    },
    personalInfo: {
        width: '90%',
        flexDirection: 'row'
    },
    voterInfo: {
        width: '90%',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    profileHeading: {
        flexDirection: 'row',
        width: '90%',
        marginTop: 20,
        alignItems: 'center',
        marginBottom: 10
    },
    profileHeadingLabel: {
        fontSize: 20,
        fontWeight: '900',
        width: '80%',
        textAlign: 'left',
        width: '60%'
    },
    sectionIconContainer: {
        width: 30,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginEnd: 10
    },
    sectionIcon: {
        width: 16
    },
    profileSubHeading: {
        marginLeft: 5,
        fontSize: 17,
        marginBottom: 5,
        fontWeight: '600'
    },
    profileSubHeadingLabel: {
        fontWeight: '700',
        fontSize: 17,
        marginBottom: 5,
        marginLeft: 40,
        color: 'grey'
    },
    profileInfoContentContainer: {
        width: '57%'
    },
    profileInfoLabelContainer: {
        width: '43%',
        flexWrap: 'wrap'
    }
})