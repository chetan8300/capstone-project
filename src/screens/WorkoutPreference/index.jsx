import { useState } from 'react'

import { View, TouchableOpacity } from 'react-native'
import { Card, Button, Text, TouchableRipple, useTheme } from 'react-native-paper';

// Common Components
import hoc from '../../components/HOC'
import PreferenceTopBar from '../../components/Preference/TopBar'
import GenderSelect from '../../components/Preference/GenderSelect';
import FocusArea from '../../components/Preference/FocusArea';
import WeeklyGoal from '../../components/Preference/WeeklyGoal';

import preferences from './preference';

const defaultPreference = {
  gender: '',
  focusArea: '',
  goal: '',
  pushUpAtOneTime: '',
  activityLevel: '',
  weeklyTrainingDays: '',
  weight: '',
  weightUnit: '',
  height: '',
  heightUnit: '',
}

const WorkoutPreferenceScreen = ({ navigation }) => {
  const [currentPreference, setCurrentPreference] = useState("gender_select")
  const [preferenceValues, setPreferenceValues] = useState(defaultPreference)
  const { colors } = useTheme()

  const preference = preferences.find(preference => preference.id === currentPreference)

  const buttonDisabled = () => {
    let disabled = false

    if (currentPreference === "gender_select" && preferenceValues.gender === "") {
      disabled = true
    } else if (currentPreference === "focus_area" && preferenceValues.focusArea === "") {
      disabled = true
    } else if (currentPreference === "goal_select" && preferenceValues.goal === "") {
      disabled = true
    } else if (currentPreference === "pushup" && preferenceValues.pushUpAtOneTime === "") {
      disabled = true
    }

    return disabled
  }

  return (
    <View style={{ flex: 1, width: '100%', paddingLeft: 20, paddingRight: 20 }}>
      <View style={{ flex: 1, width: '100%' }}>
        <PreferenceTopBar
          preference={preference}
          setCurrentPreference={setCurrentPreference}
          navigation={navigation}
        />
        {preference && (
          <View style={{ alignItems: 'center', marginTop: 10 }}>
            {preference?.title && (
              <Text variant="headlineMedium" style={{ fontWeight: 'bold', textAlign: 'center', textTransform: 'uppercase' }}>
                {preference ? preference.title : ""}
              </Text>
            )}

            {preference?.subtitle && (
              <Text variant="bodyMedium" style={{ marginTop: 10, textAlign: 'center' }}>
                {preference.subtitle}
              </Text>
            )}

            {preference.id === "gender_select" && (
              <GenderSelect preferenceValues={preferenceValues} setPreferenceValues={setPreferenceValues} />
            )}

            {(preference.id === "focus_area" || preference.id === "goal_select" || preference.id === "pushup" || preference.id === "activity_level") && (
              <FocusArea preference={preference} preferenceValues={preferenceValues} setPreferenceValues={setPreferenceValues} />
            )}

            {preference.id === "weekly_goal" && (
              <WeeklyGoal preference={preference} preferenceValues={preferenceValues} setPreferenceValues={setPreferenceValues} />
            )}
          </View>
        )}
      </View>
      {preference?.next ? (
        <Button mode="contained" labelStyle={{ fontSize: 24, lineHeight: 30, borderRadius: 30 }} onPress={() => setCurrentPreference(preference.next)} disabled={buttonDisabled()}>
          Next
        </Button>
      ) : (
        <Button mode="contained" labelStyle={{ fontSize: 24, lineHeight: 30, borderRadius: 30 }} onPress={() => navigation.navigate("MainApp")}>
          Start Workout
        </Button>
      )}
    </View>
  )
}

export default hoc(WorkoutPreferenceScreen)