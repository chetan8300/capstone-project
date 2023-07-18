import { View, TouchableOpacity, Switch, Modal } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Surface, Text, useTheme, Appbar, TextInput, Divider} from 'react-native-paper'
import React, { useState, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { TimePickerModal } from 'react-native-paper-dates';

// Common Components
import hoc from '../../components/HOC'
import styles from './styles'

const SettingsScreen = ({ hideOption = false }) => {
  const navigation = useNavigation();
 
  const [waterNotificationEnabled, setWaterNotificationEnabled] = useState(false);
  const [workoutNotificationEnabled, setWorkoutNotificationEnabled] = useState(false);
  const [workoutTime, setWorkoutTime] = useState('');
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
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
  }, [waterNotificationEnabled, workoutNotificationEnabled]
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
        body: 'Time to drink water!',
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
    selectedTime = workoutTime;
    const triggerTime = new Date();
    triggerTime.setHours(selectedTime.hours);
    triggerTime.setMinutes(selectedTime.minutes);
    triggerTime.setSeconds(0);

    const triggerInSeconds = triggerTime.getTime() / 1000;

    await Notifications.cancelAllScheduledNotificationsAsync();
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Workout Reminder',
        body: 'Time for a workout!',
      },
      trigger: {
        seconds: triggerInSeconds - Date.now() / 1000,
        repeats: false,
      },
    });
    console.log('Workout notifications enabled');
    // console.log('Trigger in hours:', selectedTime.hours);
    // console.log('Trigger in minutes:', selectedTime.minutes);
    // console.log('Trigger in seconds:', triggerInSeconds);
    // console.log("workoutTime", workoutTime)
  } catch (error) {
    console.log('Error in workout notifications:', error);
  }
};

// Disable workout notifications
const disableWorkoutNotifications = async () => {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    console.log('Workout notifications disabled');
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

  const handleTimePickerConfirm = (time) => {
    setWorkoutTime(time);
    setTimePickerVisible(false);
    enableWorkoutNotifications();
  };

  const formatTime = (time) => {
    if (time) {
      const { hours, minutes } = time;
      return `${hours}:${minutes}`;
    }
    return '';
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
      <Divider />
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
            <Divider />
            <View style={styles.notificationSettingRow}>
              <Text style={styles.settingLabel}>Water Intake Notifications:</Text>
              <Switch
                trackColor={{ false: '#f0f0f0', true: '#f0f0f0' }}
                thumbColor={waterNotificationEnabled ? '#4e32bc' : '#f0f0f0'}
                onValueChange={(value) => setWaterNotificationEnabled(value)}
                value={waterNotificationEnabled}
              />
            </View>
            <Divider />
            <View style={styles.notificationSettingRow}>
              <Text style={styles.settingLabel}>Workout Notifications:</Text>
              <Switch
                trackColor={{ false: '#f0f0f0', true: '#f0f0f0' }}
                thumbColor={workoutNotificationEnabled ? '#4e32bc' : '#f0f0f0'}
                onValueChange={(value) => setWorkoutNotificationEnabled(value)}
                value={workoutNotificationEnabled}
              />
            </View>

            {workoutNotificationEnabled && (
              <TouchableOpacity onPress={() => setTimePickerVisible(true)}>
                <View style={styles.optionContainer}>
                  <Text style={styles.optionLabel}>Workout Time</Text>
                  {workoutTime ? (
                    <Text style={styles.timeText}>{formatTime(workoutTime)}</Text>
                  ) : (
                    <Text style={styles.placeholderText}>Select Time</Text>
                  )}
                </View>
              </TouchableOpacity>
           )}
            <TimePickerModal 
                visible={isTimePickerVisible}
                onDismiss={() => setTimePickerVisible(false)}
                onConfirm={handleTimePickerConfirm}
                label="Select Time"
                 mode="time"
            />
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default hoc(SettingsScreen)