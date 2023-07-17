import { View, TouchableOpacity, Switch, Modal } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Surface, Text, useTheme, Appbar, TextInput} from 'react-native-paper'
import React, { useState, useEffect } from 'react';
import * as Notifications from 'expo-notifications';


// Common Components
import hoc from '../../components/HOC'
import styles from './styles'

const SettingsScreen = ({ hideOption = false }) => {
  const navigation = useNavigation();
 
  const [waterNotificationEnabled, setWaterNotificationEnabled] = useState(false);
  const [workoutNotificationEnabled, setWorkoutNotificationEnabled] = useState(false);
  const [waterTime, setWaterTime] = useState('');
  const [workoutTime, setWorkoutTime] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

useEffect(() => {
  registerForPushNotificationsAsync();
  configureNotificationHandling();
    if (waterNotificationEnabled) {
      enableWaterNotifications();
    } else {
      disableWaterNotifications();
    }
    if (workoutNotificationEnabled) {
      enableWorkoutNotifications(workoutTime);
    } else {
      disableWorkoutNotifications();
    }
  }, [waterNotificationEnabled, workoutNotificationEnabled, workoutTime]
);

const registerForPushNotificationsAsync = async () => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.log('Permission denied.');
    return;
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log('token:', token);
};

const configureNotificationHandling = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  Notifications.addNotificationReceivedListener(handleNotification);
};

const handleNotification = () => {
  console.log('Notification received');
};

// Enable water notifications
const enableWaterNotifications = async () => {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Water Intake Reminder',
        body: 'Remember to drink water!',
      },
      trigger: {
        seconds: 10,
        repeats: false,
      },
    });
    console.log('Water notifications enabled');
  } catch (error) {
    console.log('Error in water notifications', error);
  }
};

// Disable water notifications
const disableWaterNotifications = async () => {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    console.log('Water notifications disabled');
  } catch (error) {
    console.log('Error disabling water notifications:', error);
  }
};

// Enable workout notifications
const enableWorkoutNotifications = async (selectedTime) => {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Workout Reminder',
        body: 'Time for a workout!',
      },
      trigger: {
        seconds: selectedTime * 60,
        repeats: true,
      },
    });
  } catch (error) {
    console.log('Error in workout notifications:', error);
  }
};

// Disable workout notifications
const disableWorkoutNotifications = async () => {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch (error) {
    console.log('Error disabling workout notifications:', error);
  }
};

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={{ flex: 1, paddingLeft: 16, paddingRight: 16, width: "100%"}}>
        <View style={styles.headerMain}>
          <View>
            {!hideOption &&
              <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <MaterialCommunityIcons name="menu" size={28} color="black" />
              </TouchableOpacity>
            }
          </View>
          <View style={styles.header}>
            <Text variant="headlineSmall" style={styles.name}>Settings</Text>
          </View>
      </View>
      <TouchableOpacity style={styles.settingRow} onPress={handleOpenModal}>
        <MaterialCommunityIcons name="bell-outline" size={24} color="#4e32bc" />
        <Text style={styles.settingsTitle}>Notifications</Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Notification Settings</Text>
              <TouchableOpacity style={styles.modalCloseButton} onPress={handleCloseModal}>
                <Text style={styles.modalCloseButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.notificationSettingRow}>
              <Text style={styles.settingLabel}>Water Intake Notifications:</Text>
              <Switch
                trackColor={{ false: '#f0f0f0', true: '#f0f0f0' }}
                thumbColor={waterNotificationEnabled ? '#4e32bc' : '#f0f0f0'}
                onValueChange={(value) => setWaterNotificationEnabled(value)}
                value={waterNotificationEnabled}
              />
            </View>
            <View style={styles.notificationSettingRow}>
              <Text style={styles.settingLabel}>Workout Notifications:</Text>
              <Switch
                thumbColor={workoutNotificationEnabled ? '#4e32bc' : '#f0f0f0'}
                trackColor={{ false: '#f0f0f0', true: '#f0f0f0' }}
                onValueChange={(value) => setWorkoutNotificationEnabled(value)}
                value={workoutNotificationEnabled}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default hoc(SettingsScreen)