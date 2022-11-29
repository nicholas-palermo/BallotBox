import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from './Screens/DashboardScreen';
import ProfileScreen from './Screens/ProfileScreen';
import LoginScreen from './Screens/LoginScreen';
import SignUpOneScreen from './Screens/SignUpOneScreen';
import SignUpTwoScreen from './Screens/SignUpTwoScreen';
import SignUpThreeScreen from './Screens/SignUpThreeScreen';
import useAuth from './hooks/useAuth';
import SettingsScreen from './Screens/SettingsScreen';
import CandidateProfileScreen from './Screens/CandidateProfileScreen';
import ElectionInfoScreen from './Screens/ElectionInfoScreen';
import CivicAssistantScreen from './Screens/CivicAssistantScreen';
import MyBallotScreen from './Screens/MyBallotScreen';

//TabBar Icon Imports
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

//Home Tab
const Home = createStackNavigator();
const HomeStackNavigator = () => {
    return (
        <Home.Navigator>
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="CandidateProfile" component={CandidateProfileScreen} />
            <Stack.Screen name="ElectionInfo" component={ElectionInfoScreen} />
            <Stack.Screen name="CivicAssistant" component={CivicAssistantScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} options={{ gestureDirection: 'horizontal-inverted' }} />
        </Home.Navigator>
    )
}

//My Ballot Tab
const MyBallot = createStackNavigator();
const MyBallotStackNavigator = () => {
    return (
        <MyBallot.Navigator>
            <MyBallot.Screen name="MyBallot" component={MyBallotScreen} options={{headerShown: false}}></MyBallot.Screen>
        </MyBallot.Navigator>
    )
}

//Navigator for Tab Nav
const Tab = createBottomTabNavigator();
const TabNaviagtor = () => {

    return (
        <Tab.Navigator screenOptions={{
            tabBarStyle: {
                height: 70,
                backgroundColor: 'rgb(240,240,240)',
                borderTopWidth: 1,
                paddingBottom: 20
            },
            tabBarShowLabel: false
        }}>
            <Tab.Screen name="Home" component={HomeStackNavigator} options={{
                headerShown: false,
                tabBarIcon: () => {
                    return(
                        <Ionicons name="home" size={24} color="black" />
                    )
                }
                
                }}/>
            <Tab.Screen name="Ballot" component={MyBallotStackNavigator} options={{
                headerShown: false,
                tabBarIcon: () => {
                    return(
                        <MaterialIcons name="ballot" size={24} color="black" />
                    )
                }
                
                }}/>
        </Tab.Navigator>
    )
}

//Containing Navigator passed to App.js
const Stack = createStackNavigator();
const StackNavigator = () => {

    const { user } = useAuth();

    return (
        <Stack.Navigator>
            {user ? (
                <>
                    <Stack.Screen name="Tab" component={TabNaviagtor} options={{headerShown: false}}/>
                </>
            ) : (
                <>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name='SignUpOne' component={SignUpOneScreen} />
                    <Stack.Screen name='SignUpTwo' component={SignUpTwoScreen} />
                    <Stack.Screen name='SignUpThree' component={SignUpThreeScreen} />
                </>
            )}
        </Stack.Navigator>
    );
};

export default StackNavigator