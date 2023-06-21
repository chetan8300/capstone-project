import { useState } from 'react'

import { View } from 'react-native'
import { Button, Text, Surface } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage'

// Common Components
import hoc from '../../components/HOC'
import PreferenceTopBar from '../../components/Preference/TopBar'
import GenderSelect from '../../components/Preference/GenderSelect';
import FocusArea from '../../components/Preference/FocusArea';
import WeeklyGoal from '../../components/Preference/WeeklyGoal';
import HeightWeightRecoveryTime from '../../components/Preference/HeightWeightRecoveryTime';

import preferences from './preference';

const defaultPreference = {
  gender: '',
  focusArea: '',
  goal: '',
  pushUpAtOneTime: '',
  activityLevel: '',
  weeklyTrainingDays: '',
  weight: '0',
  weightUnit: 'kg',
  height: '0',
  heightUnit: 'cm',
  restTime: '15'
}

const WorkoutPreferenceScreen = ({ navigation }) => {
  const [currentPreference, setCurrentPreference] = useState("gender_select")
  const [preferenceValues, setPreferenceValues] = useState(defaultPreference)
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false)

  const preference = preferences.find(preference => preference.id === currentPreference)
  const preferenceIndex = preferences.findIndex(preference => preference.id === currentPreference) + 1

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
    } else if (currentPreference === "activity_level" && preferenceValues.activityLevel === "") {
      disabled = true
    } else if (currentPreference === "weekly_goal" && preferenceValues.weeklyTrainingDays === "") {
      disabled = true
    }

    return disabled
  }

  const handleGeneratePlan = async () => {
    setIsGeneratingPlan(true)
    try {
      await AsyncStorage.setItem('workoutPreference', JSON.stringify(preferenceValues))
    } catch (error) {
      console.log("error while saving workout preference")
    }
    setTimeout(() => {
      setIsGeneratingPlan(false)
      navigation.navigate("MainApp")
    }, 1500)
  }

  return (
    <View style={{ flex: 1, width: '100%', paddingLeft: 20, paddingRight: 20 }}>
      {!isGeneratingPlan ? (
        <>
          <View style={{ flex: 1, width: '100%' }}>
            <PreferenceTopBar
              preference={preference}
              setCurrentPreference={setCurrentPreference}
              navigation={navigation}
              progress={preferenceIndex / preferences.length}
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

                {preference.id === "height_weight" && (
                  <HeightWeightRecoveryTime preference={preference} preferenceValues={preferenceValues} setPreferenceValues={setPreferenceValues} />
                )}
              </View>
            )}
          </View>
          <Surface style={{ borderRadius: 30, marginBottom: 20 }}>
            {preference?.next ? (
              <Button mode="contained" style={{ borderRadius: 30 }} labelStyle={{ fontSize: 24, lineHeight: 30, textTransform: 'uppercase' }} onPress={() => setCurrentPreference(preference.next)} disabled={buttonDisabled()}>
                Next
              </Button>
            ) : (
              <Button
                mode="contained"
                style={{ borderRadius: 30 }}
                labelStyle={{ fontSize: 24, lineHeight: 30, textTransform: 'uppercase' }}
                onPress={handleGeneratePlan}
              >
                Get My Plan
              </Button>
            )}
          </Surface>
        </>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text variant="headlineMedium" style={{ fontWeight: 'bold', textAlign: 'center', textTransform: 'uppercase' }}>
            Generating your plan
          </Text>
          <Text variant="bodyMedium" style={{ marginTop: 10, textAlign: 'center' }}>
            Preparing your plan based on your goal...
          </Text>
        </View>
      )}
    </View>
  )
}

export default hoc(WorkoutPreferenceScreen)