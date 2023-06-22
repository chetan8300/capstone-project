import React from 'react'

import { View, StatusBar, FlatList, TouchableHighlight } from 'react-native'
import { Modal, Text, IconButton, Card, Button, Surface, Portal, useTheme } from 'react-native-paper'
import Toast from 'react-native-root-toast';

// Common Components
import hoc from "../../components/HOC";
import RoutineDetail from './routine-detail'
import { workoutByType } from '../../utils/workouts';
import { exercises } from '../../utils/workouts'

const routineForTheDay = [
  exercises.jumping_jacks,
  exercises.skipping,
  exercises.incline_push_ups,
  exercises.push_ups,
  exercises.squats,
  exercises.forward_lunges,
  exercises.tricep_dips,
  exercises.shoulder_stretch,
  exercises.knee_to_chest_stretch
]

const DayExercisesList = ({ route, navigation }) => {
  const { workoutType, workout: workoutId, day: workoutDay } = route.params
  const { colors } = useTheme()
  const [showRoutine, setShowRoutine] = React.useState(null);

  const workout = workoutByType[workoutType].find((workout) => workout.id === workoutId)

  const handlePressRouting = (index) => {
    setShowRoutine(index)
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
          size={20}
          iconColor={colors.primary}
          onPress={() => navigation.goBack()}
        />
        <View style={{ flex: 1 }}>
          <Text variant="titleLarge" style={{ textTransform: 'uppercase', }}>
            {`Day ${workoutDay}`}
          </Text>
        </View>
      </View>
      <Card style={{ position: "relative", marginLeft: 8, marginRight: 8 }}>
        <Card.Cover
          blurRadius={10}
          source={workout.icon}
          style={{ borderRadius: 0 }}
        />
        <Card.Title
          title={`Day ${workoutDay}`}
          subtitle={workout.name}
          titleStyle={{ color: "#fff", fontSize: 28, fontWeight: "bold", lineHeight: 28, marginBottom: 8 }}
          subtitleStyle={{ color: "#fff", fontSize: 20, fontWeight: "bold", textTransform: "uppercase" }}
          style={{ position: "absolute", bottom: 10 }}
        />
      </Card>
      <Surface elevation={0} style={{ marginLeft: 8, marginRight: 8, marginTop: 8, borderRadius: 12, paddingVertical: 10, paddingHorizontal: 16, backgroundColor: '#fff', justifyContent: 'space-between', flexDirection: 'row' }}>
        <Text variant="bodyLarge">Routine for the day</Text>
        <Text variant="bodyLarge">15 workouts</Text>
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
                  <Text variant="bodyMedium" style={{ color: "#999" }}>{item.count === "reps" ? `x${item.beginner}` : `${item.beginner} Seconds`}</Text>
                </View>
              </Surface>
            </TouchableHighlight>
          )
        }}
      />
      <Surface style={{ borderRadius: 30, marginBottom: 12, marginLeft: 12, marginRight: 12 }}>
        <Button mode="contained" style={{ borderRadius: 30 }} labelStyle={{ fontSize: 24, lineHeight: 30, textTransform: 'uppercase' }}>
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