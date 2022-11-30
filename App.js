import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import StackNavigator from "./StackNavigator";
import { LogBox } from 'react-native';
import { AuthProvider } from "./hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function App() {
  LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from \'@react-native-async-storage/async-storage\' instead of \'react-native\'. See https://github.com/react-native-async-storage/async-storage']);

  return (
      <NavigationContainer>
        <AuthProvider>
          <StackNavigator />
        </AuthProvider>
      </NavigationContainer>
  );
}