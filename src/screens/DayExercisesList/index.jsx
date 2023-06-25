import React from 'react'

// UI Components
import { View, StatusBar, FlatList, TouchableHighlight } from 'react-native'
import { Text, IconButton, Card, Button, Surface, useTheme } from 'react-native-paper'

// Third Party Helpers
import AsyncStorage from '@react-native-async-storage/async-storage';

// Common Components
import hoc from "../../components/HOC";
import RoutineDetail from './routine-detail'
import { workoutByType } from '../../utils/workouts';

const DayExercisesList = ({ route, navigation }) => {
  const { workoutType, workout: workoutId, day: workoutDay, week: workoutWeek } = route.params
  const { colors } = useTheme()
  const [showRoutine, setShowRoutine] = React.useState(null);
  const [workoutPreference, setWorkoutPreference] = React.useState({});

  const workout = workoutByType[workoutType].find((workout) => workout.id === workoutId)
  const routineForTheDay = workout.exercise

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

  const handlePressRouting = (index) => {
    setShowRoutine(index)
  }

  const title = workoutType === "7x4" ? `Day ${workoutDay}` : workout.name
  const subtitle = workoutType === "7x4" ? workout.name : null

  const gender = workoutPreference?.gender || "male"

  let difficulty = workoutType !== "7x4" ? workoutType : "beginner"

  if (workoutType === "7x4" && workoutPreference.pushUpAtOneTime && workoutPreference.activityLevel) {
    // const activity_level = ['sedentary', 'lightly_active', 'moderately_active', 'very_active']
    // const pushup = ['beginner', 'intermediate', 'advanced']

    if (workoutPreference.pushUpAtOneTime === "beginner" || workoutPreference.activityLevel.includes(["sedentary", "lightly_active"])) {
      difficulty = "beginner"
    }

    if (workoutPreference.pushUpAtOneTime === "intermediate" || workoutPreference.activityLevel.includes(["moderately_active"])) {
      difficulty = "intermediate"
    }

    if (workoutPreference.pushUpAtOneTime === "advanced" || workoutPreference.activityLevel.includes(["very_active"])) {
      difficulty = "advanced"
    }
  }

  return (
    <View style={{ flex: 1, width: '100%', backgroundColor: '#f2f2f2' }}>
      <StatusBar
        backgroundColor="#f2f2f2"
        barStyle="dark-content"
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
        <IconButton
          icon="keyboard-backspace"
          size={30}
          iconColor={colors.primary}
          onPress={() => navigation.goBack()}
        />
        <View style={{ flex: 1 }}>
          <Text variant="titleLarge" style={{ textTransform: 'uppercase' }}>
            {title}
          </Text>
        </View>
      </View>
      <Card style={{ position: "relative", marginLeft: 8, marginRight: 8 }}>
        <Card.Cover
          blurRadius={10}
          source={gender === "male" ? workout.male_icon : workout.female_icon}
          style={{ borderRadius: 0 }}
        />
        <Card.Title
          title={title}
          subtitle={subtitle}
          titleStyle={{ color: "#fff", fontSize: 28, fontWeight: "bold", lineHeight: 28, marginBottom: 8 }}
          subtitleStyle={{ color: "#fff", fontSize: 20, fontWeight: "bold", textTransform: "uppercase" }}
          style={{ position: "absolute", bottom: 10 }}
        />
      </Card>
      <Surface elevation={0} style={{ marginLeft: 8, marginRight: 8, marginTop: 8, borderRadius: 12, paddingVertical: 10, paddingHorizontal: 16, backgroundColor: '#fff', justifyContent: 'space-between', flexDirection: 'row' }}>
        <Text variant="bodyLarge">Routine for the day</Text>
        <Text variant="bodyLarge">{routineForTheDay.length} workouts</Text>
      </Surface>
      <FlatList
        data={routineForTheDay}
        keyExtractor={(item) => item.id}
        style={{ marginLeft: 8, marginRight: 8, marginTop: 8, marginBottom: 16, paddingBottom: 16 }}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        renderItem={({ item, index }) => {
          let extraStyle = {}
          if (routineForTheDay.length - 1 === index) {
            extraStyle = { marginBottom: 8 }
          }

          return (
            <TouchableHighlight
              style={[{ borderRadius: 12 }, extraStyle]}
              onPress={() => handlePressRouting(index)}
            >
              <Surface elevation={0} style={[{ borderRadius: 12, paddingVertical: 10, paddingHorizontal: 16, backgroundColor: '#fff' }]}>
                <Text variant="titleLarge" style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{item.id.split("_").join(" ")}</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                  <Text variant="bodyMedium" style={{ fontWeight: 'bold', color: "#999" }}>{item.count === "reps" ? "Reps" : "Time"}: </Text>
                  <Text variant="bodyMedium" style={{ color: "#999" }}>{item.count === "reps" ? `x${item[difficulty]}` : `${item[difficulty]} Seconds`}</Text>
                </View>
              </Surface>
            </TouchableHighlight>
          )
        }}
      />
      <Surface style={{ borderRadius: 30, marginBottom: 12, marginLeft: 12, marginRight: 12 }}>
        <Button
          mode="contained"
          style={{ borderRadius: 30 }} labelStyle={{ fontSize: 24, lineHeight: 30, textTransform: 'uppercase' }}
          onPress={() => navigation.navigate('StartWorkout', { workoutType, workout: workoutId, day: workoutDay, week: workoutWeek })}
        >
          Start
        </Button>
      </Surface>
      <RoutineDetail
        visible={showRoutine !== null && showRoutine >= 0}
        setVisible={setShowRoutine}
        routineIndex={showRoutine}
        exercises={routineForTheDay}
      />
    </View>
  )
}

export default hoc(DayExercisesList)