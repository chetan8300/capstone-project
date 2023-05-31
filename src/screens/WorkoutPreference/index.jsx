import { useState } from 'react'

import { View, Text, Button } from 'react-native'

// Common Components
import hoc from '../../components/HOC'

const preferences = [
  {
    id: 0,
    title: "What's your gender?",
    subtitle: "Let us know you better",
    options: [
      {
        id: 'male',
        label: 'Male'
      },
      {
        id: 'female',
        label: 'Female'
      }
    ]
  }
]

const WorkoutPreferenceScreen = ({ navigation }) => {
  const [currentPreference, setCurrentPreference] = useState(0)

  const preference = preferences[currentPreference]

  return (
    <View>
      <Text>
        {preference ? preference.title : ""}
      </Text>
      <Button
        onPress={() => {
          setCurrentPreference(current => current + 1)
        }}
        title="Next"
        color="#000080"
        accessibilityLabel="Learn more about this purple button"
      />
      <Button
        onPress={() => {
          navigation.navigate('MainApp')
        }}
        title="Start Workout"
        color="#000080"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  )
}

export default hoc(WorkoutPreferenceScreen)