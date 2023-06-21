import { View, Text, TouchableOpacity} from 'react-native'
import React, { useState, useEffect } from 'react';
import { Button, Surface, useTheme, Appbar } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import moment from 'moment';

import hoc from '../../components/HOC'

const WaterTrackerScreen = () => {

    const [waterIntake, setWaterIntake] = useState(0);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        loadHistory();
      }, []);

      useEffect(() => {
        saveHistory();
      }, history);

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
        const entry = { date: currentDate, intake: waterIntake };
        setHistory([...history, entry]);
        setWaterIntake(0);
      };

    return (
      <>
        <Surface style={styles.appBar}>
          <Text style={styles.title}>
                Track Water Intake
            </Text>
        </Surface>
      <View>
      <Text style={styles.label}>Today's Intake:</Text>
      <Text style={styles.intakeText}>{waterIntake} glasses</Text>
      <View style={styles.buttonsContainer}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => setWaterIntake(waterIntake + 1)}
        >
          <Text style={styles.buttonText}>+1 glass</Text>
        </Button>
      </View>
      <Button style={styles.addButton} onPress={addWaterIntake} mode="contained">
        <Text style={styles.addButtonText}>Add Intake</Text>
      </Button>
      <Text style={styles.historyTitle}>History:</Text>
      {history.map((entry, index) => (
        <View key={index} style={styles.historyEntry}>
          <Text style={styles.entryDate}>{entry.date}</Text>
          <Text style={styles.entryIntake}>{entry.intake} Glasses</Text>
        </View>
      ))}
      </View>
      </>
    )
  }

export default hoc(WaterTrackerScreen)