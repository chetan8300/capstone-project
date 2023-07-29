import React from 'react'

import { View, StatusBar, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { Text, IconButton, Card, useTheme, Surface, Button } from 'react-native-paper'
import { MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import Toast from 'react-native-root-toast';

// Common Components
import hoc from "../../components/HOC";
import { workoutByType } from '../../utils/workouts';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const defaultData = {
  current: {
    daysCompleted: 0,
    weekWiseData: [
      {
        week: 1,
        daysCompleted: 0,
        completed: false,
      },
      {
        week: 2,
        daysCompleted: 0,
        completed: false,
      },
      {
        week: 3,
        daysCompleted: 0,
        completed: false,
      },
      {
        week: 4,
        daysCompleted: 0,
        completed: false,
      },
    ]
  },
  history: [],
}

const WorkoutWeeksList = ({ route, navigation, isDarkMode }) => {
  const { workoutType, workout: workoutId } = route.params
  const { colors } = useTheme()
  const [progress, setProgress] = React.useState(defaultData);
  const [workoutPreference, setWorkoutPreference] = React.useState({});

  const workout = workoutByType[workoutType].find((workout) => workout.id === workoutId)

  let mainViewStyle = [{}]
	let textStyle = [{ color: "#4e32bc" }];
	let textBodyStyle = [{ color: "#000" }];
	let whiteColor = [{}]
	let secondaryColor = [{}]

	if (isDarkMode) {
    mainViewStyle = [{backgroundColor: '#231F20'}]
		textStyle = [{ color: "#F0DBFF" }];
		textBodyStyle = [{ color: "#fff" }];
		whiteColor = [{ color: "#c0c0c0" }];
		secondaryColor = [{color: "#F0DBFF"}]
	}

  useFocusEffect(React.useCallback(() => {
    const loadHistory = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@workout:history');
        const parsedValue = jsonValue ? JSON.parse(jsonValue) : {}
        if (parsedValue[workoutId] && parsedValue[workoutId]?.current) {
          const parsedValue = JSON.parse(jsonValue);
          setProgress(parsedValue[workoutId]);
        }
      } catch (error) {
        console.log('Error loading history week list: ', error);
      }
    };

    loadHistory()
  }, []))

  React.useEffect(() => {
    (async () => {
      try {
        const data = await AsyncStorage.getItem('workoutPreference');
        setWorkoutPreference(data ? JSON.parse(data) : {})
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  const handlePressWeekDay = (currentDayOfMonth, currentWeekOfMonth) => {
    if (currentDayOfMonth <= progress?.current?.daysCompleted + 1) {
      // week: Math.ceil(currentDayOfMonth / 7)
      navigation.navigate("DayExercisesList", { workoutType, workout: workoutId, day: currentDayOfMonth, week: currentWeekOfMonth })
    } else {
      Toast.show('Please finish previous challenges date first.', {
        animation: true,
        hideOnPress: true,
        position: Toast.positions.BOTTOM,
        duration: Toast.durations.SHORT,
      });
    }
  }

  if (!progress || !progress?.current) {
    return null
  }

  const saveToHistoryAndReset = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@workout:history');
      const parsedValue = jsonValue ? JSON.parse(jsonValue) : {}
      if (parsedValue[workoutId] && parsedValue[workoutId]?.current) {
        parsedValue[workoutId].history.push({
          date: new Date().toISOString(),
          ...parsedValue[workoutId].current,
        })
        parsedValue[workoutId].current = defaultData.current
        await AsyncStorage.setItem('@workout:history', JSON.stringify(parsedValue));
        setProgress(parsedValue[workoutId]);
      }
    } catch (error) {
      console.log('Error loading history - save history and reset: ', error);
    }
  }

  const gender = workoutPreference?.gender || "male"

  return (
    <View style={[{ flex: 1, width: '100%', backgroundColor: '#f2f2f2' }, mainViewStyle]}>
      <StatusBar
        backgroundColor="#f2f2f2"
        barStyle="dark-content"
      />
      <View style={[{ flexDirection: 'row', alignItems: 'center', width: '100%' }]}>
        <IconButton
          icon="keyboard-backspace"
          size={30}
          iconColor={!isDarkMode ? colors.primary : "#F0DBFF"}
          onPress={() => navigation.goBack()}
        />
        <View style={{ flex: 1 }}>
          <Text variant="titleLarge" style={[{ textTransform: 'uppercase' }, secondaryColor]}>
            {workout.subtitle}
          </Text>
        </View>
      </View>
      <Card style={[{ position: "relative", marginLeft: 8, marginRight: 8 }, mainViewStyle]}>
        <Card.Cover
          source={gender === "male" ? workout.male_icon : workout.female_icon}
          style={[{ borderRadius: 0, borderColor:"#fff" }, mainViewStyle]}
        />
        <Card.Title
          title={workout.name}
          titleStyle={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}
          subtitleStyle={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}
          style={{ position: "absolute", top: 10 }}
        />
        {progress.current.daysCompleted > 0 && (
          <View style={{ position: 'absolute', top: 10, right: 10 }}>
            <Button
              mode="contained-tonal"
              color={colors.primary}
              onPress={() => {
                Alert.alert('Hold on!', `Are you sure you want to reset?.`, [
                  {
                    text: 'Cancel',
                    onPress: () => null,
                    style: 'cancel',
                  },
                  { text: 'YES', onPress: saveToHistoryAndReset },
                ]);
              }}
            >
              Reset
            </Button>
          </View>
        )}
        <View style={{ position: 'absolute', bottom: 16, paddingLeft: 16, paddingRight: 16, width: '100%' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
            <Text style={{ color: '#fff' }}>
              {28 - progress.current.daysCompleted} Days Left
            </Text>
            <Text style={{ color: '#fff' }}>
              {Math.ceil((progress.current.daysCompleted / 28) * 100)}%
            </Text>
          </View>
          <View style={{ position: 'relative', width: '100%', backgroundColor: '#9BABB8', height: 10, borderRadius: 8 }}>
            <View style={{ position: 'absolute', width: `${(progress.current.daysCompleted / 28) * 100}%`, height: 10, backgroundColor: colors.primary, borderRadius: 8 }} />
          </View>
        </View>
      </Card>
      <ScrollView style={{ marginTop: 10, marginBottom: 10 }}>
        <View style={{ gap: 16, paddingBottom: 10 }}>
          {progress?.current?.weekWiseData.map((week, index) => {
            const currentWeekOfMonth = week.week
            const weekStartingDay = index * 7 + 1
            const isWeekCompleted = week.completed
            const isWeekInProgress = progress.current.daysCompleted - (weekStartingDay - 1) >= 0
            return (
              <View key={`week-${index}`} style={{ flexDirection: 'row', gap: 6, marginLeft: 12, marginRight: 12 }}>
                <View style={{ width: 35, alignItems: 'center' }}>
                  {(isWeekCompleted || isWeekInProgress) ? (
                    <Octicons name="check-circle-fill" size={30} style={[{ color: colors.primary }, secondaryColor]} />
                  ) : (
                    <MaterialCommunityIcons name="lightning-bolt-circle" size={30} style={[{ color: colors.primary }, secondaryColor]} />
                  )}
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 30, alignItems: 'center' }}>
                    <Text variant="bodyLarge" style={[{ color: (isWeekCompleted || isWeekInProgress) ? colors.primary : "#999", fontWeight: "bold" }, secondaryColor]}>Week {week.week}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text variant="bodyLarge" style={[{ color: (isWeekCompleted || isWeekInProgress) ? colors.primary : "#999", fontWeight: "bold" }, secondaryColor]}>
                        {week.daysCompleted}
                      </Text>
                      <Text variant="bodySmall" style={{ color: "#999", fontWeight: "bold" }}> / 7</Text>
                    </View>
                  </View>

                  <Surface elevation={1} style={[{ marginTop: 6, padding: 16, borderRadius: 8, backgroundColor: !isDarkMode ? '#fff' : "#000", gap: 10 }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      {[...Array(4)].map((_, index) => {
                        const currentDayOfWeek = index + 1
                        const currentDayOfMonth = weekStartingDay + index
                        const isCompletedDay = currentDayOfWeek <= week.daysCompleted
                        const isCurrentDay = currentDayOfWeek === week.daysCompleted + 1
                        return (
                          <React.Fragment key={`week-${index}-${currentDayOfWeek}`}>
                            <TouchableOpacity
                              onPress={() => handlePressWeekDay(currentDayOfMonth, currentWeekOfMonth)}
                            >
                              {isCompletedDay ?
                                !isDarkMode ? <Octicons name="check-circle-fill" size={40} color={colors.primary} /> : <Octicons name="check-circle" size={40} color={"#c0c0c0"} />
                                :
                                (isCurrentDay && (isWeekCompleted || isWeekInProgress)) ?
                                  <View style={[{ borderRadius: 50, borderWidth: 1, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderColor: !isDarkMode ? colors.primary : "#c0c0c0", borderStyle: 'dashed' }]}>
                                    <Text variant="titleLarge" style={[{ color: colors.primary }, whiteColor]}>{currentDayOfWeek}</Text>
                                  </View>
                                  :
                                  <View style={{ borderRadius: 50, borderWidth: 1, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderColor: !isDarkMode ? "#999" : "#c0c0c0", borderStyle: 'solid' }}>
                                    <Text variant="titleLarge" style={[{ color: "#999" }, whiteColor]}>{currentDayOfWeek}</Text>
                                  </View>
                              }
                            </TouchableOpacity>

                            {index !== 3 && (
                              isCompletedDay ?
                                <MaterialCommunityIcons name="chevron-right" size={25} style={[{ color: colors.primary }, whiteColor]} />
                                :
                                <MaterialCommunityIcons name="chevron-right" size={25} style={[{ color: "#999" }, whiteColor]} />
                            )}
                          </React.Fragment>
                        )
                      })}
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      {[...Array(3)].map((_, index) => {
                        const currentDayOfWeek = index + 5
                        const currentDayOfMonth = weekStartingDay + index + 4
                        const isCompletedDay = currentDayOfWeek <= week.daysCompleted
                        const isCurrentDay = currentDayOfWeek === week.daysCompleted + 1
                        return (
                          <React.Fragment key={`week-${index}-${currentDayOfWeek}`}>
                            <TouchableOpacity
                              onPress={() => handlePressWeekDay(currentDayOfMonth, currentWeekOfMonth)}
                            >
                              {isCompletedDay ?
                                !isDarkMode ? <Octicons name="check-circle-fill" size={40} color={colors.primary} /> : <Octicons name="check-circle" size={40} color={"#c0c0c0"} />
                                :
                                (isCurrentDay && (isWeekCompleted || isWeekInProgress)) ?
                                  <View style={{ borderRadius: 50, borderWidth: 1, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderColor: colors.primary, borderStyle: 'dashed' }}>
                                    <Text variant="titleLarge" style={[{ color: colors.primary }, whiteColor]}>{currentDayOfWeek}</Text>
                                  </View>
                                  :
                                  <View style={{ borderRadius: 50, borderWidth: 1, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderColor: "#999", borderStyle: 'solid' }}>
                                    <Text variant="titleLarge" style={[{ color: "#999" }, whiteColor]}>{currentDayOfWeek}</Text>
                                  </View>
                              }
                            </TouchableOpacity>
                            {index !== 3 && (
                              isCompletedDay > 0 ?
                                <MaterialCommunityIcons name="chevron-right" size={25} style={[{ color: colors.primary }, whiteColor]} />
                                :
                                <MaterialCommunityIcons name="chevron-right" size={25} style={[{ color: "#999" }, whiteColor]} />
                            )}
                            {index === 2 && (
                              <MaterialCommunityIcons name="trophy" size={40} color={!week.daysCompleted === 7 ? "#4e32bc" : "#FFBF00"} />
                            )}
                          </React.Fragment>
                        )
                      })}
                    </View>
                  </Surface>
                </View>
              </View>
            )
          })}
        </View>
      </ScrollView>
    </View>
  )
}

export default hoc(WorkoutWeeksList)