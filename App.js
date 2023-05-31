import 'react-native-gesture-handler';

import { Fragment } from 'react';

// React Native & Expo Components
import { StatusBar } from 'expo-status-bar';

// Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

// Screens
import MainAppScreens from './src/screens/Home';
import WorkoutPreferenceScreen from './src/screens/WorkoutPreference';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator>
        <Stack.Screen
          name="WorkoutPreference"
          component={WorkoutPreferenceScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainApp"
          component={MainAppScreens}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;