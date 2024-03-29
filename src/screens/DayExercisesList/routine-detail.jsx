import React, { useContext } from "react";

import { ScrollView, View } from 'react-native'
import { Button, IconButton, Modal, Text, Chip, Portal } from 'react-native-paper'
import DarkModeContext from "../../utils/DarkModeContext";

const RoutineDetail = ({ visible, setVisible, routineIndex, exercises }) => {
  const { isDarkMode } = useContext(DarkModeContext);
  let mainViewStyle = []
  let secondaryTextColor = [];
  let textBodyStyle = [{ color: "#000" }];
  let whiteColor = []
  let secondaryColor = []
  let secondaryBackgroundColor = []

  if (isDarkMode) {
    mainViewStyle = [{ backgroundColor: '#231F20' }]
    secondaryTextColor = [{ color: "#AAAAAA" }]
    textBodyStyle = [{ color: "#fff" }]
    whiteColor = [{ color: "#fff" }]
    secondaryColor = [{ color: "#F0DBFF" }]
    secondaryBackgroundColor = [{ backgroundColor: "#F0DBFF" }]
  }

  const exercise = routineIndex !== null ? exercises[routineIndex] : null
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={() => setVisible(null)}
        contentContainerStyle={{ backgroundColor: !isDarkMode ? '#fff' : "#000", width: '90%', height: '90%', borderRadius: 16 }}
        style={{ alignItems: 'center', justifyContent: 'center' }}
      >
        <View style={{ flex: 1 }}>
          {exercise && (
            <>
              <View style={[{ flex: 1, backgroundColor: !isDarkMode ? "#fff" : "#000" }]}>
                <View style={{ borderBottomWidth: 1, borderColor: "#d6d6d6", paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 }}>
                  <Text variant="titleLarge" style={[{ fontWeight: 'bold', textTransform: 'uppercase' }, textBodyStyle]}>{exercise.id.split("_").join(" ")}</Text>
                  <Text variant="titleMedium" style={{ color: "#999" }}>{exercise.count === "reps" ? `x${exercise.beginner}` : `${exercise.beginner} Seconds`}</Text>
                </View>

                <ScrollView style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
                  <View>
                    <Text variant="headlineSmall" style={[{ fontWeight: 'bold', marginBottom: 10 }, textBodyStyle]}>Description:</Text>
                    <Text variant="bodyLarge" style={[{ marginBottom: 10 }, textBodyStyle]}>{exercise.description}</Text>
                  </View>

                  <View>
                    <Text variant="headlineSmall" style={[{ fontWeight: 'bold', marginBottom: 10 }, textBodyStyle]}>Steps:</Text>
                    {exercise.steps.map((step, index) => {
                      return (
                        <Text variant="bodyLarge" key={index} style={[{ marginBottom: 10 }, textBodyStyle]}>- {step}</Text>
                      )
                    })}
                  </View>

                  <View style={{ marginBottom: 20 }}>
                    <Text variant="headlineSmall" style={[{ fontWeight: 'bold', marginBottom: 10 }, textBodyStyle]}>Focus Area:</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                      {exercise.focusArea.map((area, index) => {
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
                </ScrollView>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, padding: 10, borderTopWidth: 1, borderColor: "#d6d6d6" }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <IconButton
                    icon="chevron-left"
                    mode='contained'
                    size={30}
                    disabled={routineIndex === 0}
                    onPress={() => setVisible(prev => prev - 1)}
                  />
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text variant='titleLarge' style={[{ color: "#000" }, whiteColor]}>
                      {routineIndex + 1}
                    </Text>
                    <Text variant='titleSmall' style={[{ color: "#000" }, whiteColor]}> / {exercises.length}</Text>
                  </View>
                  <IconButton
                    icon="chevron-right"
                    mode='contained'
                    size={30}
                    disabled={routineIndex === exercises.length - 1}
                    onPress={() => setVisible(prev => prev + 1)}
                  />
                </View>
                <Button
                  mode="contained"
                  style={{ borderRadius: 30, flex: 1 }}
                  labelStyle={{ fontSize: 18, lineHeight: 30, textTransform: 'uppercase' }}
                  onPress={() => setVisible(null)}
                >
                  Close
                </Button>
              </View>
            </>
          )}
        </View>
      </Modal>
    </Portal>
  )
}

export default RoutineDetail