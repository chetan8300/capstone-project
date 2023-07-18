import {ScrollView, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react';
import { Button, Surface, Text, useTheme, Appbar } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import moment from 'moment';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";
import hoc from '../../components/HOC'

const WaterTrackerScreen = ({ hideOption = false }) => {

  const navigation = useNavigation();
  const [waterIntake, setWaterIntake] = useState(0);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    saveHistory();
  }, [history]);

  const saveHistory = async () => {
    try {
      const jsonValue = JSON.stringify(history);
      await AsyncStorage.setItem('@waterTracker:history', jsonValue);
    } catch (error) {
      console.log('Error saving history: ', error);
    }
  };

  const loadHistory = async () => {
    try {
      // await AsyncStorage.removeItem('@waterTracker:history');
      const jsonValue = await AsyncStorage.getItem('@waterTracker:history');
      if (jsonValue !== null) {
        const parsedValue = JSON.parse(jsonValue);
        setHistory(parsedValue);
      }
    } catch (error) {
      console.log('Error loading history: ', error);
    }
  };

  const addWaterIntake = () => {
    const currentDate = moment().format('YYYY-MM-DD');
    const existingEntryIndex = history.findIndex(entry => entry.date === currentDate);
    if (existingEntryIndex !== -1) {
      const updatedHistory = [...history];
      updatedHistory[existingEntryIndex].intake += waterIntake;
      setHistory(updatedHistory);
    } else {
      const entry = { date: currentDate, intake: waterIntake };
      setHistory([...history, entry]);
    }
    setWaterIntake(0);
  };

  const getGlassText = () => {
    if (waterIntake === 1) {
      return 'glass';
    } else {
      return 'glasses';
    }
  };

  const renderHistoryItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{moment(item.date).format('MMMM Do, YYYY')}</Text>
      <Text style={styles.tableCell}>{item.intake} Glasses</Text>
    </View>
  );

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
          <Text variant="headlineLarge" style={styles.name}>Track Water Intake</Text>
        </View>
      </View>
      {/* </Surface> */}
      <View style={styles.container}>
        <Surface style={styles.intakeContainer}>
          <Text style={styles.label}>Today's Intake:</Text>
          <Text style={styles.intakeText}>{waterIntake} {getGlassText()}</Text>
          <View style={styles.buttonsContainer}>
            <Button
              mode="contained"
              style={styles.button}
              onPress={() => setWaterIntake(waterIntake + 1)}
            >
              <Text style={styles.buttonText}>+1 glass</Text>
            </Button>
            <Button style={[styles.addButton, waterIntake === 0 && styles.disabledButton]} onPress={addWaterIntake} mode="contained" disabled={waterIntake === 0}>
            <Text style={styles.addButtonText}>Add Intake</Text>
          </Button>
          </View>
        </Surface>
        <Surface style={styles.historyContainer}>
          <Text style={styles.historyTitle}>History:</Text>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Date</Text>
            <Text style={styles.tableHeaderText}>Intake</Text>
          </View>
          <FlatList
            data={history}
            renderItem={renderHistoryItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.tableBody}
            ListHeaderComponent={() => null}
          />
        </Surface>
      </View>
    </View>
  )
}

export default hoc(WaterTrackerScreen)