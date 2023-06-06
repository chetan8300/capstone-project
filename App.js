import 'react-native-gesture-handler';

// React Native & Expo Components
import { StatusBar } from 'expo-status-bar';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';

// Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

// Screens
import MainAppScreens from './src/screens/Home';
import WorkoutPreferenceScreen from './src/screens/WorkoutPreference';

const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4e32bc',
    secondary: '#ffda19',
  },
};

const App = () => {
  return (
    <PaperProvider theme={theme}>
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
    </PaperProvider>
  );
}

export default App;