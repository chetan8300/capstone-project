import React from 'react'

import { View, StatusBar, TouchableOpacity, ScrollView } from 'react-native'
import { Text, IconButton, Card, useTheme, Surface } from 'react-native-paper'
import { MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import Toast from 'react-native-root-toast';

// Common Components
import hoc from "../../components/HOC";
import { workoutByType } from '../../utils/workouts';

const data = {
  "7x4": {
    started: true,
    daysCompleted: 6,
    weekWiseData: [
      {
        week: 1,
        daysCompleted: 6,
        completed: true,
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
  }
}

const WorkoutWeeksList = ({ route, navigation }) => {
  const { workoutType, workout: workoutId } = route.params
  const { colors } = useTheme()

  const workout = workoutByType[workoutType].find((workout) => workout.id === workoutId)


  const progress = data[workoutType]

  const handlePressWeekDay = (currentDayOfMonth) => {
    if (currentDayOfMonth <= progress.daysCompleted + 1) {
      navigation.navigate("DayExercisesList", { workoutType, workout: workoutId, day: currentDayOfMonth })
    } else {
      Toast.show('Please finish previous challenges date first.', {
        animation: true,
        hideOnPress: true,
        position: Toast.positions.BOTTOM,
        duration: Toast.durations.SHORT,
      });
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
          size={20}
          iconColor={colors.primary}
          onPress={() => navigation.goBack()}
        />
        <View style={{ flex: 1 }}>
          <Text variant="titleLarge" style={{ textTransform: 'uppercase' }}>
            {workout.subtitle}
          </Text>
        </View>
      </View>
      <Card style={{ position: "relative", marginLeft: 8, marginRight: 8 }}>
        <Card.Cover
          source={workout.icon}
          style={{ borderRadius: 0 }}
        />
        <Card.Title
          title={workout.name}
          titleStyle={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}
          subtitleStyle={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}
          style={{ position: "absolute", top: 10 }}
        />
        {workoutType === "7x4" && (
          <View style={{ position: 'absolute', bottom: 16, paddingLeft: 16, paddingRight: 16, width: '100%' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
              <Text style={{ color: '#fff' }}>
                {28 - progress.daysCompleted} Days Left
              </Text>
              <Text style={{ color: '#fff' }}>
                {Math.ceil((progress.daysCompleted / 28) * 100)}%
              </Text>
            </View>
            <View style={{ position: 'relative', width: '100%', backgroundColor: '#9BABB8', height: 10, borderRadius: 8 }}>
              <View style={{ position: 'absolute', width: `${(progress.daysCompleted / 28) * 100}%`, height: 10, backgroundColor: colors.primary, borderRadius: 8 }} />
            </View>
          </View>
        )}
      </Card>
      <ScrollView style={{ marginTop: 10, marginBottom: 10 }}>
        <View style={{ gap: 16, paddingBottom: 10 }}>
          {progress?.weekWiseData.map((week, index) => {
            const weekStartingDay = index * 7 + 1
            const isWeekCompleted = week.completed
            const isWeekInProgress = progress.daysCompleted - (weekStartingDay - 1) >= 0
            return (
              <View key={`week-${index}`} style={{ flexDirection: 'row', gap: 6, marginLeft: 12, marginRight: 12 }}>
                <View style={{ width: 35, alignItems: 'center' }}>
                  {(isWeekCompleted || isWeekInProgress) ? (
                    <Octicons name="check-circle-fill" size={30} color={colors.primary} />
                  ) : (
                    <MaterialCommunityIcons name="lightning-bolt-circle" size={30} color={"#999"} />
                  )}
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 30, alignItems: 'center' }}>
                    <Text variant="bodyLarge" style={{ color: week.completed ? colors.primary : "#999", fontWeight: "bold" }}>Week {week.week}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text variant="bodyLarge" style={{ color: week.completed ? colors.primary : "#999", fontWeight: "bold" }}>
                        {week.daysCompleted}
                      </Text>
                      <Text variant="bodySmall" style={{ color: "#999", fontWeight: "bold" }}> / 7</Text>
                    </View>
                  </View>

                  <Surface elevation={1} style={{ marginTop: 6, padding: 16, borderRadius: 8, backgroundColor: '#fff', gap: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      {[...Array(4)].map((_, index) => {
                        const currentDayOfWeek = index + 1
                        const currentDayOfMonth = weekStartingDay + index
                        const isCompletedDay = currentDayOfWeek <= week.daysCompleted
                        const isCurrentDay = currentDayOfWeek === week.daysCompleted + 1
                        return (
                          <React.Fragment key={`week-${index}-${currentDayOfWeek}`}>
                            <TouchableOpacity
                              onPress={() => handlePressWeekDay(currentDayOfMonth)}
                            >
                              {isCompletedDay ?
                                <Octicons name="check-circle-fill" size={40} color={colors.primary} />
                                :
                                (isCurrentDay && (isWeekCompleted || isWeekInProgress)) ?
                                  <View style={{ borderRadius: 50, borderWidth: 1, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderColor: colors.primary, borderStyle: 'dashed' }}>
                                    <Text variant="titleLarge" style={{ color: colors.primary }}>{currentDayOfWeek}</Text>
                                  </View>
                                  :
                                  <View style={{ borderRadius: 50, borderWidth: 1, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderColor: "#999", borderStyle: 'solid' }}>
                                    <Text variant="titleLarge" style={{ color: "#999" }}>{currentDayOfWeek}</Text>
                                  </View>
                              }
                            </TouchableOpacity>

                            {index !== 3 && (
                              isCompletedDay ?
                                <MaterialCommunityIcons name="chevron-right" size={25} color={colors.primary} />
                                :
                                <MaterialCommunityIcons name="chevron-right" size={25} color={"#999"} />
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
                              onPress={() => handlePressWeekDay(currentDayOfMonth)}
                            >
                              {isCompletedDay ?
                                <Octicons name="check-circle-fill" size={40} color={colors.primary} />
                                :
                                (isCurrentDay && (isWeekCompleted || isWeekInProgress)) ?
                                  <View style={{ borderRadius: 50, borderWidth: 1, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderColor: colors.primary, borderStyle: 'dashed' }}>
                                    <Text variant="titleLarge" style={{ color: colors.primary }}>{currentDayOfWeek}</Text>
                                  </View>
                                  :
                                  <View style={{ borderRadius: 50, borderWidth: 1, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderColor: "#999", borderStyle: 'solid' }}>
                                    <Text variant="titleLarge" style={{ color: "#999" }}>{currentDayOfWeek}</Text>
                                  </View>
                              }
                            </TouchableOpacity>
                            {index !== 3 && (
                              isCompletedDay > 0 ?
                                <MaterialCommunityIcons name="chevron-right" size={25} color={colors.primary} />
                                :
                                <MaterialCommunityIcons name="chevron-right" size={25} color={"#999"} />
                            )}
                            {index === 2 && (
                              <MaterialCommunityIcons name="trophy" size={40} color={week.daysCompleted === 7 ? "#FFBF00" : "#999"} />
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