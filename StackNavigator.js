import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './Screens/HomeScreen';
import { ScreenStackHeaderLeftView } from 'react-native-screens';
import LoginScreen from './Screens/LoginScreen';
import SignUpScreen from './Screens/SignUpScreen';
import useAuth from './hooks/useAuth';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {

    const { user } = useAuth();
 
    return (
        <Stack.Navigator>
            {user ? (
                <>
                    <Stack.Screen name="Home" component={HomeScreen} />
                </>
            ) : (
                <>
                    <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
                    <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUpScreen} />
                </>
            )}
        </Stack.Navigator>
    );
  };

export default StackNavigator