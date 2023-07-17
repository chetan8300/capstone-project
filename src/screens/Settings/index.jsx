import { View, TouchableOpacity, Switch, Modal } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Surface, Text, useTheme, Appbar } from 'react-native-paper'
import React, { useState, useEffect } from 'react';
// Common Components
import hoc from '../../components/HOC'

import styles from './styles'
const SettingsScreen = ({ hideOption = false }) => {
  const navigation = useNavigation();

  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleNotificationToggle = () => {
    setNotificationEnabled(previousState => !previousState);
  };

  const handleSoundToggle = () => {
    setSoundEnabled(previousState => !previousState);
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
      <View style={styles.settingRow}>
        {/* <Text style={styles.settingLabel}>Enable Notification:</Text>
        <Switch
          value={notificationEnabled}
          onValueChange={handleNotificationToggle}
          thumbColor={notificationEnabled ? '#4e32bc' : '#f0f0f0'}
          trackColor={{ false: '#0000', true: '#f0f0f0' }}
        /> */}
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
              <Text style={styles.settingLabel}>Enable Notifications:</Text>
              <Switch
                value={notificationEnabled}
                onValueChange={handleNotificationToggle}
                thumbColor={notificationEnabled ? '#4e32bc' : '#f0f0f0'}
                trackColor={{ false: '#f0f0f0', true: '#f0f0f0' }}
              />
            </View>
            <View style={styles.notificationSettingRow}>
              <Text style={styles.settingLabel}>Sound:</Text>
              <Switch
                value={soundEnabled}
                onValueChange={handleSoundToggle}
                thumbColor={soundEnabled ? '#4e32bc' : '#f0f0f0'}
                trackColor={{ false: '#f0f0f0', true: '#f0f0f0' }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default hoc(SettingsScreen)