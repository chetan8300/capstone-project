import 'react-native-gesture-handler';

import React, { useCallback } from 'react';

// React Native & Expo Components
import { StatusBar as StatusBarExpo } from 'expo-status-bar';
import { View, Platform, StatusBar } from 'react-native';
import { MD3LightTheme as DefaultTheme, PaperProvider, configureFonts } from 'react-native-paper';
import { RootSiblingParent } from 'react-native-root-siblings';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_900Black,
  Montserrat_400Regular_Italic,
} from '@expo-google-fonts/montserrat';

// Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

// Screens
import MainAppScreens from './src/screens/Home';
import WorkoutPreferenceScreen from './src/screens/WorkoutPreference';
import WorkoutWeeksListScreen from './src/screens/WorkoutWeeksList';
import DayExercisesListScreen from './src/screens/DayExercisesList';
import StartWorkoutScreen from './src/screens/StartWorkout';

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

const fontConfig = {
  default: {
    regular: {
      fontFamily: 'Montserrat',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Montserrat',
      fontWeight: 'bold',
    },
    light: {
      fontFamily: 'Montserrat',
      fontWeight: 'light',
    },
    thin: {
      fontFamily: 'Montserrat',
      fontWeight: 'normal',
    },
  },
};

const theme = {
  ...DefaultTheme,
  fonts: configureFonts(fontConfig),
  colors: {
    ...DefaultTheme.colors,
    primary: '#4e32bc',
    secondary: '#ffda19',
  },
};

const App = () => {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black,
    Montserrat_400Regular_Italic,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <PaperProvider theme={theme}>
        <RootSiblingParent>
          {Platform.OS === 'android' ? (
            <StatusBar
              barStyle="dark-content"
            />
          ) : null}
          <NavigationContainer>
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
              <Stack.Screen
                name="WorkoutWeeksList"
                component={WorkoutWeeksListScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="DayExercisesList"
                component={DayExercisesListScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="StartWorkout"
                component={StartWorkoutScreen}
                options={{
                  headerShown: false,
                  gestureEnabled: false
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
          <StatusBarExpo style="auto" />
        </RootSiblingParent>
      </PaperProvider>
    </View>
  );
}

export default App;