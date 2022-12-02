import { StyleSheet, Text, View, SafeAreaView, Image, Dimensions, ActivityIndicator } from 'react-native'
import useAuth from '../hooks/useAuth'
import React, { useState, useEffect } from 'react'
import { doc, getDoc, collection, query, where, getDocs, DocumentReference, connectFirestoreEmulator } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import CacheImage from '../Components/CacheImage';

const MyBallotScreen = () => {

  const { userInfo, upcomingElections } = useAuth();
  const navigation = useNavigation();

  const [selectedCandidates, setSelectedCandidates] = useState(null)

  useEffect(() => {
    if (selectedCandidates === null && upcomingElections !== null) {
      const electionIDObject = {}

      upcomingElections.forEach(election => {
        electionIDObject[election.electionID] = null
      });

      console.log(electionIDObject)
      setSelectedCandidates(electionIDObject)
    }
  }, [])
  
  const renderSelectedButtons = (party, electionID) => {
    if (electionID === selectedElection?.electionID) {
      return (
        <Octicons name="check-circle-fill" size={22} color="green" />
      )
    } else {
      return (
        <View style={{height: 22, width: 22, borderRadius: 11, borderWidth: 2, borderColor: 'black'}}></View>
      )
    }
  }

  return (
    <SafeAreaView style={styles.ScreenContainer}>
      <View style={styles.Header}>
        <Text style={styles.Title}>Your Ballot</Text>
        <Text style={styles.Subtitle}>2022 General Election</Text>
      </View>
      {upcomingElections ?
        upcomingElections.map(election =>
          <View style={styles.electionContainer} key={`${election.type} Election for ${election.office} of ${election.district}`}>
            <View style={styles.electionHeader}>
              <TouchableOpacity onPress={() => navigation.navigate("ElectionInfo", 
              {
                candidates: election.candidates,
                date: election.date,
                district: election.district,
                office: election.office,
                earlyVoting: election.earlyVoting,
                incumbent: election.incumbent,
                level: election.level,
                type: election.type,
                votingPeriod: election.votingPeriod
              })}>
                <Text style={styles.electionTitle}>{election.office}, {election.district}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.candidateChoicesContainer}>
              <View style={styles.candidateChoice}>
                <View style={styles.candidateSelect}>
                  <TouchableOpacity style={styles.selectButton} onPress={()=>{console.log('Do Something')}}>
                    <Octicons name="check-circle-fill" size={30} color="green" />
                  </TouchableOpacity>
                </View>
                <View style={styles.candidateInfo}>
                  <TouchableOpacity style={[styles.candidatePhotoContainer, { borderColor: 'rgb(83,159,231)' }]} onPress={() => navigation.navigate("CandidateProfile",
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
                      email: election.candidates.democrat.email
                  })}>
                    <CacheImage style={styles.candidatePhoto} uri={election.candidates.democrat.candidatePhoto} />
                  </TouchableOpacity>
                  <Text style={styles.CandidateName}>{election.candidates.democrat.firstName} {election.candidates.democrat.lastName}</Text>
                  <Text style={[styles.CandidateParty, { color: 'rgb(83, 159, 231)' }]}>{election.candidates.democrat.party}</Text>
                </View>
              </View>
              <View style={styles.candidateChoice}>
              <View style={styles.candidateSelect}>
                  <TouchableOpacity style={[styles.selectButton, {width: 30, aspectRatio: 1, borderColor: 'black', borderRadius: 15, borderWidth: 2}]} onPress={()=>{console.log("Do Something")}}>

                  </TouchableOpacity>
                </View>
                <View style={styles.candidateInfo}>
                  <TouchableOpacity style={[styles.candidatePhotoContainer, { borderColor: 'rgb(255,75,75)' }]} onPress={() => navigation.navigate("CandidateProfile",
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
                      email: election.candidates.republican.email
                  })}>
                    <CacheImage style={styles.candidatePhoto} uri={election.candidates.republican.candidatePhoto }/>
                  </TouchableOpacity>
                  <Text style={styles.CandidateName}>{election.candidates.republican.firstName} {election.candidates.republican.lastName}</Text>
                  <Text style={[styles.CandidateParty, { color: 'rgb(255,75,75)' }]}>{election.candidates.republican.party}</Text>
                </View>
              </View>
            </View>
          </View>
        ) :
        <Text>Unable to retrieve election info...</Text>
      }
    </SafeAreaView>
  )
}

export default MyBallotScreen

const styles = StyleSheet.create({
  ScreenContainer: {
    height: '100%',
    width: '100%',
    alignItems: 'center'
  },
  Header: {
    width: '100%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
  },
  Title: {
    fontSize: 30,
    fontWeight: '900'
  },
  Subtitle: {
    fontSize: 18,
    fontWeight: '700'
  },
  electionContainer: {
    height: '22.5%',
    justifyContent: 'flex-start',
    alignItems: 'left',
    justifyContent: 'center',
    marginBottom: 5
  },
  electionHeader: {
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  electionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 20
  },
  candidateChoicesContainer: {
    flexDirection: 'row',
    height: '80%',
    paddingLeft: 12,
    paddingRight: 20
  },
  candidateChoice: {
    width: '50%',
    alignItems: 'center',
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'center'
  },
  candidateSelect: {
    width: '30%',
    alignItems: 'flex-end',
    paddingBottom: 30
  },
  candidateInfo: {
    alignItems: 'center',
    width: '70%',
    paddingRight: 15
  },
  candidatePhotoContainer: {
    height: 80,
    width: 80,
    borderRadius: 50,
    overflow: 'hidden',
    borderColor: 'lightblue',
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 7.5
  },
  CandidateName: {
    fontWeight: '700'
  },
  CandidateParty: {
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: '700'
  },
  candidatePhoto: {
    height: 70,
    width: 70,
    borderRadius: 50
  }
})