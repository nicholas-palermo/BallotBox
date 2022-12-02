import { StyleSheet, Text, View, StatusBar, Image, TouchableOpacity, Button, ScrollView, Linking } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import React from 'react'
import { useState, useLayoutEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import call from 'react-native-phone-call';
import BottomDrawer from 'react-native-bottom-drawer-view'
import CacheImage from '../Components/CacheImage';
import ReadMore from 'react-native-read-more-text';


const CandidateProfileScreen = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const [official, setOfficial] = useState({
        firstName: route.params.firstName,
        lastName: route.params.lastName,
        party: route.params.party,
        inOffice: route.params.inOffice,
        title: route.params.title,
        candidatePhoto: route.params.candidatePhoto,
        campaignSiteURL: route.params.campaignSiteURL,
        gender: route.params.gender,
        subtitle: route.params.subtitle,
        district: route.params.district,
        phoneNumber: route.params.phoneNumber,
        email: route.params.email,
        bio: route.params.bio
    })
    const [expanded, setExpanded] = useState(false)
    const [bioExpanded, setBioExpanded] = useState(false)

    const args = {
        number: official.phoneNumber, // String value with the number to call
        prompt: true, // Optional boolean property. Determines if the user should be prompted prior to the call 
        skipCanOpen: false // Skip the canOpenURL check
    }

    const _renderTruncatedFooter = (handlePress) => {
        return (
          <Text style={{color: (official.party === "Democrat" ? 'rgb(83, 159, 231)' : 'red'), marginTop: 5, textAlign: 'left', fontSize: 16,
          fontWeight: '400',}} onPress={handlePress}>
            Read More
          </Text>
        );
      }
     
    const _renderRevealedFooter = (handlePress) => {
        return (
          <Text style={{color: (official.party === "Democrat" ? 'rgb(83, 159, 231)' : 'red'), marginTop: 5, textAlign: 'left', fontSize: 16,
          fontWeight: '400',}} onPress={handlePress}>
            Show Less
          </Text>
        );
      }
     
    const _handleTextReady = () => {
        // ...
      }


    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    return (
        <>
            <StatusBar
                animated={true}
                backgroundColor="white"
                barStyle="light-content"
            />
            <View style={styles.viewContainer}>
                <View style={styles.view}>
                    <View style={styles.coverPhotoContainer}>
                        <CacheImage style={expanded ? styles.coverPhotoExpanded : styles.coverPhotoCollapsed} uri={official.candidatePhoto } />
                    </View>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={32} color="lightgrey" />
                    </TouchableOpacity>
                    <BottomDrawer
                        containerHeight={775}
                        startUp={false}
                        downDisplay={300}
                        roundedEdges={true}
                        onExpanded={() => setExpanded(true)}
                        onCollapsed={() => setExpanded(false)}
                    >
                        <ScrollView contentContainerStyle={{alignItems: 'center', paddingBottom: 100}} style={styles.profileContainer}>
                            <View style={{ width: 50, height: 5, backgroundColor: 'lightgrey', marginTop: 5, borderRadius: 25 }}></View>
                            <TouchableOpacity style={{top: 30, height: '100%', width: '100%'}}>
                                <View style={styles.header}>
                                    <Text style={styles.name}>{official.firstName} {official.lastName}</Text>
                                    {official.title && <Text style={styles.position}>{official.title}, {official.district}{official.subtitle && <>, {official.subtitle}</>}</Text>}
                                    <Text style={official.party === 'Democrat' ? styles.partyDem : official.party === 'Republican' ? styles.partyRepub : styles.partyInd}>{official.party}</Text>
                                </View>
                                <View style={styles.actionButtonContainer}>
                                    <TouchableOpacity style={[official.party === 'Democrat' ? styles.actionButtonDem : official.party === 'Republican' ? styles.actionButtonRepub : styles.actionButtonInd, official?.phoneNumber ? {display: 'flex'} : {display: 'flex'}]} onPress={() => call(args).catch(console.error)}><Text style={official.party === 'Democrat' ? styles.actionButtonTextDem : official.party === 'Republican' ? styles.actionButtonTextRepub : styles.actionButtonTextInd}>Call</Text></TouchableOpacity>
                                    <TouchableOpacity style={[official.party === 'Democrat' ? styles.actionButtonDem : official.party === 'Republican' ? styles.actionButtonRepub : styles.actionButtonInd, official?.email ? {display: 'flex'} : {display: 'none'}]} onPress={() => {if (official.email !== null) {Linking.openURL(`mailto:${official.email}`)}}}><Text style={official.party === 'Democrat' ? styles.actionButtonTextDem : official.party === 'Republican' ? styles.actionButtonTextRepub : styles.actionButtonTextInd}>Email</Text></TouchableOpacity>
                                    <TouchableOpacity style={[official.party === 'Democrat' ? styles.actionButtonDem : official.party === 'Republican' ? styles.actionButtonRepub : styles.actionButtonInd, official.campaignSiteURL ? {display: 'flex'} : {display: 'none'}]} onPress={() => Linking.openURL(official.campaignSiteURL)}><Text style={official.party === 'Democrat' ? styles.actionButtonTextDem : official.party === 'Republican' ? styles.actionButtonTextRepub : styles.actionButtonTextInd}>Website</Text></TouchableOpacity>
                                </View>
                                <View style={styles.infoContainer}>
                                    <View style={styles.sectionContainer}>
                                        <Text style={styles.sectionHeading}>Biography</Text>
                                        <ReadMore numberOfLines={15} renderTruncatedFooter={_renderTruncatedFooter} renderRevealedFooter={_renderRevealedFooter} onReady={_handleTextReady}>
                                            <Text style={styles.sectionText}>{official.bio}</Text>
                                        </ReadMore>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </ScrollView>
                    </BottomDrawer>
                </View>
            </View>

            {/* style={styles.sectionText} seeMoreStyle={{color: 'blue', fontWeight: '600', marginLeft: 0, width: 40, textDecorationLine: 'underline'}} seeMoreText={"More"} ellipsis={'...'} */}
        </>
    )
}

export default CandidateProfileScreen

const styles = StyleSheet.create({
    viewContainer: {
        height: '100%',
        width: '100%'
    },
    profileContainer: {
        zIndex: 1,
        height: '100%',
        top: -50,
        backgroundColor: 'white',
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        shadowColor: 'rgb(100,100,100)',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 1,
        shadowRadius: 4,
    },
    view: {
        height: '100%',
        width: '100%'
    },
    coverPhotoContainer: {
        height: 450,
        width: '100%',
        zIndex: 0,
        backgroundColor: 'black'
    },
    coverPhotoExpanded: {
        width: null,
        height: '100%',
        zIndex: 0,
        opacity: 0.3
    },
    coverPhotoCollapsed: {
        width: null,
        height: '100%',
        zIndex: 0
    },
    backButton: {
        zIndex: 1,
        position: 'absolute',
        marginTop: 60,
        marginLeft: 20
    },
    header: {
        height: 90,
        width: '100%',
        paddingLeft: 35

    },
    name: {
        fontSize: 40,
        fontWeight: '800'
    },
    position: {
        fontSize: 16,
        fontWeight: '700'
    },
    partyDem: {
        fontSize: 15,
        fontWeight: '600',
        textTransform: 'uppercase',
        color: 'rgb(83, 159, 231)',
        marginTop: 3
    },
    partyRepub: {
        fontSize: 15,
        fontWeight: '600',
        textTransform: 'uppercase',
        color: 'red',
        marginTop: 3
    },
    partyInd: {
        fontSize: 15,
        fontWeight: '600',
        textTransform: 'uppercase',
        color: 'purple',
        marginTop: 3
    },
    actionButtonContainer: {
        flexDirection: 'row',
        height: 40,
        justifyContent: 'center'
    },
    actionButtonDem: {
        height: 40,
        width: 115,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'rgb(210, 220, 235)',
        marginRight: 5,
        marginLeft: 5
    },
    actionButtonRepub: {
        height: 40,
        width: 115,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'rgb(235, 210, 210)',
        marginRight: 5,
        marginLeft: 5
    },
    actionButtonInd: {
        height: 40,
        width: 115,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'rgb(225, 210, 225)',
        marginRight: 5,
        marginLeft: 5
    },
    actionButtonTextDem: {
        fontWeight: '700',
        color: 'rgb(83, 159, 231)'
    },
    actionButtonTextRepub: {
        fontWeight: '700',
        color: 'red'
    },
    actionButtonTextInd: {
        fontWeight: '700',
        color: 'purple'
    },
    infoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        top: 25
    }, 
    sectionContainer: {
        width: '95%',
        marginLeft: 35,
        paddingRight: 35
    },
    sectionHeading: {
        textAlign: 'left',
        fontSize: 30,
        fontWeight: '800',
        marginBottom: 10
    },
    sectionText: {
        fontSize: 16,
        fontWeight: '300',
        marginLeft: 35,
        marginRight: 30
    }
})  