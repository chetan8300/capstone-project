import { ScrollView, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react';
import { Button, Surface, Text, useTheme, Appbar, TextInput } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import moment from 'moment';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import hoc from '../../components/HOC'

const WeightTrackerScreen = ({ hideOption = false ,isDarkMode }) => {

    const navigation = useNavigation();
    const [weight, setWeight] = useState(0);
    const [history, setHistory] = useState([])

	let textStyle = [{ color: "#4e32bc" }];
	let textBodyStyle = [{ color: "#000" }];
	let whiteColor = [{}]
	let cardBackground = [{}]

	if (isDarkMode) {
		textStyle = [{ color: "#F0DBFF" }];
		textBodyStyle = [{ color: "#fff" }];
		whiteColor = [{ borderBottomColor: "#fff" }];
		cardBackground = [{backgroundColor: "#9EA2E5"}]
	}

    useFocusEffect(React.useCallback(() => {
        loadHistory();
    }, []));

    useEffect(() => {
        saveHistory();
    }, [history]);

    const saveHistory = async () => {
        try {
            const jsonValue = JSON.stringify(history);
            await AsyncStorage.setItem('@weightTracker:history', jsonValue);
        } catch (error) {
            console.log('Error saving history: ', error);
        }
    };

    const loadHistory = async () => {
        try {
            // await AsyncStorage.deleteItem('@weightTracker:history');
            const jsonValue = await AsyncStorage.getItem('@weightTracker:history');
            if (jsonValue !== null) {
                const parsedValue = JSON.parse(jsonValue);
                setHistory(parsedValue);
            }
        } catch (error) {
            console.log('Error loading history: ', error);
        }
    };

    const handleAddWeight = () => {
        const currentDate = moment().format('YYYY-MM-DD');
        const entry = { date: currentDate, intake: weight };
        setWeight("")
        setHistory([...history, entry]);
    };

    let addWeight = false;

    let lastAddedDate = null;

    if (!history.length) {
        addWeight = true;
    } else {
        const lastEntry = history[history.length - 1];
        const lastEntryDate = moment(lastEntry.date);
        const today = moment();
        // difference in days 7 or more
        if (today.diff(lastEntryDate, 'days') >= 7) {
            addWeight = true;
        }

        lastAddedDate = lastEntryDate.format('MMMM Do, YYYY');
    }

    const renderHistoryItem = ({ item }) => (
        <View style={[styles.tableRow, whiteColor]}>
            <Text style={styles.tableCell}>{moment(item.date).format('MMMM Do, YYYY')}</Text>
            <Text style={styles.tableCell}>{item.intake} Kg</Text>
        </View>
    );

    return (
        <View style={{ flex: 1, paddingLeft: 16, paddingRight: 16, width: "100%" }}>
            <View style={styles.headerMain}>
                <View>
                    {!hideOption &&
                        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                            <MaterialCommunityIcons name="menu" size={28} style={[textStyle]} />
                        </TouchableOpacity>
                    }
                </View>
                <View style={styles.header}>
                    <Text variant="headlineLarge" style={[styles.name, textStyle]}>Weight Tracker</Text>
                </View>
            </View>
            <View style={styles.container}>
                <Surface style={[styles.intakeContainer, !isDarkMode ? styles.intakeContainerLight : styles.intakeContainerDark]}>
                    <Text style={[styles.label, textBodyStyle]}>Weight in Kg:</Text>
                    <TextInput style={styles.input}
                        mode='flat'
                        value={weight}
                        onChangeText={text => setWeight(text)}
                        keyboardType="numeric"
                    />
                    <View style={styles.buttonsContainer}>
                        <Button
                            mode="contained"
                            style={styles.button}
                            onPress={handleAddWeight}
                            disabled={!addWeight}
                        >
                            <Text style={styles.buttonText}>Add Weight</Text>
                        </Button>
                    </View>
                    {lastAddedDate && (
                        <View style={{ paddingTop: 10, paddingBottom: 10, flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={[textBodyStyle]}>Last Added: {lastAddedDate}</Text>
                        </View>
                    )}
                </Surface>
            </View>
            <Surface style={[styles.historyContainer, !isDarkMode ? styles.historyContainerLight : styles.historyContainerDark]}>
                <Text style={styles.historyTitle}>History:</Text>
                <View style={[styles.tableHeader, cardBackground]}>
                    <Text style={styles.tableHeaderText}>Date</Text>
                    <Text style={styles.tableHeaderText}>Weight</Text>
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
    )
}

export default hoc(WeightTrackerScreen)