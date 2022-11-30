import { StyleSheet, Text, View, SafeAreaView, Image, Dimensions } from 'react-native'
import useAuth from '../hooks/useAuth'
import React, { useState, useEffect } from 'react'
import { doc, getDoc, collection, query, where, getDocs, DocumentReference } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const MyBallotScreen = () => {

  const { userInfo } = useAuth();
  const navigation = useNavigation();

  const [upcomingElections, setUpcomingElections] = useState(null);


  useEffect(() => {
    if (!upcomingElections) {
      console.log("Fetching Elections...")
      fetchUpcomingElections()
    }
  }, [upcomingElections])

  const fetchUpcomingElections = async () => {
    try {
      setUpcomingElections([]);

      //Retrieve user's current upcoming elections
      const electionQ = query(collection(db, "elections"), where("date", "==", "11/08/2022"))
      const electionQuerySnapshot = await getDocs(electionQ);
      electionQuerySnapshot.forEach(async (item) => {
        const election = item.data()

        //get objects sto'rgb(255,75,75)' at reference
        const demCandidateSnapshot = await getDoc(election.candidates.democrat)
        const repubCandidateSnapshot = await getDoc(election.candidates.republican)
        const incumbentSnapshot = await getDoc(election.incumbent)

        //stores objects sto'rgb(255,75,75)' at reference in local object
        election.candidates.democrat = demCandidateSnapshot.data();
        election.candidates.republican = repubCandidateSnapshot.data();
        election.incumbent = incumbentSnapshot.data()

        //adds election to upcoming elections array
        if (election) {
          setUpcomingElections(current => [...current, election])
        }
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  const selectCandidate = () => {

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
                  <TouchableOpacity style={styles.selectButton} onPress={()=>{selectCandidate}}>
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
                    <Image style={styles.candidatePhoto} source={{ uri: election.candidates.democrat.candidatePhoto }}></Image>
                  </TouchableOpacity>
                  <Text style={styles.CandidateName}>{election.candidates.democrat.firstName} {election.candidates.democrat.lastName}</Text>
                  <Text style={[styles.CandidateParty, { color: 'rgb(83, 159, 231)' }]}>{election.candidates.democrat.party}</Text>
                </View>
              </View>
              <View style={styles.candidateChoice}>
              <View style={styles.candidateSelect}>
                  <TouchableOpacity style={[styles.selectButton, {width: 30, aspectRatio: 1, borderColor: 'black', borderRadius: 15, borderWidth: 2}]} onPress={()=>{selectCandidate}}>

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
                    <Image style={styles.candidatePhoto} source={{ uri: election.candidates.republican.candidatePhoto }}></Image>
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