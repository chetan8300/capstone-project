import React, { useState, useEffect, useContext } from "react";

import { View, TouchableOpacity, Switch, Modal } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, Divider } from "react-native-paper";
import * as Notifications from "expo-notifications";
import { TimePickerModal } from "react-native-paper-dates";

// Common Components
import hoc from "../../components/HOC";
import styles from "./styles";
import DarkModeContext from "../../utils/DarkModeContext";

const SettingsScreen = ({ hideOption = false }) => {
  const navigation = useNavigation();
  const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);

  const [waterNotificationEnabled, setWaterNotificationEnabled] = useState(false);
  const [workoutNotificationEnabled, setWorkoutNotificationEnabled] = useState(false);
  const [weightInputNotificationEnabled, setWeightInputNotificationEnabled] = useState(false);
  const [workoutTime, setWorkoutTime] = useState("");
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  let mainViewStyle = [styles.lightBackground];
  let textStyle = [{ color: "#4e32bc" }];
  let textBodyStyle = [{ color: "#000" }];

  if (isDarkMode) {
    mainViewStyle = [styles.darkBackground];
    textStyle = [{ color: "#F0DBFF" }];
    textBodyStyle = [{ color: "#fff" }];
    textheadingStyle = [{ color: "#FBF6FF" }];
    buttonStyle = [{ backgroundColor: "#4e32bc", borderColor: "#4e32bc" }];
    cardBackground = [{ backgroundColor: "#555" }]
  }

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
    if (weightInputNotificationEnabled) {
      enableWeightInputNotification();
    } else {
      disableWeightInputNotification();
    }
  }, [
    waterNotificationEnabled,
    workoutNotificationEnabled,
    weightInputNotificationEnabled,
  ]);

  const registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      console.log("Permission denied.");
      return;
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data;
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
    console.log("Notification received");
  };

  // Enable water notifications
  const enableWaterNotifications = async () => {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Water Intake Reminder",
          body: "Time to drink water!",
        },
        trigger: {
          seconds: 10,
          repeats: false,
        },
      });
      console.log("Water notifications enabled");
    } catch (error) {
      console.log("Error in water notifications", error);
    }
  };

  // Disable water notifications
  const disableWaterNotifications = async () => {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
      console.log("Water notifications disabled");
    } catch (error) {
      console.log("Error disabling water notifications:", error);
    }
  };

  // Enable workout notifications
  const enableWorkoutNotifications = async (selectedTime) => {
    try {
      const triggerTime = new Date();
      triggerTime.setHours(selectedTime.hours);
      triggerTime.setMinutes(selectedTime.minutes);
      triggerTime.setSeconds(0);

      const triggerInSeconds = triggerTime.getTime() / 1000;

      await Notifications.cancelAllScheduledNotificationsAsync();
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Workout Reminder",
          body: "Time for a workout!",
        },
        trigger: {
          seconds: triggerInSeconds - Date.now() / 1000,
          repeats: false,
        },
      });
      console.log("Workout notifications enabled");
      // console.log('Trigger in hours:', selectedTime.hours);
      // console.log('Trigger in minutes:', selectedTime.minutes);
      // console.log('Trigger in seconds:', triggerInSeconds);
    } catch (error) {
      console.log("Error in workout notifications:", error);
    }
  };

  // Disable workout notifications
  const disableWorkoutNotifications = async () => {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
      console.log("Workout notifications disabled");
    } catch (error) {
      console.log("Error disabling workout notifications:", error);
    }
  };

  // Enable Weekly Weight Input Notifications

  const enableWeightInputNotification = async () => {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
      const triggerTime = new Date();
      triggerTime.setSeconds(0);
      triggerTime.setDate(triggerTime.getDate() + (7 - triggerTime.getDay()));

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Weight Input Reminder",
          body: "Remember to input your weight for this week!",
        },
        trigger: {
          seconds: triggerTime.getTime() - Date.now(),
          repeats: true,
        },
      });

      console.log("Weight input notification enabled");
    } catch (error) {
      console.log("Error enabling weight input notification:", error);
    }
  };

  // Disable Weekly Weight Input Notifications

  const disableWeightInputNotification = async () => {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
      console.log("Weight input notification disabled");
    } catch (error) {
      console.log("Error disabling weight input notification:", error);
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
    enableWorkoutNotifications(time);
  };

  const formatTime = (time) => {
    if (time) {
      const { hours, minutes } = time;
      return `${hours}:${minutes}`;
    }
    return "";
  };

  const saveThemeValue = async (newValue) => {
    try {
      const jsonValue = JSON.stringify(newValue);
      await AsyncStorage.setItem("@themeValue:isDarkMode", jsonValue);
    } catch (error) {
      console.log("Error saving history: ", error);
    }
  };

  const onToggleSwitch = () => {
    saveThemeValue(!isDarkMode);
    setIsDarkMode(!isDarkMode);
  };

  return (
    <View style={[{ flex: 1, paddingLeft: 16, paddingRight: 16, width: "100%" }, mainViewStyle]}>
      <View style={styles.headerMain}>
        <View>
          {!hideOption && (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()} >
              <MaterialCommunityIcons name="menu" size={28} style={[textStyle]} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.header}>
          <Text variant="headlineLarge" style={[styles.name, textStyle,]}>
            Settings
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.settingRow} onPress={handleOpenModal}>
        <MaterialCommunityIcons name="bell-outline" size={24} style={[textBodyStyle]} />
        <Text style={[styles.settingsTitle, textBodyStyle]}>Notifications</Text>
      </TouchableOpacity>
      <Divider />
      <View style={styles.settingRow}>
        <View>
          <MaterialCommunityIcons
            name="swap-horizontal"
            size={24}
            style={[textBodyStyle]}
          />
        </View>
        <View style={styles.themeContainer}>
          <Text style={[styles.settingsTitle, textBodyStyle]}>Change Theme</Text>
          <Switch
            style={styles.themeSwitch}
            value={isDarkMode}
            onValueChange={onToggleSwitch}
          ></Switch>
        </View>
      </View>
      <Divider />
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={[styles.modalContainer]}>
          <View style={[styles.modalContent, !isDarkMode ? styles.modalContentLight : styles.modalContentDark]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, textBodyStyle]}>Notification Settings</Text>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={handleCloseModal}
              >
                <Text style={styles.modalCloseButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
            <Divider />
            <View style={styles.notificationSettingRow}>
              <Text style={[styles.settingLabel, textBodyStyle]}>
                Water Intake Notifications:
              </Text>
              <Switch
                trackColor={{ false: "#f0f0f0", true: "#f0f0f0" }}
                thumbColor={waterNotificationEnabled ? "#4e32bc" : "#f0f0f0"}
                onValueChange={(value) => setWaterNotificationEnabled(value)}
                value={waterNotificationEnabled}
              />
            </View>
            <Divider />
            <View style={styles.notificationSettingRow}>
              <Text style={[styles.settingLabel, textBodyStyle]}>
                Weekly Weight Notifications:
              </Text>
              <Switch
                trackColor={{ false: "#f0f0f0", true: "#f0f0f0" }}
                thumbColor={
                  weightInputNotificationEnabled ? "#4e32bc" : "#f0f0f0"
                }
                onValueChange={(value) =>
                  setWeightInputNotificationEnabled(value)
                }
                value={weightInputNotificationEnabled}
              />
            </View>
            <Divider />
            <View style={styles.notificationSettingRow}>
              <Text style={[styles.settingLabel, textBodyStyle]}>Workout Notifications:</Text>
              <Switch
                trackColor={{ false: "#f0f0f0", true: "#f0f0f0" }}
                thumbColor={workoutNotificationEnabled ? "#4e32bc" : "#f0f0f0"}
                onValueChange={(value) => setWorkoutNotificationEnabled(value)}
                value={workoutNotificationEnabled}
              />
            </View>

            {workoutNotificationEnabled && (
              <TouchableOpacity onPress={() => setTimePickerVisible(true)}>
                <View style={styles.optionContainer}>
                  <Text style={[styles.optionLabel, textBodyStyle]}>Workout Time</Text>
                  {workoutTime ? (
                    <Text style={styles.timeText}>
                      {formatTime(workoutTime)}
                    </Text>
                  ) : (
                    <Text style={[styles.placeholderText, !isDarkMode ? styles.placeholderTextLight : styles.placeholderTextDark]}>Select Time</Text>
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
  );
};

export default hoc(SettingsScreen);
