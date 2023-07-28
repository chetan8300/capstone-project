// Navigation
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Screens
import SettingsScreen from '../Settings'
import TrainingScreen from '../Training'
import DiscoverScreen from '../Discover'
import ReportsScreen from '../Reports'
import AchievementsScreen from '../Achievements'
import CalculateBMIScreen from '../CalculateBMI';

// Components
import MainAppDrawer from '../../components/MainAppDrawer';
import WaterTrackerScreen from '../WaterIntake';
import WeightTrackerScreen from '../WeightTracker';
import { useContext } from 'react';
import DarkModeContext from '../../utils/DarkModeContext';
const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();

const HomeScreen = () => {
  const { isDarkMode } = useContext(DarkModeContext);

  let textStyle = [{ color: "#4e32bc" }];
	let textBodyStyle = [{ color: "#4e32bc" }];
	let whiteColor = [{color: "#4e32bc"}]
	let cardBackground = [{}]

	if (isDarkMode) {
		textStyle = [{ color: "#F0DBFF" }];
		textBodyStyle = [{ color: "#fff" }];
		blackColor = [{ color: "#000" }];
		cardBackground = [{backgroundColor: "#9EA2E5"}]
	}

  return (
    <Tab.Navigator
      initialRouteName="Training"
      activeColor= {!isDarkMode ? "#000" : "#fff"}
      inactiveColor={!isDarkMode ? "#555" : "#fff"}
      barStyle={{ backgroundColor: !isDarkMode ? "#fff" : '#000' }}
    >
      <Tab.Screen
        name="Training"
        component={TrainingScreen}
        options={{
          tabBarLabel: 'Training',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="timer" style={[{ color: color}]} size={23} />
          ),
          // activeTintColor: "red",
          // inactiveTintColor: {},
        }}
      />
      <Tab.Screen
        name="Reports"
        component={ReportsScreen}
        options={{
          tabBarLabel: 'Reports',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="bar-chart" color={color} size={23} />
          ),
        }}
      /> 
      <Tab.Screen
        name="CalculateBMI"
        component={CalculateBMIScreen}
        options={{
          tabBarLabel: 'BMI',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="compass" color={color} size={23} />
          ),
          tabBarVisible:false
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-settings" color={color} size={23} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const MainAppDrawerScreen = () => {
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <Drawer.Navigator
      drawerContent={props => <MainAppDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: isDarkMode ? '#fff' : '#4e32bc',
        drawerActiveTintColor: isDarkMode ? "#000" : 'white',
        drawerInactiveTintColor: isDarkMode ? "#fff" : 'black',
        drawerStyle: {
          backgroundColor: isDarkMode ? "#000" : '#fff'
        }
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home' }} 
      />
      <Drawer.Screen
        name="Water Intake Tracker"
        component={WaterTrackerScreen}
        options={{ title: 'Water Intake Tracker' }}
        />
        <Drawer.Screen
        name="Weight Tracker"
        component={WeightTrackerScreen}
        options={{ title: 'Weight Tracker' }}
        />
      <Drawer.Screen
        name="Achievements"
        component={AchievementsScreen}
        options={{ title: 'Achievements' }}
      />
    </Drawer.Navigator>
  )
}

export default MainAppDrawerScreen