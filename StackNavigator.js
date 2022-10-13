import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './Screens/HomeScreen';
import { ScreenStackHeaderLeftView } from 'react-native-screens';
import LoginScreen from './Screens/LoginScreen';
import SignUpOneScreen from './Screens/SignUpOneScreen';
import SignUpTwoScreen from './Screens/SignUpTwoScreen';
import SignUpThreeScreen from './Screens/SignUpThreeScreen';
import useAuth from './hooks/useAuth';
import SettingsScreen from './Screens/SettingsScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {

    const { user } = useAuth();
 
    return (
        <Stack.Navigator>
            {user ? (
                <>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Settings" component={SettingsScreen} />
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