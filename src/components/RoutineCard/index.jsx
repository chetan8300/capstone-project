import React from 'react'

import { View } from 'react-native'
import { Text, Button, Surface, Chip, useTheme } from 'react-native-paper'

import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import RoutineDetail from './routine-detail'

const RoutineCard = ({ routine, timerPaused, onComplete }) => {
  const { colors } = useTheme()
  const [showRoutine, setShowRoutine] = React.useState(null)

  if (!routine) return null

  return (
    <View style={{ flex: 1, marginTop: 20 }}>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text variant="displayMedium" style={{ textTransform: 'capitalize' }}>{routine.id.split("_").join(" ")}</Text>

        {routine.count === "seconds" ? (
          <View style={{ marginTop: 25 }}>
            <CountdownCircleTimer
              isPlaying={!timerPaused}
              duration={routine.beginner}
              colors={colors.primary}
              colorsTime={[10, 6, 3, 0]}
              strokeWidth={15}
              size={200}
              onComplete={onComplete}
            >
              {({ remainingTime, color }) => (
                <Text style={{ color, fontSize: 80 }}>{remainingTime}</Text>
              )}
            </CountdownCircleTimer>
          </View>
        ) : (
          <Text variant="displaySmall" style={{ textTransform: 'capitalize', color: "#999", marginTop: 16 }}>x{routine.beginner}</Text>
        )}
      </View>

      <View style={{ marginBottom: 20 }}>
        <View>
          <Text variant="headlineSmall" style={{ fontWeight: 'bold', marginBottom: 10 }}>Focus Area:</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {routine.focusArea.map((area, index) => {
              return (
                <Chip
                  key={index}
                  style={{ marginRight: 8, marginBottom: 8 }}
                  textStyle={{ textTransform: 'capitalize' }}
                >
                  {area.split("_").join(" ")}
                </Chip>
              )
            })}
          </View>
        </View>
        <Surface elevation={4} style={{ borderRadius: 20, marginTop: 16 }}>
          <Button
            icon="eye"
            mode="contained-tonal"
            style={{ borderColor: colors.primary, borderWidth: 2 }}
            onPress={() => setShowRoutine(true)}
          >
            View Details
          </Button>
        </Surface>
        <Surface elevation={4} style={{ borderRadius: 20, marginTop: 16 }}>
          <Button
            icon="check"
            mode="contained"
            onPress={onComplete}
          >
            {routine.count === "reps" ? "Complete Exercise" : "Skip Exercise"}
          </Button>
        </Surface>
      </View>

      <RoutineDetail
        routine={routine}
        visible={showRoutine}
        setVisible={setShowRoutine}
      />
    </View>
  )
}

export default RoutineCard