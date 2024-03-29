import React from 'react'

import { View } from 'react-native'
import { Text, Button, Surface, Chip, useTheme } from 'react-native-paper'

import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import RoutineDetail from './routine-detail'

const RoutineCard = ({ routine, timerPaused, onComplete, isDarkMode }) => {
  const { colors } = useTheme()
  const [showRoutine, setShowRoutine] = React.useState(null)

  let mainViewStyle = [{}]
  let textStyle = [{ color: "#4e32bc" }];
  let secondaryTextColor = [{}];
  let textBodyStyle = [{ color: "#000" }];
  let whiteColor = [{}]
  let secondaryColor = [{}]
  let blackColor = [{}]

  if (isDarkMode) {
    textStyle = [{ color: "#F0DBFF" }];
    mainViewStyle = [{ backgroundColor: '#231F20' }]
    secondaryTextColor = [{ color: "#AAAAAA" }];
    textBodyStyle = [{ color: "#fff" }];
    whiteColor = [{ color: "#fff" }];
    secondaryColor = [{ color: "#F0DBFF" }]
    blackColor = [{ color: "#000" }]
  }

  if (!routine) return null

  return (
    <View style={{ flex: 1, marginTop: 20 }}>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text variant="displayMedium" style={[{ textTransform: 'capitalize' }, ...(isDarkMode ? whiteColor : [{ color: "#000" }])]}>{routine.id.split("_").join(" ")}</Text>

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
                <Text style={[{ fontSize: 80 }, ...(isDarkMode ? whiteColor : [{ color: "#4e32bc" }])]}>{remainingTime}</Text>
              )}
            </CountdownCircleTimer>
          </View>
        ) : (
          <Text variant="displaySmall" style={[{ textTransform: 'capitalize', color: "#999", marginTop: 16 }]}>x{routine.beginner}</Text>
        )}
      </View>

      <View style={{ marginBottom: 20 }}>
        <View>
          <Text variant="headlineSmall" style={[{ fontWeight: 'bold', marginBottom: 10, color: "#000" }, ...whiteColor]}>Focus Area:</Text>
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
            // style={{ borderColor: colors.primary, borderWidth: 2 }}
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