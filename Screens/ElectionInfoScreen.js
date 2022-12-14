import { StyleSheet, Text, View, StatusBar, ScrollView, Image, TouchableOpacity, TouchableHighlight } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useState, useLayoutEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Timestamp } from 'firebase/firestore';
import BottomDrawer from 'react-native-bottom-drawer-view';
import PollingPlaceButton from '../Components/PollingPlaceButton';
import useAuth from '../hooks/useAuth';
import { BlurView } from 'expo-blur';
import CacheImage from '../Components/CacheImage';

const ElectionInfoScreen = () => {

    const { userInfo } = useAuth();
    const navigation = useNavigation();
    const route = useRoute()
    const [election, setElection] = useState({
        candidates: route.params.candidates,
        date: route.params.date,
        district: route.params.district,
        office: route.params.office,
        earlyVoting: route.params.earlyVoting,
        incumbent: route.params.incumbent,
        level: route.params.level,
        type: route.params.type,
        votingPeriod: route.params.votingPeriod
    })
    const [expanded, SetExpanded] = useState(false);

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
                        <View style={styles.coverPhoto1Container}>
                            <CacheImage style={expanded ? styles.coverPhoto1Expanded : styles.coverPhoto1Collapsed} uri={election.candidates.democrat.candidatePhoto}/>
                        </View>
                        <View style={styles.coverPhoto2Container}>
                            <CacheImage style={expanded ? styles.coverPhoto2Expanded : styles.coverPhoto2Collapsed} uri={election.candidates.republican.candidatePhoto}/>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={32} color="lightgrey" />
                    </TouchableOpacity>
                </View>
                <BottomDrawer
                    containerHeight={810}
                    startUp={false}
                    downDisplay={300}
                    roundedEdges={true}
                    onExpanded={() => SetExpanded(true)}
                    onCollapsed={() => SetExpanded(false)}
                // onExpanded={some function to dim background}
                >
                    <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={styles.electionContainer}>
                        <View style={{ width: 50, height: 5, backgroundColor: 'lightgrey', marginTop: 5, borderRadius: 25 }}></View>
                        <TouchableOpacity style={{ top: 30, height: '100%' }}>
                            <View style={styles.header}>
                                <Text style={styles.electionTitle}>{election.office}, {election.district}</Text>
                                <Text style={styles.electionType}>{election.type} Election</Text>
                            </View>
                            <View style={styles.sectionInfoContainer}>
                                <Text style={styles.sectionHeading}>Candidates</Text>
                                <View style={styles.candidatesContainer}>
                                    <View style={styles.candidateContainer}>
                                        <TouchableOpacity style={styles.candidateButtonDem} onPress={() => navigation.navigate("CandidateProfile",
                                            {
                                                firstName: election.candidates.democrat.firstName,
                                                lastName: election.candidates.democrat.lastName,
                                                party: election.candidates.democrat.party,
                                                candidatePhoto: election.candidates.democrat.candidatePhoto,
                                                inOffice: election.candidates.democrat.inOffice,
                                                campaignSiteURL: election.candidates.democrat.campaignSiteURL,
                                                title: election.candidates.democrat.title,
                                                subtitle: election.candidates.democrat.subtitle,
                                                district: election.candidates.democrat.district,
                                                phoneNumber: election.candidates.democrat.phoneNumber,
                                                email: election.candidates.democrat.email,
                                                bio: election.candidates.democrat.bio
                                            })}>
                                            <CacheImage style={styles.candidateImg} uri={election.candidates.democrat.candidatePhoto}/>
                                        </TouchableOpacity>
                                        <Text style={styles.candidateName}>{election.candidates.democrat.firstName} {election.candidates.democrat.lastName}</Text>
                                        <Text style={styles.candidatePartyDem}>{election.candidates.democrat.party}</Text>
                                    </View>
                                    <View style={styles.candidateContainer}>
                                        <TouchableOpacity style={styles.candidateButtonRepub} onPress={() => navigation.navigate("CandidateProfile",
                                            {
                                                firstName: election.candidates.republican.firstName,
                                                lastName: election.candidates.republican.lastName,
                                                party: election.candidates.republican.party,
                                                candidatePhoto: election.candidates.republican.candidatePhoto,
                                                inOffice: election.candidates.republican.inOffice,
                                                campaignSiteURL: election.candidates.republican.campaignSiteURL,
                                                title: election.candidates.republican.title,
                                                subtitle: election.candidates.republican.subtitle,
                                                district: election.candidates.republican.district,
                                                phoneNumber: election.candidates.republican.phoneNumber,
                                                email: election.candidates.republican.email,
                                                bio: election.candidates.republican.bio
                                            })}>
                                            <CacheImage style={styles.candidateImg} uri={election.candidates.republican.candidatePhoto }/>
                                        </TouchableOpacity>
                                        <Text style={styles.candidateName}>{election.candidates.republican.firstName} {election.candidates.republican.lastName}</Text>
                                        <Text style={styles.candidatePartyRepub}>{election.candidates.republican.party}</Text>
                                    </View>

                                </View>
                            </View>
                            <View style={styles.sectionInfoContainer}>
                                <Text style={styles.sectionHeading}>Election Information</Text>
                                <Text style={styles.electionInfoLine}><Text style={styles.electionInfoLabel}>Date: </Text>{election.date}</Text>
                                <Text style={styles.electionInfoLine}><Text style={styles.electionInfoLabel}>Polling Opens: </Text>{election.votingPeriod.start.toDate().toLocaleString()}</Text>
                                <Text style={styles.electionInfoLine}><Text style={styles.electionInfoLabel}>Polling Closes: </Text>{election.votingPeriod.end.toDate().toLocaleString()}</Text>
                                <Text style={[styles.electionInfoLine, { marginTop: 5 }]}><Text style={styles.electionInfoLabel}>Your Polling Location:</Text></Text>
                                <PollingPlaceButton userInfo={userInfo}></PollingPlaceButton>
                            </View>
                            <View style={{alignItems: 'center'}}>
                                <TouchableHighlight style={styles.toAssistantButton} onPress={() => navigation.navigate("CivicAssistant")}>
                                    <Text style={styles.toAssistantButtonText}>
                                        Help Me Decide
                                    </Text>
                                </TouchableHighlight>
                            </View>
                            
                        </TouchableOpacity>
                    </ScrollView>
                </BottomDrawer>
            </View>
        </>
    )
}




export default ElectionInfoScreen

const styles = StyleSheet.create({
    viewContainer: {
        height: '100%',
        width: '100%',
        alignItems: 'center'
    },
    view: {
        height: '100%',
        width: '100%'
    },
    electionContainer: {
        width: '100%',
        height: '50%',
        backgroundColor: 'white',
        zIndex: 1,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        top: -20,
        shadowColor: 'grey',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 1,
        shadowRadius: 4,
        overflow: 'hidden'
    },
    coverPhotoContainer: {
        width: '100%',
        height: 425,
        flexDirection: 'row'
    },
    coverPhoto1Container: {
        width: '50%',
        height: '100%',
        // marginRight: 3
        borderColor: 'black',
        borderRightWidth: 3,
        backgroundColor: 'black'
    },
    coverPhoto2Container: {
        width: '50%',
        height: '100%',
        // marginLeft: 3
        borderColor: 'black',
        borderLeftWidth: 3,
        backgroundColor: 'black'
    },
    coverPhoto1Collapsed: {
        width: '100%',
        height: '100%'
    },
    coverPhoto2Collapsed: {
        width: '100%',
        height: '100%'
    },
    coverPhoto1Expanded: {
        width: '100%',
        height: '100%',
        opacity: 0.3
    },
    coverPhoto2Expanded: {
        width: '100%',
        height: '100%',
        opacity: 0.3
    },
    backButton: {
        zIndex: 1,
        position: 'absolute',
        marginTop: 60,
        marginLeft: 20
    },
    header: {
        height: 60,
        width: '100%',
        marginLeft: 10

    },
    electionTitle: {
        fontSize: 30,
        fontWeight: '800'
    },
    electionType: {
        fontSize: 17,
        fontWeight: '600',
        color: 'rgb(150,150,150)'
    },
    sectionHeading: {
        textAlign: 'left',
        fontSize: 22,
        fontWeight: '800',
        marginLeft: 10,
        marginBottom: 10
    },
    sectionInfoContainer: {
        width: '100%',
        height: 200,
        marginBottom: 20
    },
    candidateContainer: {
        height: '100%',
        width: '45%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    candidatesContainer: {
        height: '100%',
        width: '100%',
        justifyContent: 'left',
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: 0,
        marginBottom: 0,
        marginTop: 5
    },
    candidateButtonRepub: {
        height: '60%',
        aspectRatio: 1,
        borderColor: 'rgb(255,75,75)',
        borderWidth: 3,
        borderRadius: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    candidateButtonDem: {
        height: '60%',
        aspectRatio: 1,
        borderColor: 'rgb(83, 159, 231)',
        borderWidth: 3,
        borderRadius: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    candidateButtonInd: {
        height: '70%',
        aspectRatio: 1,
        borderColor: 'purple',
        borderWidth: 3,
        borderRadius: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    candidateImg: {
        height: '95%',
        aspectRatio: 1,
        borderRadius: '100%',
        marginRight: 0.5
    },
    candidateName: {
        height: '10%',
        width: '100%',
        textAlign: 'center',
        fontSize: 18,
        marginTop: 10,
        fontWeight: '600'
    },
    candidatePartyDem: {
        fontWeight: '700',
        textTransform: 'uppercase',
        color: 'rgb(83, 159, 231)'
    },
    candidatePartyRepub: {
        fontWeight: '700',
        textTransform: 'uppercase',
        color: 'rgb(255, 75, 75)',

    },
    electionInfoLabel: {
        fontWeight: '600',
        fontSize: 18,
        color: 'grey'
    },
    electionInfoLine: {
        marginLeft: 25,
        marginBottom: 5,
        fontWeight: '700',
        fontSize: 18
    },
    toAssistantButton: {
        backgroundColor: 'rgb(220,220,250)',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 50,
        paddingRight: 50,
        borderRadius: 30,
        shadowColor: 'grey',
        shadowOffset: {
            height: 4,
            width: 4
        },
        shadowRadius: 2,
        shadowOpacity: 0.5,
        width: '50%',
        marginTop: 45
    },
    toAssistantButtonText: {
        color: 'rgb(80,80,200)',
        fontWeight: '900'
    }
})