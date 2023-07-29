import {ScrollView, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react';
import { IconButton, Button, Surface, Text, useTheme, Appbar } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import moment from 'moment';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";
import hoc from '../../components/HOC'

const WaterTrackerScreen = ({ hideOption = false, isDarkMode }) => {

  console.log("WaterTrackerScreen isdarkMode", isDarkMode)
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [waterIntake, setWaterIntake] = useState(0);
  const [history, setHistory] = useState([]);

  let mainViewStyle = [styles.lightBackground];
	let textStyle = [{ color: "#4e32bc" }];
	let textBodyStyle = [{ color: "#000" }];
	let buttonStyle = [{ backgroundColor: "#4e32bc" }];
	let cardBackground = [{}]

	if (isDarkMode) {
		mainViewStyle = [styles.darkBackground];
		textStyle = [{ color: "#F0DBFF" }];
		textBodyStyle = [{ color: "#fff" }];
		buttonStyle = [{ backgroundColor: "#4e32bc", borderColor: "#4e32bc" }];
		cardBackground = [{backgroundColor: "#555"}]
	}

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
      <Text style={[styles.tableCell, textBodyStyle]}>{moment(item.date).format('MMMM Do, YYYY')}</Text>
      <Text style={[styles.tableCell, textBodyStyle]}>{item.intake} Glasses</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, paddingLeft: 16, paddingRight: 16, width: "100%"}}>
      <View style={styles.headerMain}>
        <View>
          {!hideOption &&
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <MaterialCommunityIcons name="menu" size={28} style={textStyle} />
            </TouchableOpacity>
          }
        </View>
        <View style={styles.header}>
          <Text variant="headlineLarge" style={[styles.name, !isDarkMode ? styles.nameLight : styles.nameDark]}>Track Water Intake</Text>
        </View>
      </View>
      {/* </Surface> */}
      <View style={styles.container}>
        <Surface style={[styles.intakeContainer, !isDarkMode ? styles.intakeContainerLight : styles.intakeContainerDark]}>
          <View style={styles.labelContainer}>
            <Text style={[styles.label, textBodyStyle]}>Today's Intake</Text>
            <Text style={[styles.labelLight, isDarkMode ? styles.labelLightMode : styles.labelDarkMode]}>(in glasses)</Text>
          </View>
          <View style={styles.buttonsContainer}>
            <View style={{ flexDirection: 'row', gap: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
              <IconButton
                icon="minus-thick"
                mode='contained-tonal'
                size={20}
                // iconColor='white'
                // containerColor={colors.primary}
                onPress={() => setWaterIntake(waterIntake - 1)}
                disabled={waterIntake === 0}
              />
              <Text style={styles.intakeText}>{waterIntake}</Text>
              <IconButton
                icon="plus-thick"
                mode='contained-tonal'
                size={20}
                // iconColor='white'
                // containerColor={colors.primary}
                onPress={() => setWaterIntake(waterIntake + 1)}
              />
            </View>
            <Button style={[styles.addButton, waterIntake === 0 && styles.disabledButton]} onPress={addWaterIntake} mode="contained" disabled={waterIntake === 0}>
            <Text style={styles.addButtonText}>Add Intake</Text>
          </Button>
          </View>
        </Surface>
        <Surface style={[styles.historyContainer, !isDarkMode ? styles.historyContainerLight : styles.historyContainerDark]}>
          <Text style={styles.historyTitle}>History:</Text>
          <View style={[styles.tableHeader, !isDarkMode ? styles.tableHeaderLight : styles.tableHeaderDark]}>
            <Text style={[styles.tableHeaderText, textBodyStyle]}>Date</Text>
            <Text style={[styles.tableHeaderText, textBodyStyle]}>Intake</Text>
          </View>
          <FlatList
            data={history}
            renderItem={renderHistoryItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.tableBody}
            ListHeaderComponent={() => null}
            // style = {!isDarkMode ? "#000" : "#fff"}
          />
        </Surface>
      </View>
    </View>
  )
}

export default hoc(WaterTrackerScreen)