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
import CalculateBMIScreen from '../CalculateBMI';

// Components
import MainAppDrawer from '../../components/MainAppDrawer';
import WaterTrackerScreen from '../WaterIntake';
const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="Training"
      activeColor="#000080"
      inactiveColor="#555"
      barStyle={{ backgroundColor: '#fff' }}
    >
      <Tab.Screen
        name="Training"
        component={TrainingScreen}
        options={{
          tabBarLabel: 'Training',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="timer" color={color} size={23} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{
          tabBarLabel: 'Discover',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="compass" color={color} size={23} />
          ),
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
      /> */}
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
      {/* <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-settings" color={color} size={23} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  )
}

const MainAppDrawerScreen = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <MainAppDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#4e32bc',
        drawerActiveTintColor: 'white',
        drawerInactiveTintColor: 'black',
        drawerStyle: {
          backgroundColor: '#fff'
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
    </Drawer.Navigator>
  )
}

export default MainAppDrawerScreen