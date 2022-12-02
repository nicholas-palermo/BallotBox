import { Button, StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar, Image, TouchableOpacity, ActivityIndicator} from 'react-native'
import useAuth from '../hooks/useAuth'
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { Entypo } from '@expo/vector-icons';
import { Linking } from 'react-native';
import { doc, getDoc, collection, query, where, getDocs, DocumentReference } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
import CacheImage from '../Components/CacheImage';

const DashboardScreen = () => {

  const { user, userInfo, setUserInfo, upcomingElections, setUpcomingElections } = useAuth();
  const [currentReps, setCurrentReps] = useState(null);
  const [candidatePhotos, setCanididatePhotos] = useState([]);
  const [loading, setLoading] = useState(true)

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])


  useEffect(() => {
    if (userInfo === null && user !== null) {
      fetchData(user.uid)
    }
    if(currentReps) {
      setLoading(false)
    }

  }, [user, currentReps])

  const fetchData = async (uid) => {
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);


      //Retrive user's current elected officials
      const candidateQ = query(collection(db, "candidates"), where("inOffice", "==", true));
      let reps = []

      const candidateQuerySnapshot = await getDocs(candidateQ);
      candidateQuerySnapshot.forEach((doc) => {
        reps.push(doc.data());
      })

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

      //set user info
      setUserInfo(userSnap.data());
      //set user's elected officials
      setCurrentReps(reps);

    } catch (error) {
      console.log(error.message);
    }

  };



  return ( 
    <>
    {userInfo && 
      <>
        <StatusBar
            animated={true}
            backgroundColor="white"
            barStyle="dark-content"
          />
          <View style={loading ? {justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'} : {display: 'none'}}>
          <ActivityIndicator id="loadingOverlay" size="large" color="blue"></ActivityIndicator>
          </View> 
          <SafeAreaView style={styles.viewShown}>
            <View style={styles.header}>
              <View style={styles.menuButtonContainer}>
                <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate("Settings")}>
                  <Entypo name="menu" size={32} color="black" />
                </TouchableOpacity>
              </View>
              <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../assets/logo.png')}></Image>
              </View>
              <View style={styles.profileButtonContainer}>
                <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate("Profile")}>
                  <CacheImage style={styles.profileImage} uri={userInfo?.profileImage}></CacheImage>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.mainView}>
              <View style={styles.welcome}>
                <Text style={{ fontSize: 40, fontWeight: '700' }}>Hi {userInfo?.preferredName ? userInfo.preferredName : userInfo?.firstName}.</Text>
                <Text style={{ fontSize: 30, fontWeight: '200' }}>Welcome to Civic!</Text>
              </View>
              <View style={styles.home}>
                {userInfo?.registered ?
                  <>
                    <Text style={styles.votingStatus}>You are registered to vote in <Text style={styles.votingStatusSpan}>{userInfo?.city}, {userInfo?.state}</Text>.</Text>

                    <View style={styles.repsContainer}>
                      <Text style={styles.homeSubheading}>Your current <Text style={styles.homeSubheadingSpan}>elected officials</Text>:</Text>

                      <ScrollView style={styles.repView} horizontal={true} showsHorizontalScrollIndicator="false">
                        {currentReps ?
                          currentReps.map(rep =>
                            <View key={rep.firstName + ' ' + rep.lastName} style={styles.repContainer}>
                              <TouchableOpacity style={rep.party === "Republican" ? styles.repButtonRepub : rep.party === "Democrat" ? styles.repButtonDem : styles.repButtonInd} onPress={() => navigation.navigate("CandidateProfile",
                                { firstName: rep.firstName, lastName: rep.lastName, party: rep.party, candidatePhoto: rep.candidatePhoto, inOffice: rep.inOffice, campaignSiteURL: rep.campaignSiteURL, title: rep.title, subtitle: rep.subtitle, district: rep.district, phoneNumber: rep.phoneNumber, email: rep.email, bio: rep.bio })}>
                                <CacheImage style={styles.repImg} uri={rep.candidatePhoto}></CacheImage>
                              </TouchableOpacity>
                              <Text style={styles.repTitle}>{rep.title === "State Attorney General" ? "State Atty. Gen." : rep.title}</Text>
                              <Text style={styles.repName}>{rep.firstName} {rep.lastName}</Text>
                            </View>)
                          :
                          <Text>Cannot retrieve current representitives at this time.</Text>}
                      </ScrollView>

                    </View>

                    <View style={styles.electionsContainer}>
                      <Text style={styles.homeSubheading}>Your <Text style={styles.homeSubheadingSpan}>upcoming elections</Text>:</Text>
                      <ScrollView style={styles.electionsView} showsVerticalScrollIndicator="false">
                        {upcomingElections ?
                          upcomingElections.map(election =>
                            <TouchableOpacity  style={styles.election} key={`${election.type} Election for ${election.office} of ${election.district}`} onPress={() => navigation.navigate("ElectionInfo", {
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
                              <View style={styles.electionCandidateImagesContainer}>
                                <View style={styles.demElectionCandidateImgContainer}>
                                  <CacheImage style={styles.electionCandidateImg} uri={election.candidates.democrat.candidatePhoto}></CacheImage>
                                </View>
                                <View style={styles.repubElectionCandidateImgContainer}>
                                  <CacheImage style={styles.electionCandidateImg} uri={election.candidates.republican.candidatePhoto}></CacheImage>
                                </View>
                              </View>
                              <View style={styles.electionInfo}>
                                <Text style={styles.electionTitle}>{election.office} of {election.district},</Text>
                                <Text style={styles.electionTitle}>{election.type} Election</Text>
                                <Text>
                                  <Text style={styles.demCandidateName}>{election.candidates.democrat.firstName} {election.candidates.democrat.lastName} </Text>
                                  vs.
                                  <Text style={styles.repubCandidateName}> {election.candidates.republican.firstName} {election.candidates.republican.lastName}</Text>
                                </Text>
                              </View>
                            </TouchableOpacity>
                          )
                          :
                          <Text>Cannot retrieve upcoming elections at this time.</Text>}
                      </ScrollView>
                    </View>
                  </>
                  :
                  <>
                    <Text style={styles.homeSubheading}>It looks like you aren't registered to vote yet!</Text>
                    <Text style={styles.homeSubheading}>You can learn how to register by clicking below: </Text>
                    <Button title='Register to Vote!' onPress={() => Linking.openURL('https://vote.gov/')} />
                  </>
                }

              </View>
            </View>

          </SafeAreaView>
      </>
    }
    </>
  )
}

export default DashboardScreen

const styles = StyleSheet.create({
  viewHidden: {
    height: '0%',
    width: '0%',
    display: 'none'
  },
  viewShown: {
    height: '100%',
    width: '100%'
  },
  header: {
    height: '5%',
    width: '100%',
    flexDirection: 'row',
    marginBottom: 10
  },
  menuButtonContainer: {
    height: '100%',
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoContainer: {
    height: '100%',
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileButtonContainer: {
    height: '100%',
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  menuButton: {
    marginTop: 5
  },
  logo: {
    height: '120%',
    aspectRatio: 1,
    textAlign: 'center',
    marginTop: 5
  },
  profileButton: {
    height: '90%',
    aspectRatio: 1,
    borderRadius: '50%',
    borderStyle: 'solid',
    borderWidth: 3,
    borderColor: 'darkBlue'
  },
  profileImage: {
    height: '100%',
    aspectRatio: 1,
    borderRadius: '50%'
  },
  mainView: {
    justifyContent: 'flex-start',
    alignItems: 'left',
    height: '95%'
  },
  welcome: {
    height: '10%',
    marginLeft: 20
  },
  home: {
    height: '90%',
    marginLeft: 20,
    fontSize: 24,
    width: '90%'
  },
  homeSubheading: {
    fontSize: 18,
    fontWeight: "300",
    marginBottom: 7
  },
  homeSubheadingSpan: {
    fontWeight: "500"
  },
  votingStatus: {
    fontSize: 18,
    fontWeight: "300",
    marginTop: 5,
    marginBottom: 15,
    height: '2.5%'
  },
  votingStatusSpan: {
    fontWeight: "500"
  },
  repsContainer: {
    width: 500,
    height: '20%'
  },
  repView: {
    height: '100%',
    width: '80%'
  },
  repContainer: {
    height: '100%',
    width: 102,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  repButtonRepub: {
    height: '70%',
    aspectRatio: 1,
    borderColor: 'rgb(255,75,75)',
    borderWidth: 3,
    borderRadius: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  repButtonDem: {
    height: '70%',
    aspectRatio: 1,
    borderColor: 'rgb(83, 159, 231)',
    borderWidth: 3,
    borderRadius: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  repButtonInd: {
    height: '70%',
    aspectRatio: 1,
    borderColor: 'purple',
    borderWidth: 3,
    borderRadius: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  repImg: {
    height: '95%',
    aspectRatio: 1,
    borderRadius: '100%',
    marginRight: 0.5
  },
  repTitle: {
    height: '12.5%',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 5
  },
  repName: {
    height: '12.5%',
    width: '100%',
    textAlign: 'center',
    fontSize: 12
  },

  // Elections
  electionsContainer: {
    paddingTop: 5,
    height: '71%',
    width: '100%'
  },
  electionsView: {
    height: '100%',
    marginTop: 10,
    backgroundColor: 'rgb(230,230,230)',
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 15
  },
  election: {
    height: 112,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  electionCandidateImagesContainer: {
    height: '86%',
    width: '27%'
  },
  electionInfo: {
    height: '100%',
    width: '73%',
    justifyContent: 'center'
  },
  electionTitle: {
    textAlign: 'center',
    width: '89%',
    marginLeft: 15,
    fontWeight: '800',
    fontSize: 18,
    marginBottom: 5
  },
  demElectionCandidateImgContainer: {
    height: 60,
    aspectRatio: 1,
    borderColor: 'rgb(83, 159, 231)',
    borderWidth: 2,
    borderRadius: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1,
    left: 35, backgroundColor: 'white'
  },
  repubElectionCandidateImgContainer: {
    height: 60,
    aspectRatio: 1,
    borderColor: 'rgb(255,75,75)',
    borderWidth: 2,
    borderRadius: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 2,
    top: 35,
    backgroundColor: 'white'

  },
  electionCandidateImg: {
    height: '95%',
    aspectRatio: 1,
    borderRadius: '100%'
  },
  demCandidateName: {
    textTransform: 'uppercase',
    color: 'rgb(83, 159, 231)',
    fontWeight: '800',
    textAlign: 'center',
    width: '89%',
    marginLeft: 15,
    fontWeight: '800'
  },
  repubCandidateName: {
    textTransform: 'uppercase',
    color: 'rgb(255,75,75)',
    fontWeight: '800',
    textAlign: 'center',
    width: '89%',
    marginLeft: 15,
    fontWeight: '800'
  }
})