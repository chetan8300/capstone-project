import { useState } from 'react'

import { View, Text, Button, TouchableOpacity } from 'react-native'
import { ProgressBar, MD3Colors, useTheme } from 'react-native-paper';

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
        label: 'Male',
        image: '../../assets/preference/male.png'
      },
      {
        id: 'female',
        label: 'Female',
        image: '../../assets/preference/female.png'
      }
    ]
  },
  {
    id: 1,
    title: "What's your goal?",
    subtitle: "Let us know you better",
    options: [
      {
        id: 'lose-weight',
        label: 'Lose Weight',
        image: '../../assets/preference/lose-weight.png'
      },
      {
        id: 'gain-muscle',
        label: 'Gain Muscle',
        image: '../../assets/preference/gain-muscle.png'
      },
      {
        id: 'stay-fit',
        label: 'Stay Fit',
        image: '../../assets/preference/stay-fit.png'
      },
      {
        id: 'gain-weight',
        label: 'Gain Weight',
        image: '../../assets/preference/gain-weight.png'
      },
    ]
  }
]

const WorkoutPreferenceScreen = ({ navigation }) => {
  const [currentPreference, setCurrentPreference] = useState(0)
  const { colors } = useTheme()

  const preference = preferences[currentPreference]

  return (
    <View style={{ flex: 1, width: '100%' }}>
      <View style={{ flex: 1, width: '100%', paddingLeft: 20, paddingRight: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
          {currentPreference > 0 ? (
            <TouchableOpacity style={{ padding: 10 }} onPress={() => setCurrentPreference(current => current - 1)}>
              <Text>Back</Text>
            </TouchableOpacity>
          ) : (
            <Text style={{ color: 'transparent' }}>Back</Text>
          )}
          <View style={{ paddingLeft: 10, paddingRight: 10, flex: 1 }}>
            <ProgressBar progress={0.5} color={colors.primary} />
          </View>
          <TouchableOpacity style={{ padding: 10 }} onPress={() => navigation.navigate('MainApp')}>
            <Text>Skip</Text>
          </TouchableOpacity>
        </View>
        {/* <Text>
          {preference ? preference.title : ""}
        </Text> */}
      </View>
      <Button
        onPress={() => navigation.navigate('MainApp')}
        style={{ alignSelf: 'flex-end' }}
        title="Start Workout"
        color="#000080"
        accessibilityLabel="Learn more about this purple button"
      />
      <Button
        onPress={() => {
          setCurrentPreference(current => current + 1)
        }}
        title="Next"
        color="#000080"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  )
}

export default hoc(WorkoutPreferenceScreen)