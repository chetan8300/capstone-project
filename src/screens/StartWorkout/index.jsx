import React from 'react'

import { View, BackHandler, StatusBar, Alert } from 'react-native'
import { Text, IconButton, Button, Surface, useTheme } from 'react-native-paper'

// Common components
import hoc from '../../components/HOC'
import { workoutByType } from '../../utils/workouts'
import RoutineCard from '../../components/RoutineCard'

// Third party libraries
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

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

const StartWorkout = ({ navigation, route }) => {
  const { colors } = useTheme()
  const { workoutType, workout: workoutId, day: workoutDay, week: workoutWeek } = route.params
  const workout = workoutByType[workoutType].find((workout) => workout.id === workoutId)

  const lastCompletedExercise = React.useRef(null)
  const [exerciseCompleted, setExerciseCompleted] = React.useState(false)
  const [timerPaused, setTimerPaused] = React.useState(false)

  // Value could be "showTimer" or a Number - showTimer is a 10 second time before the first exercise starts
  const [currentExercise, setCurrentExercise] = React.useState("showTimer")

  // 10 seconds is the default timer value for the first exercise
  // then throiughout the workout, we will use the value from restTimeBetweenWorkouts for the rest time timer
  const [timerSeconds, setTimerSeconds] = React.useState(10)

  // 15 seconds is the default rest time between workouts
  // if found from workoutPreference, then we will use that value
  const [restTimeBetweenWorkouts, setRestTimeBetweenWorkouts] = React.useState(15)

  React.useEffect(() => {
    (async () => {
      try {
        const data = await AsyncStorage.getItem('workoutPreference');
        const parsedData = data ? JSON.parse(data) : {}
        if (parsedData.restTime) {
          setRestTimeBetweenWorkouts(Number(parsedData.restTime) || 15)
        }
      } catch (error) {
        console.log("Error loading workout preference: ", error)
      }
    })()
  }, [])

  React.useEffect(() => {
    if (exerciseCompleted) {
      (async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('@workout:history');
          const parsedValue = jsonValue ? JSON.parse(jsonValue) : {}
          let workoutData = workoutType === "7x4" ? JSON.parse(JSON.stringify(defaultData)) : []
          if (parsedValue[workoutId]) {
            if (workoutType === "7x4" && parsedValue[workoutId].current) {
              workoutData = parsedValue[workoutId]
            } else if (workoutType !== "7x4") {
              workoutData = parsedValue[workoutId]
            }
          }

          if (workoutType === "7x4") {
            workoutData = {
              ...workoutData,
              current: {
                daysCompleted: workoutData.current.daysCompleted + 1,
                weekWiseData: workoutData.current.weekWiseData.map((weekData) => {
                  if (weekData.week === workoutWeek) {
                    const daysCompleted = weekData.daysCompleted + 1 < workoutDay ? weekData.daysCompleted : weekData.daysCompleted + 1
                    return {
                      ...weekData,
                      daysCompleted,
                      completed: daysCompleted === 7,
                    }
                  } else {
                    return weekData
                  }
                })
              }
            }
          } else {
            workoutData = [
              ...workoutData,
              {
                date: new Date().toISOString(),
                completed: true,
              }
            ]
          }

          const dataToSave = {
            ...parsedValue,
            [workoutId]: workoutData
          }

          await AsyncStorage.setItem('@workout:history', JSON.stringify(dataToSave));
        } catch (error) {
          console.log('Error loading history start workout: ', error);
        }
      })()
    }
  }, [exerciseCompleted])

  const backAction = React.useCallback(() => {
    setTimerPaused(true)
    Alert.alert('Hold on!', `Are you sure you want to cancel session? \n\nCancelling will reset the progress for the day.`, [
      {
        text: 'Cancel',
        onPress: () => setTimerPaused(false),
        style: 'cancel',
      },
      { text: 'YES', onPress: () => navigation.goBack() },
    ]);
    return true;
  }, [navigation]);

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const routineForTheDay = workout.exercise

  return (
    <View style={{ flex: 1, width: '100%', backgroundColor: '#f2f2f2' }}>
      <StatusBar
        backgroundColor="#f2f2f2"
        barStyle="dark-content"
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', borderBottomWidth: 1, borderBottomColor: '#d6d6d6' }}>
        <IconButton
          icon="keyboard-backspace"
          size={30}
          iconColor={colors.primary}
          onPress={backAction}
        />
        <View style={{ flex: 1 }}>
          <Text variant="titleLarge" style={{ textTransform: 'uppercase' }}>
            {workout.name} - {workoutType}
          </Text>
        </View>
      </View>
      {!exerciseCompleted ? (
        <View style={{ flex: 1, marginLeft: 16, marginRight: 16 }}>
          {currentExercise === "showTimer" && (
            <>
              <View style={{ alignItems: 'center', flex: 1 }}>
                <Text variant="displayMedium" style={{ textAlign: 'center', marginTop: 16, marginBottom: 16 }}>
                  {lastCompletedExercise.current === null ? "Get Ready" : "Take a Rest"}
                </Text>
                <CountdownCircleTimer
                  isPlaying={!timerPaused}
                  duration={timerSeconds}
                  colors={colors.primary}
                  colorsTime={[10, 6, 3, 0]}
                  strokeWidth={15}
                  size={200}
                  onComplete={() => {
                    if (lastCompletedExercise.current + 1 <= routineForTheDay.length) {
                      if (lastCompletedExercise.current === null) {
                        setCurrentExercise(0)
                      } else {
                        setCurrentExercise(lastCompletedExercise.current + 1)
                      }
                    }
                  }}
                >
                  {({ remainingTime, color }) => (
                    <Text style={{ color, fontSize: 80 }}>{remainingTime}</Text>
                  )}
                </CountdownCircleTimer>
              </View>
              <View style={{ marginBottom: 20 }}>
                {lastCompletedExercise.current !== null ? (
                  <>
                    <Surface elevation={4} style={{ borderRadius: 20, marginTop: 16 }}>
                      <Button
                        mode="contained"
                        onPress={() => {
                          setTimerSeconds(timerSeconds + 10)
                        }}
                      >
                        Add 10 Seconds to Rest
                      </Button>
                    </Surface>
                    <Surface elevation={4} style={{ borderRadius: 20, marginTop: 20 }}>
                      <Button
                        mode="contained"
                        onPress={() => {
                          setCurrentExercise(lastCompletedExercise.current + 1)
                          setTimerSeconds(restTimeBetweenWorkouts)
                        }}
                      >
                        Skip Rest
                      </Button>
                    </Surface>
                  </>
                ) : (
                  <Surface elevation={4} style={{ borderRadius: 20, marginTop: 20 }}>
                    <Button
                      mode="contained"
                      onPress={() => {
                        setCurrentExercise(0)
                        setTimerSeconds(restTimeBetweenWorkouts)
                      }}
                    >
                      Skip waiting time
                    </Button>
                  </Surface>
                )}
              </View>
            </>
          )}

          {currentExercise !== "showTimer" && (
            <RoutineCard
              routine={routineForTheDay[currentExercise]}
              timerPaused={timerPaused}
              onComplete={() => {
                if (currentExercise + 1 === routineForTheDay.length) {
                  setExerciseCompleted(true)
                } else {
                  lastCompletedExercise.current = currentExercise
                  setCurrentExercise("showTimer")
                  setTimerSeconds(restTimeBetweenWorkouts)
                }
              }}
            />
          )}
        </View>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', marginBottom: 20, marginLeft: 16, marginRight: 16 }}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Text variant="displayMedium" style={{ textAlign: 'center', marginTop: 16, marginBottom: 16, color: colors.primary }}>
              Congratulations!
            </Text>
            <Text variant="headlineMedium" style={{ textAlign: 'center', marginTop: 16, marginBottom: 16, color: colors.tertiary }}>
              You have completed the workout for the day.
            </Text>
          </View>
          <Button
            mode="contained"
            onPress={() => {
              navigation.navigate("Training")
            }}
          >
            Go to Training
          </Button>
        </View>
      )}
    </View>
  )
}

export default hoc(StartWorkout)