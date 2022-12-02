import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import { useState } from 'react'
import useAuth, { AuthProvider } from '../hooks/useAuth'
import CacheImage from '../Components/CacheImage'
import * as FileSystem from 'expo-file-system'

import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

const CivicAssistantScreen = () => {

  const { userInfo, setUserInfo, upcomingElections } = useAuth();

  const navigation = useNavigation();

  //set in render 1 - elections
  const [loading, setLoading] = useState(true);
  const [render, setRender] = useState(1);

  //set in render 2 - unigrams
  const [selectedElection, setSelectedElection] = useState(null);
  const [demFile, setDemFile] = useState(null);
  const [repubFile, setRepubFile] = useState(null);
  const [chosenUnigrams, setChosenUnigrams] = useState([])
  const [unigramPercentages, setUnigramPercentages] = useState(null)

  //set in render 3 - bigrams
  const [sharedBigramList, setSharedBigramList] = useState([]);
  const [demBigramFrequency, setDemBigramFrequency] = useState([]);
  const [repubBigramFrequency, setRepubBigramFrequency] = useState([]);
  const [chosenBigrams, setChosenBigrams] = useState([])
  const [bigramPercentages, setBigramPercentages] = useState(null)

  //set in render 4 - trigrams
  const [sharedTrigramList, setSharedTrigramList] = useState([]);
  const [demTrigramFrequency, setDemTrigramFrequency] = useState([]);
  const [repubTrigramFrequency, setRepubTrigramFrequency] = useState([]);
  const [chosenTrigrams, setChosenTrigrams] = useState([])
  const [trigramPercentages, setTrigramPercentages] = useState(null)

  //set in render 5 - fourgrams
  const [sharedFourgramList, setSharedFourgramList] = useState([]);
  const [demFourgramFrequency, setDemFourgramFrequency] = useState([]);
  const [repubFourgramFrequency, setRepubFourgramFrequency] = useState([]);
  const [chosenFourgrams, setChosenFourgrams] = useState([])
  const [fourgramPercentages, setFourgramPercentages] = useState(null);

  //set in render 6 - candidateOutcome
  const [finalPercentages, setFinalPercentages] = useState(null);
  const [suggestedCandidate, setSuggestedCandidate] = useState(null);


  //used to provide random gram orders
  const [shuffleGrams, setShuffleGrams] = useState(true)


  //starter arrays for intial unigrams and stopwords
  const starterGrams = [
    'community',
    'democrat',
    'republican',
    'abortion',
    'guns',
    'healthcare',
    'democracy',
    'stimulus',
    'recession',
    'law',
    'order',
    'safety',
    'conservative',
    'police',
    'Trump',
    'Biden',
    'drugs',
    'economy',
    'welfare',
    'patriotism',
    'election',
    'freedom',
    'liberty',
    'pandemic',
    'taxes',
    'family',
    'immigration',
    'education',
    'environment',
    'spending',
    'terrorism',
    'security',
    'medicare',
    'jobs',
    'ukraine',
    'inflation',
    'climate',
    'health',
    'epidemic',
    'union',
    'lgbtq',
    'covid',
    'bipartisan'
  ]
  const stopWords = [
    'i',
    'me',
    'my',
    "myself",
    "we",
    "our",
    "ours",
    "ourselves",
    "you",
    "your",
    "yours",
    "yourself",
    "yourselves",
    "he",
    "him",
    "his",
    "himself",
    "she",
    "her",
    "hers",
    "herself",
    "it",
    "its",
    "itself",
    "they",
    "them",
    "their",
    "theirs",
    "themselves",
    "what",
    "which",
    "who",
    "whom",
    "this",
    "that",
    "these",
    "those",
    "am",
    "is",
    "are",
    "was",
    "were",
    "be",
    "been",
    "being",
    "have",
    "has",
    "had",
    "having",
    "do",
    "does",
    "did",
    "doing",
    "a",
    "an",
    "the",
    "and",
    "but",
    "if",
    "or",
    "because",
    "as",
    "until",
    "while",
    "of",
    "at",
    "by",
    "for",
    "with",
    "about",
    "against",
    "between",
    "into",
    "through",
    "during",
    "before",
    "after",
    "above",
    "below",
    "to",
    "from",
    "up",
    "down",
    "in",
    "out",
    "on",
    "off",
    "over",
    "under",
    "again",
    "further",
    "then",
    "once",
    "here",
    "there",
    "when",
    "where",
    "why",
    "how",
    "all",
    "any",
    "both",
    "each",
    "few",
    "more",
    "most",
    "other",
    "some",
    "such",
    "no",
    "nor",
    "not",
    "only",
    "own",
    "same",
    "so",
    "than",
    "too",
    "very",
    "s",
    "t",
    "can",
    "will",
    "just",
    "don",
    "should",
    "now",
    "rei",
    "maxrose4ny",
    "rt",
    "gram",
    "doesn",
    "ele",
    "nysut",
    "new",
    "ny11",
    "amp",
    "mighty",
    "hamlin",
    "socia",
    "rip",
    "draconian",
    "watch",
    "seek",
    "per",
    "pgrm",
    "sy",
    "meba",
    "yemen",
    'adviser',
    'unfortunately',
    'bid',
    'gone',
  ]

  useEffect(() => {
    if (render === 1) {
      setLoading(false)
    } else if (render === 2 && (demFile !== null  && repubFile !== null)) {
      setLoading (false)
    } else if (render === 3) {
      setLoading (false)
    } else if (render === 4) {
      setLoading (false)
    } else if (render === 5) {
      setLoading (false)
    } else if (render === 6 && (finalPercentages !== null && suggestedCandidate !== null)) {
      setLoading (false)
    }

    switch (render) {
      //bigrams
      case 3:
        if (demBigramFrequency.length === 0 && repubBigramFrequency.length === 0) {
          const bigramFrequencies = getBigrams()
          setDemBigramFrequency(bigramFrequencies.dem);
          setRepubBigramFrequency(bigramFrequencies.repub);
          setSharedBigramList(bigramFrequencies.shared);
        }
        break;

      case 4:
        //trigrams
        if (demTrigramFrequency.length === 0 && repubTrigramFrequency.length === 0) {
          const trigramFrequencies = getTrigrams()
          setDemTrigramFrequency(trigramFrequencies.dem);
          setRepubTrigramFrequency(trigramFrequencies.repub);
          setSharedTrigramList(trigramFrequencies.shared);
        }
        break;

      case 5:
        //fourgrams
        if (demFourgramFrequency.length === 0 && repubFourgramFrequency.length === 0) {
          const fourgramFrequencies = getFourgrams()
          setDemFourgramFrequency(fourgramFrequencies.dem);
          setRepubFourgramFrequency(fourgramFrequencies.repub);
          setSharedFourgramList(fourgramFrequencies.shared);
        }
        break;

      case 6:
        if(unigramPercentages && bigramPercentages && trigramPercentages && fourgramPercentages) {
          calculateOutcome();
        }
        break;

      default:
        break;
    }

  }, [demFile, repubFile, render, chosenUnigrams, suggestedCandidate])

  //Gets file for each candidate, containing n-gram data-frequencies extracted from python scripts via web scraping and twitter API

  //democratic candidate data retrieval
  const getDemFreqFile = async () => {
    const demURI = selectedElection.candidates.democrat.languageFrequencies;
    var sh = require("shorthash")
    const name = sh.unique(demURI)
    const path = `${FileSystem.cacheDirectory}${name}`
    const file = await FileSystem.getInfoAsync(path);
    if (file.exists) {
      console.log("File found in cache. Getting file.")
      setDemFile(await FileSystem.readAsStringAsync(path))
      console.log('File retrieved.')
    } else {
      console.log("File not found in cache. Retrieving file from URI...")
      const newFile = await FileSystem.downloadAsync(demURI, path)
      setDemFile(await FileSystem.readAsStringAsync(newFile.uri))
      console.log('File retrieved.')
    }


  }

  //republican candidate data retrieval
  const getRepubFreqFile = async () => {
    const repubURI = selectedElection.candidates.republican.languageFrequencies;
    var sh = require("shorthash")
    const name = sh.unique(repubURI)
    const path = `${FileSystem.cacheDirectory}${name}`
    const file = await FileSystem.getInfoAsync(path);
    if (file.exists) {
      console.log("File found in cache. Getting file.")
      setRepubFile(await FileSystem.readAsStringAsync(path))
      console.log("File retrieved.")
    } else {
      console.log("File not found in cache. Retrieving file from URI...")
      const newFile = await FileSystem.downloadAsync(repubURI, path)
      setRepubFile(await FileSystem.readAsStringAsync(newFile.uri))
      console.log("File retrieved.")
    }
  }

  //Each of these functions returns two parsed arrays of n-grams based on the previous set of (n-1)-grams selected by the user 
  //gets bigrams based on selected unigrams
  const getBigrams = () => {
    //Create substrings from frequency files to access only bigrams list
    let demFileSubstring = demFile.substring(demFile.search("2-grams"), demFile.search('1-grams'))
    let repubFileSubstring = repubFile.substring(repubFile.search("2-grams"), repubFile.search('1-grams'))
    var demParsedBigramFreq = [], repubParsedBigramFreq = [], parsedBigrams = []

    //for each of the chosen unigrams, search for that unigram in the 2-gram democrat substring for that unigram; iterates ~10 times
    chosenUnigrams.forEach((gram) => {

      //create regular expression to single out bigram's line
      const regex = new RegExp(`(.*(?:'${gram}').*)`, "gi")

      //Get line from file by regex expression (democrat)
      let demRegexArray = [...demFileSubstring.matchAll(regex)]

      //for each bigram found using regex, parse into two words and the freqency split by a ':', store with frequency in democratic candidate list, and without frequency in shared list
      demRegexArray.forEach((uniGramSet) => {
        let parsedUniGram1 = uniGramSet[0].split('\'')[1].toLowerCase()
        let parsedUniGram2 = uniGramSet[0].split('\'')[3].toLowerCase()
        let frequency = uniGramSet[0].split(': ')[1]
        let toStore = `${parsedUniGram1} ${parsedUniGram2}`
        let toStoreFreq = `${parsedUniGram1} ${parsedUniGram2} : ${frequency}`
        if (!stopWords.includes(parsedUniGram1) && !stopWords.includes(parsedUniGram2)) {
          demParsedBigramFreq.push(toStoreFreq)   //store frequency with bigram in list exclusively for democratic candidate
          if (!parsedBigrams.includes(toStore)) {
            parsedBigrams.push(toStore);
          }             //store only bigram in shared list
        }
      })

      //Get line from file by regex expression (republican)
      let repubRegexArray = [...repubFileSubstring.matchAll(regex)]

      //for each bigram found using regex, parse into two words and the freqency split by a ':', store with frequency in republican candidate list, and without frequency in shared list     
      repubRegexArray.forEach((uniGramSet) => {
        let parsedUniGram1 = uniGramSet[0].split('\'')[1].toLowerCase()
        let parsedUniGram2 = uniGramSet[0].split('\'')[3].toLowerCase()
        let frequency = uniGramSet[0].split(': ')[1]
        let toStore = `${parsedUniGram1} ${parsedUniGram2}`
        let toStoreFreq = `${parsedUniGram1} ${parsedUniGram2} : ${frequency}`
        if (!stopWords.includes(parsedUniGram1) && !stopWords.includes(parsedUniGram2)) {
          repubParsedBigramFreq.push(toStoreFreq)   //store frequency with bigram in list exclusively for republican candidate

          //if bigram is not already in shared list, store it 
          if (!parsedBigrams.includes(toStore)) {
            parsedBigrams.push(toStore);
          }
        }
      })
    })

    console.log(demParsedBigramFreq);
    console.log(repubParsedBigramFreq);
    console.log(parsedBigrams)

    return {
      dem: demParsedBigramFreq,
      repub: repubParsedBigramFreq,
      shared: parsedBigrams
    }
  }

  //gets trigrams based on selected bigrams
  const getTrigrams = () => {
    //Create substrings from frequency files to access only trigrams list
    let demFileSubstring = demFile.substring(demFile.search("3-grams"), demFile.search('2-grams'))
    let repubFileSubstring = repubFile.substring(repubFile.search("3-grams"), repubFile.search('2-grams'))
    var demParsedTrigramFreq = [], repubParsedTrigramFreq = [], parsedTrigrams = []

    //for each of the chosen bigrams, search for that bigram in the 3-gram democrat substring for that bigram; iterates ~10 times
    chosenBigrams.forEach((gram) => {

      gram = `'${gram.split(' ').join('\', \'')}'`;


      //create regular expression to single out trigram's line
      const regex = new RegExp(`(.*(?:${gram}).*)`, "gi")

      //Get line from file by regex expression (democrat)
      let demRegexArray = [...demFileSubstring.matchAll(regex)]

      //for each trigram found using regex, parse into two words and the freqency split by a ':', store with frequency in democratic candidate list, and without frequency in shared list
      demRegexArray.forEach((uniGramSet) => {
        let parsedUniGram1 = uniGramSet[0].split('\'')[1].toLowerCase()
        let parsedUniGram2 = uniGramSet[0].split('\'')[3].toLowerCase()
        let parsedUniGram3 = uniGramSet[0].split('\'')[5].toLowerCase()
        let frequency = uniGramSet[0].split(': ')[1]
        let toStore = `${parsedUniGram1} ${parsedUniGram2} ${parsedUniGram3}`
        let toStoreFreq = `${parsedUniGram1} ${parsedUniGram2} ${parsedUniGram3} : ${frequency}`
        demParsedTrigramFreq.push(toStoreFreq)   //store frequency with trigram in list exclusively for democratic candidate
        if (!parsedTrigrams.includes(toStore)) {
          parsedTrigrams.push(toStore);
        }
      })

      //Get line from file by regex expression (republican)
      let repubRegexArray = [...repubFileSubstring.matchAll(regex)]

      //for each trigram found using regex, parse into two words and the freqency split by a ':', store with frequency in republican candidate list, and without frequency in shared list     
      repubRegexArray.forEach((uniGramSet) => {
        let parsedUniGram1 = uniGramSet[0].split('\'')[1].toLowerCase()
        let parsedUniGram2 = uniGramSet[0].split('\'')[3].toLowerCase()
        let parsedUniGram3 = uniGramSet[0].split('\'')[5].toLowerCase()
        let frequency = uniGramSet[0].split(': ')[1]
        let toStore = `${parsedUniGram1} ${parsedUniGram2} ${parsedUniGram3}`
        let toStoreFreq = `${parsedUniGram1} ${parsedUniGram2} ${parsedUniGram3} : ${frequency}`
        repubParsedTrigramFreq.push(toStoreFreq)   //store frequency with bigram in list exclusively for republican candidate
        //if trigram is not already in shared list, store it 
        if (!parsedTrigrams.includes(toStore)) {
          parsedTrigrams.push(toStore);
        }
      })
    })

    console.log(demParsedTrigramFreq);
    console.log(repubParsedTrigramFreq);
    console.log(parsedTrigrams)

    return {
      dem: demParsedTrigramFreq,
      repub: repubParsedTrigramFreq,
      shared: parsedTrigrams
    }
  }

  //gets fourgrams based on selected fourgrams
  const getFourgrams = () => {
    //Create substrings from frequency files to access only fourgrams list
    let demFileSubstring = demFile.substring(demFile.search("4-grams"), demFile.search('3-grams'))
    let repubFileSubstring = repubFile.substring(repubFile.search("4-grams"), repubFile.search('3-grams'))
    var demParsedFourgramFreq = [], repubParsedFourgramFreq = [], parsedFourgrams = []

    //for each of the chosen trigrams, search for that trigram in the 3-gram democrat substring for that trigram; iterates ~10 times
    chosenBigrams.forEach((gram) => {

      gram = `'${gram.split(' ').join('\', \'')}'`;

      //create regular expression to single out fourgram's line
      const regex = new RegExp(`(.*(?:${gram}).*)`, "gi")

      //Get line from file by regex expression (democrat)
      let demRegexArray = [...demFileSubstring.matchAll(regex)]

      //for each fourgram found using regex, parse into two words and the freqency split by a ':', store with frequency in democratic candidate list, and without frequency in shared list
      demRegexArray.forEach((uniGramSet) => {
        let parsedUniGram1 = uniGramSet[0].split('\'')[1].toLowerCase()
        let parsedUniGram2 = uniGramSet[0].split('\'')[3].toLowerCase()
        let parsedUniGram3 = uniGramSet[0].split('\'')[5].toLowerCase()
        let parsedUniGram4 = uniGramSet[0].split('\'')[7].toLowerCase()
        let frequency = uniGramSet[0].split(': ')[1]
        let toStore = `${parsedUniGram1} ${parsedUniGram2} ${parsedUniGram3} ${parsedUniGram4}`
        let toStoreFreq = `${parsedUniGram1} ${parsedUniGram2} ${parsedUniGram3} ${parsedUniGram4} : ${frequency}`
        demParsedFourgramFreq.push(toStoreFreq)   //store frequency with trigram in list exclusively for democratic candidate
        if (!parsedFourgrams.includes(toStore)) {
          parsedFourgrams.push(toStore);
        }
      })

      //Get line from file by regex expression (republican)
      let repubRegexArray = [...repubFileSubstring.matchAll(regex)]

      //for each fourgram found using regex, parse into two words and the freqency split by a ':', store with frequency in republican candidate list, and without frequency in shared list     
      repubRegexArray.forEach((uniGramSet) => {
        let parsedUniGram1 = uniGramSet[0].split('\'')[1].toLowerCase()
        let parsedUniGram2 = uniGramSet[0].split('\'')[3].toLowerCase()
        let parsedUniGram3 = uniGramSet[0].split('\'')[5].toLowerCase()
        let parsedUniGram4 = uniGramSet[0].split('\'')[7].toLowerCase()
        let frequency = uniGramSet[0].split(': ')[1]
        let toStore = `${parsedUniGram1} ${parsedUniGram2} ${parsedUniGram3} ${parsedUniGram4}`
        let toStoreFreq = `${parsedUniGram1} ${parsedUniGram2} ${parsedUniGram3} ${parsedUniGram4} : ${frequency}`
        repubParsedFourgramFreq.push(toStoreFreq)   //store frequency with trigram in list exclusively for republican candidate
        //if fourgram is not already in shared list, store it 
        if (!parsedFourgrams.includes(toStore)) {
          parsedFourgrams.push(toStore);
        }
      })
    })

    console.log(demParsedFourgramFreq);
    console.log(repubParsedFourgramFreq);
    console.log(parsedFourgrams)

    return {
      dem: demParsedFourgramFreq,
      repub: repubParsedFourgramFreq,
      shared: parsedFourgrams
    }
  }

  //renders buttons for each type of n-gram
  const renderGrams = () => {

    switch (render) {
      case 2:
        let grams = starterGrams

        return (
          grams?.map(gram =>
            <TouchableOpacity style={[styles.gramButtons, chosenUnigrams.includes(gram) ? { color: 'white', borderColor: 'black', backgroundColor: 'grey' } : {}]} key={gram} onPress={() => {
              if (!chosenUnigrams.includes(gram)) {
                setChosenUnigrams(current => [...current, gram])
              } else if (chosenUnigrams.includes(gram)) {
                let newArray = chosenUnigrams.filter(function (item) {
                  return item !== gram
                })
                setChosenUnigrams(newArray)
              }
            }}>
              <Text style={styles.gramButtonText}>{gram}</Text>
            </TouchableOpacity>
          )
        )

      case 3:

        return (
          sharedBigramList?.map(bigram =>
            <TouchableOpacity style={[styles.gramButtons, chosenBigrams.includes(bigram) ? { color: 'white', borderColor: 'black', backgroundColor: 'grey' } : {}]} key={bigram} onPress={() => {
              if (!chosenBigrams.includes(bigram)) {
                setChosenBigrams(current => [...current, bigram])

              } else if (chosenBigrams.includes(bigram)) {
                let newArray = chosenBigrams.filter(function (item) {
                  return item !== bigram
                })
                setChosenBigrams(newArray)
              }
            }}>
              <Text style={styles.gramButtonText}>{bigram.split(' ')[0] + " " + bigram.split(' ')[1]}</Text>
            </TouchableOpacity>
          )
        )


      case 4:

        return (
          sharedTrigramList?.map(trigram =>
            <TouchableOpacity style={[styles.gramButtons, chosenTrigrams.includes(trigram) ? { color: 'white', borderColor: 'black', backgroundColor: 'grey' } : {}]} key={trigram} onPress={() => {
              if (!chosenTrigrams.includes(trigram)) {
                setChosenTrigrams(current => [...current, trigram])

              } else if (chosenTrigrams.includes(trigram)) {
                let newArray = chosenTrigrams.filter(function (item) {
                  return item !== trigram
                })
                setChosenTrigrams(newArray)
              }
            }}>
              <Text style={styles.gramButtonText}>{trigram.split(' ')[0] + " " + trigram.split(' ')[1] + " " + trigram.split(' ')[2]}</Text>
            </TouchableOpacity>
          )
        )

      case 5:
        return (
          sharedFourgramList?.map(fourgram =>
            <TouchableOpacity style={[styles.gramButtons, chosenFourgrams.includes(fourgram) ? { color: 'white', borderColor: 'black', backgroundColor: 'grey' } : {}]} key={fourgram} onPress={() => {
              if (!chosenFourgrams.includes(fourgram)) {
                setChosenFourgrams(current => [...current, fourgram])

              } else if (chosenFourgrams.includes(fourgram)) {
                let newArray = chosenFourgrams.filter(function (item) {
                  return item !== fourgram
                })
                setChosenFourgrams(newArray)
              }
            }}>
              <Text style={styles.gramButtonText}>{fourgram.split(' ')[0] + " " + fourgram.split(' ')[1] + " " + fourgram.split(' ')[2] + " " + fourgram.split(' ')[3]}</Text>
            </TouchableOpacity>
          )
        )

      default:
        break;
    }

    // if (shuffleGrams) {
    //   let currentIndex = starterGrams.length, randomIndex;
    //   // While there remain elements to shuffle.
    //   while (currentIndex != 0) {
    //     // Pick a remaining element.
    //     randomIndex = Math.floor(Math.random() * currentIndex);
    //     currentIndex--;
    //     // And swap it with the current element.
    //     [grams[currentIndex], grams[randomIndex]] = [
    //       grams[randomIndex], grams[currentIndex]];
    //   }

    //   setShuffleGrams(false)
    // }
  }

  //Calculates percentages for candidate matching

  //calculates match rate for unigram selection
  const calculateUnigramRates = () => {

    let demPercentage = 0, repubPercentage = 0

    chosenUnigrams.forEach(unigram => {
      let demFrequency, repubFrequency

      let demUnigramPosition = demFile.lastIndexOf(`\'${unigram.toLowerCase()}\'`);
      if (demUnigramPosition >= 0) {
        demFrequency = parseInt(demFile.substring(demUnigramPosition + unigram.length + 6, demFile.indexOf("\n", demUnigramPosition + unigram.length + 6)))
      } else if (demUnigramPosition === -1) {
        demUnigramPosition = demFile.lastIndexOf(`\'${unigram.toUpperCase()}\'`);
        if (demUnigramPosition === -1) {
          demFrequency = 0
        } else {
          demFrequency = parseInt(demFile.substring(demUnigramPosition + unigram.length + 6, demFile.indexOf("\n", demUnigramPosition + unigram.length + 6)))
        }
      }

      let repubUnigramPosition = repubFile.lastIndexOf(`\'${unigram.toLowerCase()}\'`);
      if (repubUnigramPosition >= 0) {
        repubFrequency = parseInt(repubFile.substring(repubUnigramPosition + unigram.length + 6, repubFile.indexOf("\n", repubUnigramPosition + unigram.length + 6)))
      } else if (repubUnigramPosition === -1) {
        repubUnigramPosition = repubFile.lastIndexOf(`\'${unigram.toUpperCase()}\'`);
        if (repubUnigramPosition === -1) {
          repubFrequency = 0
        } else {
          repubFrequency = parseInt(repubFile.substring(repubUnigramPosition + unigram.length + 6, repubFile.indexOf("\n", repubUnigramPosition + unigram.length + 6)))
        }
      }

      console.log(`${unigram}: D-${demFrequency}, R-${repubFrequency}`)
      let totalFrequency = demFrequency + repubFrequency;
      demPercentage += (demFrequency / totalFrequency) * 100;
      repubPercentage += (repubFrequency / totalFrequency) * 100;
    });

    setUnigramPercentages({
      Democrat: demPercentage / chosenUnigrams.length,
      Republican: repubPercentage / chosenUnigrams.length
    })

    console.log(`D: ${(demPercentage / chosenUnigrams.length).toFixed(2)}%`)
    console.log(`R: ${(repubPercentage / chosenUnigrams.length).toFixed(2)}%`)

  }

  //calculates match rate for bigram selection
  const calculateBigramRates = () => {
    //initalize percentages
    let demPercentage = 0, repubPercentage = 0

    //loop through array of chosen grams
    chosenBigrams.forEach(bigram => {
      //initialize frequency variables
      let demFrequency, repubFrequency

      for (let i = 0; i < demBigramFrequency.length; i++) {
        if (demBigramFrequency[i].includes(bigram)) {
          demFrequency = demBigramFrequency[i]
          break;
        }
      }

      if (demFrequency) {
        demFrequency = parseInt(demFrequency.split(': ')[1])
      } else {
        demFrequency = 0;
      }


      for (let i = 0; i < repubBigramFrequency.length; i++) {
        if (repubBigramFrequency[i].includes(bigram)) {
          repubFrequency = repubBigramFrequency[i]
          break;
        }
      }

      if (repubFrequency) {
        repubFrequency = parseInt(repubFrequency.split(': ')[1])
      } else {
        repubFrequency = 0
      }



      console.log(`${bigram}: D-${demFrequency}, R-${repubFrequency}`)
      let totalFrequency = demFrequency + repubFrequency;
      demPercentage += (demFrequency / totalFrequency) * 100;
      repubPercentage += (repubFrequency / totalFrequency) * 100;
    });

    setBigramPercentages({
      Democrat: demPercentage / chosenBigrams.length,
      Republican: repubPercentage / chosenBigrams.length
    })

    console.log(`D: ${(demPercentage / chosenBigrams.length).toFixed(2)}%`)
    console.log(`R: ${(repubPercentage / chosenBigrams.length).toFixed(2)}%`)
  }

  //calculates match rate for trigram selection
  const calculateTriGramRates = () => {
    //initalize percentages
    let demPercentage = 0, repubPercentage = 0

    //loop through array of chosen grams
    chosenTrigrams.forEach(trigram => {
      //initialize frequency variables
      let demFrequency, repubFrequency

      for (let i = 0; i < demTrigramFrequency.length; i++) {
        if (demTrigramFrequency[i].includes(trigram)) {
          demFrequency = demTrigramFrequency[i]
          break;
        }
      }

      if (demFrequency) {
        demFrequency = parseInt(demFrequency.split(': ')[1])
      } else {
        demFrequency = 0;
      }


      for (let i = 0; i < repubTrigramFrequency.length; i++) {
        if (repubTrigramFrequency[i].includes(trigram)) {
          repubFrequency = repubTrigramFrequency[i]
          break;
        }
      }

      if (repubFrequency) {
        repubFrequency = parseInt(repubFrequency.split(': ')[1])
      } else {
        repubFrequency = 0
      }



      console.log(`${trigram}: D-${demFrequency}, R-${repubFrequency}`)
      let totalFrequency = demFrequency + repubFrequency;
      demPercentage += (demFrequency / totalFrequency) * 100;
      repubPercentage += (repubFrequency / totalFrequency) * 100;
    });

    setTrigramPercentages({
      Democrat: demPercentage / chosenTrigrams.length,
      Republican: repubPercentage / chosenTrigrams.length
    })

    console.log(`D: ${(demPercentage / chosenTrigrams.length).toFixed(2)}%`)
    console.log(`R: ${(repubPercentage / chosenTrigrams.length).toFixed(2)}%`)
  }

  //calculates match rate for fourgram selection
  const calculateFourGramRates = () => {
    //initalize percentages
    let demPercentage = 0, repubPercentage = 0

    //loop through array of chosen grams
    chosenFourgrams.forEach(fourgram => {
      //initialize frequency variables
      let demFrequency, repubFrequency

      for (let i = 0; i < demFourgramFrequency.length; i++) {
        if (demFourgramFrequency[i].includes(fourgram)) {
          demFrequency = demFourgramFrequency[i]
          break;
        }
      }

      if (demFrequency) {
        demFrequency = parseInt(demFrequency.split(': ')[1])
      } else {
        demFrequency = 0;
      }


      for (let i = 0; i < repubFourgramFrequency.length; i++) {
        if (repubFourgramFrequency[i].includes(fourgram)) {
          repubFrequency = repubFourgramFrequency[i]
          break;
        }
      }

      if (repubFrequency) {
        repubFrequency = parseInt(repubFrequency.split(': ')[1])
      } else {
        repubFrequency = 0
      }



      console.log(`${fourgram}: D-${demFrequency}, R-${repubFrequency}`)
      let totalFrequency = demFrequency + repubFrequency;
      demPercentage += (demFrequency / totalFrequency) * 100;
      repubPercentage += (repubFrequency / totalFrequency) * 100;
    });

    setFourgramPercentages({
      Democrat: demPercentage/chosenFourgrams.length,
      Republican: repubPercentage/chosenFourgrams.length
    })

    console.log(`D: ${(demPercentage / chosenFourgrams.length).toFixed(2)}%`)
    console.log(`R: ${(repubPercentage / chosenFourgrams.length).toFixed(2)}%`)
  }

  const calculateOutcome = () => {

    let demPercentage = 0, repubPercentage = 0;

    //Averages are weighted by the number of grams matched by
    demPercentage = (unigramPercentages.Democrat + 
                      (bigramPercentages.Democrat * 2) +
                        (trigramPercentages.Democrat * 3) + 
                          (fourgramPercentages.Democrat * 4))/(10)

    repubPercentage = (unigramPercentages.Republican + 
                        (bigramPercentages.Republican * 2) +
                          (trigramPercentages.Republican * 3) + 
                            (fourgramPercentages.Republican * 4))/(10)

    if (demPercentage > repubPercentage) {
      setSuggestedCandidate(selectedElection.candidates.democrat)
    } else if ( demPercentage < repubPercentage) {
      setSuggestedCandidate(selectedElection.candidates.republican)
    } else {
      setSuggestedCandidate('Tie')
    }

    setFinalPercentages({
      Democrat: `${demPercentage.toFixed(2)}%`,
      Republican: `${repubPercentage.toFixed(2)}%`
    })
  }

  //Screen Rendering for each step of the assistant

  //called from return when render === 1
  const electionSelection = () => {
    return (
      <>
        <Text style={styles.instruction}>Please select one of the following upcoming elections:</Text>
        <View style={styles.electionsContainer}>
          <ScrollView style={styles.electionsView} showsVerticalScrollIndicator="false">
            {upcomingElections ?
              upcomingElections.map(election =>
                <TouchableOpacity disabled={election.office == "US Senator" && election.district == "New York" ? true : false} id={`${election.type} Election for ${election.office} of ${election.district}`} style={styles.election} key={`${election.type} Election for ${election.office} of ${election.district}`} onPress={() => {
                  setSelectedElection(election);
                }}>
                  <View style={styles.selectButton}>
                    {renderSelectedButtons(election.electionID)}
                  </View>
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
        <View style={styles.submitButtonContainer}>
          <TouchableOpacity onPress={() => {
            if (selectedElection != null) {
              getDemFreqFile()
              getRepubFreqFile()
              setLoading(true)
              setRender(2),
                setChosenUnigrams([])
            } else {
              alert("You have not selected an upcoming election! Please make a selection to continue.")
            }
          }} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>

      </>
    )
  }

  //called from return when render === 2
  const unigramSelection = () => {

    return (
      loading ?
        <View style={styles.loadingView}>
          <ActivityIndicator size="large" color="lightblue"></ActivityIndicator>
        </View>
        :
        <>
          <Text style={styles.instruction}>Please select at least 10 words from the list below that are important to you when choosing who to vote for:</Text>
          <View style={styles.gramsContainer}>
            <ScrollView contentContainerStyle={{
              width: '100%',
              flexDirection: 'row',
              flexWrap: 'wrap',
              paddingBottom: 20
            }} style={styles.gramsView} showsVerticalScrollIndicator="false">
              {renderGrams()}
            </ScrollView>
            <Text style={[styles.wordCount, chosenUnigrams.length >= 10 ? { color: 'green' } : { color: 'red' }]}>{chosenUnigrams.length}/10</Text>
          </View>
          <View style={styles.submitButtonContainer}>
            <TouchableOpacity onPress={() => {
              if (chosenUnigrams.length >= 10) {
                setLoading(true)
                calculateUnigramRates()
                setRender(3)
              } else {
                alert("You have not selected enough terms. Please be sure to select at least 10 words before pressing continue")
              }
            }} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>

        </>

    )
  }

  //called from return when render === 3
  const bigramSelection = () => {
    return (
      loading ?
        <View style={styles.loadingView}>
          <ActivityIndicator size="large" color="lightblue"></ActivityIndicator>
        </View>
        :
        <>
          <Text style={styles.instruction}>Please select at least 10 phrases from the list below that are important to you when choosing who to vote for:</Text>
          <View style={styles.gramsContainer}>
            <ScrollView contentContainerStyle={{
              width: '100%',
              flexDirection: 'row',
              flexWrap: 'wrap',
              paddingBottom: 20
            }} style={styles.gramsView} showsVerticalScrollIndicator="false">
              {renderGrams()}
            </ScrollView>
            <Text style={[styles.wordCount, chosenBigrams.length >= 10 ? { color: 'green' } : { color: 'red' }]}>{chosenBigrams.length}/10</Text>
          </View>
          <View style={styles.submitButtonContainer}>
            <TouchableOpacity onPress={() => {
              if (chosenBigrams.length >= 10) {
                setLoading(true)
                // setShuffleGrams(true)
                calculateBigramRates()
                setRender(4)
              } else {
                alert("You have not selected enough terms. Please be sure to select at least 10 words before pressing continue")
              }
            }} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>

        </>

    )
  }

  //called from return when render === 4
  const trigramSelection = () => {
    return (
      <>
        <Text style={styles.instruction}>Please select at least 10 phrases from the list below that are important to you when choosing who to vote for:</Text>
        <View style={styles.electionsContainer}>
          <ScrollView contentContainerStyle={{
            width: '100%',
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingBottom: 20
          }} style={styles.gramsView} showsVerticalScrollIndicator="false">
            {renderGrams()}
          </ScrollView>
          <Text style={[styles.wordCount, chosenTrigrams.length >= 10 ? { color: 'green' } : { color: 'red' }]}>{chosenTrigrams.length}/10</Text>
        </View>
        <View style={styles.submitButtonContainer}>
          <TouchableOpacity onPress={() => {
            if (selectedElection != null) {
              setLoading(true)
              calculateTriGramRates()
              setRender(5)
            } else {
              alert("You have not selected enough terms. Please be sure to select at least 10 words before pressing continue")
            }
          }} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>

      </>
    )
  }

  //called from return when render === 5
  const fourGramSelection = () => {
    return (
      <>
        <Text style={styles.instruction}>Please select at least 10 phrases from the list below that are important to you when choosing who to vote for:</Text>
        <View style={styles.electionsContainer}>
          <ScrollView ontentContainerStyle={{
            width: '100%',
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingBottom: 20
          }} style={styles.gramsView} showsVerticalScrollIndicator="false">
            {renderGrams()}
          </ScrollView>
          <Text style={[styles.wordCount, chosenFourgrams.length >= 10 ? { color: 'green' } : { color: 'red' }]}>{chosenFourgrams.length}/10</Text>
        </View>
        <View style={styles.submitButtonContainer}>
          <TouchableOpacity onPress={() => {
            if (selectedElection != null) {
              setLoading(true)
              calculateFourGramRates()
              setRender(6)
            } else {
              alert("You have not selected enough terms. Please be sure to select at least 10 words before pressing continue")
            }
          }} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>

      </>
    )
  }

  //called from return when render === 6
  const candidateOutcome = () => {
    return (
      <>
        <Text style={[styles.instruction, { height: 50, width: '91%' }]}>Based on your selections, for the upcoming {selectedElection.type} Election for {selectedElection.office} of {selectedElection.district}, we suggest:</Text>
        <View style={styles.outcomeContainer}>
          <View style={styles.outcomeView} showsVerticalScrollIndicator="false">
            {suggestedCandidate?.candidatePhoto &&
            <TouchableOpacity style={[styles.suggestedCandidateImgContainer, suggestedCandidate?.party === "Democrat" ? {borderColor: 'rgb(83, 159, 231)'} : suggestedCandidate?.party === "Republican" ? {borderColor: "rgb(255,75,75)"} : {borderColor: 'purple'}]}
            onPress={() => navigation.navigate("CandidateProfile",
            { firstName: suggestedCandidate.firstName, lastName: suggestedCandidate.lastName, party: suggestedCandidate.party, candidatePhoto: suggestedCandidate.candidatePhoto, inOffice: suggestedCandidate.inOffice, campaignSiteURL: suggestedCandidate.campaignSiteURL, title: suggestedCandidate.title, subtitle: suggestedCandidate.subtitle, district: suggestedCandidate.district, phoneNumber: suggestedCandidate.phoneNumber, email: suggestedCandidate.email, bio: suggestedCandidate.bio })}>
              <CacheImage style={styles.suggestedCandidateImg} uri={suggestedCandidate?.candidatePhoto}></CacheImage>
            </TouchableOpacity>
            }
            <View style={styles.outcomeCandidateInfo}>
              <Text style={styles.outcomeCandidateName}>{suggestedCandidate?.firstName} {suggestedCandidate?.lastName}</Text>
              <Text style={[styles.outcomeCandidateParty, suggestedCandidate?.party === "Democrat" ? {color: 'rgb(83, 159, 231)'} : suggestedCandidate?.party === "Republican" ? {color: "rgb(255,75,75)"} : {color: 'purple'}]}>{suggestedCandidate?.party}</Text>
              <Text style={styles.outcomeCandidatePercentMatch}>{suggestedCandidate?.party === 'Democrat' ? finalPercentages?.Democrat : finalPercentages?.Republican} match</Text>
            </View>
              
          </View>
        </View>
        <View style={[styles.submitButtonContainer, { height: '15.5%' }]}>
          <TouchableOpacity onPress={() => {
            if (selectedElection != null) {
              setLoading(true)
              setRender(1)
              setSelectedElection(null)
              setChosenBigrams([])
              setChosenUnigrams([])
              setChosenFourgrams([])
              setChosenUnigrams([])
              setUnigramPercentages(null)
              setBigramPercentages(null)
              setTrigramPercentages(null)
              setFourgramPercentages(null)
              setSuggestedCandidate(null)
              setFinalPercentages(null)
            }
          }} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Start Over</Text>
          </TouchableOpacity>
        </View>

      </>
    )
  }



  //rendering selection buttons for select election
  const renderSelectedButtons = (electionID) => {
    if (electionID === selectedElection?.electionID) {
      return (
        <Octicons name="check-circle-fill" size={22} color="green" />
      )
    } else {
      return (
        <View style={{ height: 22, width: 22, borderRadius: 11, borderWidth: 2, borderColor: 'black' }}></View>
      )
    }
  }

  return (
    <SafeAreaView style={styles.viewContainer}>
      <View style={styles.headerContainer}>
        <Text style={[{ color: 'rgb(83, 159, 231)', shadowColor: 'rgb(150,200,250)' }, styles.title]}>Civic </Text>
        <Text style={[{ color: 'rgb(255,80,80)', shadowColor: 'rgb(255,200,200)' }, styles.title]}>Assistant</Text>
      </View>
      {render > 1 &&
        <TouchableOpacity style={{ position: 'absolute', top: 65, left: 20 }} onPress={() => {
          switch (render) {
            case 2:
              setDemFile(null);
              setRepubFile(null);
              setChosenUnigrams([]);
              break;
            case 3:
              setSharedBigramList([]);
              setDemBigramFrequency([]);
              setRepubBigramFrequency([]);
              setChosenBigrams([]);
              break;
            case 4:
              setSharedTrigramList([]);
              setDemTrigramFrequency([]);
              setRepubTrigramFrequency([]);
              setChosenTrigrams([]);
              break;
            case 5:
              setSharedFourgramList([]);
              setDemFourgramFrequency([]);
              setRepubFourgramFrequency([]);
              setChosenFourgrams([]);
              break;
            case 6:
              break;
          }
          setRender(render - 1);
        }}>
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
                  render === 6 &&
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
  loadingView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '95%',
    width: '100%'
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
    marginTop: 15,
    fontWeight: '600',
    height: '5%',
    width: '95%'
  },
  submitButtonContainer: {
    height: '17%',
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
    width: '13%',
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
  },

  //Grams
  gramsContainer: {
    paddingTop: 5,
    height: '75%',
    width: '100%',
    alignItems: 'center',
    marginTop: 10
  },
  gramsView: {
    height: '100%',
    marginTop: 10,
    backgroundColor: 'rgb(230,230,230)',
    padding: 10,
    borderRadius: 15,
    width: '95%',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  gramButtons: {
    alignSelf: 'flext-start',
    paddingHorizontal: 15,
    paddingVertical: 7,
    backgroundColor: 'lightgrey',
    borderRadius: 30,
    borderColor: 'grey',
    borderWidth: 2,
    margin: 3
  },
  gramButtonText: {
    fontSize: 14,
    textTransform: 'uppercase',
    fontWeight: '600'
  },
  wordCount: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    fontSize: 20,
    fontWeight: '800'
  },

  //outcome
  outcomeContainer: {
    height: '75%',
    width: '100%'
  },
  outcomeView: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  suggestedCandidateImgContainer: {
    height: '65%',
    aspectRatio: 1,
    borderRadius: 600,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: '7.5',
    marginBottom: 20
  },
  suggestedCandidateImg: {
    height: '97%',
    width: '97%',
    borderRadius: '600'
  },
  outcomeCandidateInfo: {
    height: '25%',
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center'
  },
  outcomeCandidateName: {
    textAlign: 'center',
    fontSize: 45,
    fontWeight: '800'
  },
  outcomeCandidateParty: {
    textAlign: 'center',
    fontSize: 30,
    textTransform: 'uppercase',
    fontWeight: '700'
  },
  outcomeCandidatePercentMatch: {
    textAlign: 'center',
    textAlign: 'center',
    fontSize: 45,
    fontWeight: '200',
    marginTop: 10
  }
  
})