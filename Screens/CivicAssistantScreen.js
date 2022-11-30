import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native'
import React from 'react'
import { useState } from 'react'
import useAuth from '../hooks/useAuth'

import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const CivicAssistantScreen = () => {

  const { userInfo, setUserInfo, upcomingElections } = useAuth();


  const [render, setRender] = useState(1);
  const [selectedElection, setSelectedElection] = useState(null);

  const electionSelection = () => {
    return (
      <>
        <Text style={styles.instruction}>Please select one of the following upcoming elections:</Text>
        <View style={styles.electionsContainer}>
        <ScrollView style={styles.electionsView} showsVerticalScrollIndicator="false">
          {upcomingElections ?
            upcomingElections.map(election =>
              <TouchableOpacity id={`${election.type} Election for ${election.office} of ${election.district}`} style={styles.election} key={`${election.type} Election for ${election.office} of ${election.district}`} onPress={() => {
                setSelectedElection(election)
                }}>
                <View style={styles.selectButton}>
                  {renderSelectedButtons(election.electionID)}
                </View>
                <View style={styles.electionCandidateImagesContainer}>
                  <View style={styles.demElectionCandidateImgContainer}>
                    <Image style={styles.electionCandidateImg} source={{ uri: election.candidates.democrat.candidatePhoto }}></Image>
                  </View>
                  <View style={styles.repubElectionCandidateImgContainer}>
                    <Image style={styles.electionCandidateImg} source={{ uri: election.candidates.republican.candidatePhoto }}></Image>
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
        <View style={styles.submitButtonContainer}>
          <TouchableOpacity onPress={() => {if(selectedElection != null) {setRender(2)} else {alert("You have not selected an upcoming election! Please make a selection to continue.")}}} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
        
      </>
    )
  }

  const renderSelectedButtons = (electionID) => {
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

  const unigramSelection = () => {
    return (
      <>
        <Text>This is the unigram Selection.</Text>
        <TouchableOpacity onPress={() => setRender(3)}><Text>Submit</Text></TouchableOpacity>
      </>
    )
  }

  const bigramSelection = () => {
    return (
      <>
        <Text>This is the bigram Selection.</Text>
        <TouchableOpacity onPress={() => setRender(4)}><Text>Submit</Text></TouchableOpacity>
      </>
    )
  }

  const trigramSelection = () => {
    return (
      <>
        <Text>This is the trigram Selection.</Text>
        <TouchableOpacity onPress={() => setRender(5)}><Text>Submit</Text></TouchableOpacity>
      </>
    )
  }

  const fourGramSelection = () => {
    return (
      <>
        <Text>This is the 4-Gram Selection.</Text>
        <TouchableOpacity onPress={() => setRender(6)}><Text>Submit</Text></TouchableOpacity>
      </>
    )
  }

  const fiveGramSelection = () => {
    return (
      <>
        <Text>This is the 5-gram Selection.</Text>
        <TouchableOpacity onPress={() => setRender(7)}><Text>Submit</Text></TouchableOpacity>
      </>
    )
  }

  const candidateOutcome = () => {
    return (
      <>
        <Text>You have reached the end. Here is your candidate.</Text>
        <TouchableOpacity onPress={() => {setRender(1), setSelectedElection(null)}}><Text>Start Over</Text></TouchableOpacity>
      </>
    )
  }


  return (
    <SafeAreaView style={styles.viewContainer}>
      <View style={styles.headerContainer}>
        <Text style={[{color: 'rgb(83, 159, 231)', shadowColor: 'rgb(150,200,250)'}, styles.title]}>Civic </Text>
        <Text style={[{color: 'rgb(255,80,80)', shadowColor: 'rgb(255,200,200)'}, styles.title]}>Assistant</Text>
      </View>
      {render > 1 &&
      <TouchableOpacity style={{position: 'absolute', top: 65, left: 20}} onPress={() => setRender(render-1)}>
        <Ionicons name="arrow-back-sharp" size={30} color="black" />
      </TouchableOpacity>
      }
      <View style={styles.bodyContainer}>
        {render === 1 ?
          electionSelection()
          :
          render === 2 ?
            unigramSelection()
            :
            render === 3 ?
              bigramSelection()
              :
              render === 4 ?
                trigramSelection()
                :
                render === 5 ?
                  fourGramSelection()
                  :
                  render === 6 ?
                    fiveGramSelection()
                    :
                    render === 7 &&
                    candidateOutcome()
        }
      </View>
    </SafeAreaView>
  )
}

export default CivicAssistantScreen

const styles = StyleSheet.create({
  viewContainer: {
  },
  headerContainer: {
    height: '5%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    shadowOffset: {
      height: 4,
      width: 4
    },
    shadowRadius: 1,
    shadowOpacity: 0.6,
    textShadowColor: 'black',
    textShadowOffset: {
      height: 1,
      width: 1
    },
    textShadowRadius: 1
  },
  bodyContainer: {
    height: '95%',
    width: '100%'
  },
  instruction: {
    fontSize: 18,
    marginLeft: 15,
    marginTop: 25,
    fontWeight: '600',
    height: '2.5%'
  },
  submitButtonContainer: {
    height: '18%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitButton: {
    backgroundColor: 'rgb(200,230,255)',
    paddingHorizontal: 75,
    paddingVertical: 20,
    borderRadius: 50
  },
  submitButtonText: {
    fontSize: 20,
    textTransform: 'uppercase',
    fontWeight: '800',
    color: 'rgb(50,100,150)'
  },  


  // Elections
  electionsContainer: {
    paddingTop: 5,
    height: '75%',
    width: '100%',
    alignItems: 'center',
    marginTop: 10
  },
  electionsView: {
    height: '100%',
    marginTop: 10,
    backgroundColor: 'rgb(230,230,230)',
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 15,
    width: '95%'
  },
  election: {
    height: 139.575,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  electionCandidateImagesContainer: {
    height: '70%',
    width: '22%'
  },
  electionInfo: {
    height: '100%',
    width: '65%',
    justifyContent: 'center'
  },
  selectButton: {
    width:'13%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
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
    left: 0,
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