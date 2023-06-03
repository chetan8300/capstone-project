import React from 'react'

import { View, Platform } from 'react-native'
import { RadioButton, Surface, useTheme } from 'react-native-paper';

const os = Platform.OS === 'ios' ? 'ios' : 'android'

const FocusArea = ({ preference, preferenceValues, setPreferenceValues }) => {
  const { colors } = useTheme()

  let key = "focusArea"
  if (preference.id === "goal_select") {
    key = "goal"
  } else if (preference.id === "pushup") {
    key = "pushUpAtOneTime"
  } else if (preference.id === "activity_level") {
    key = "activityLevel"
  }

  return (
    <View style={{ paddingTop: 40, paddingLeft: 20, paddingRight: 20, width: '100%' }}>
      <RadioButton.Group onValueChange={newValue => setPreferenceValues(prev => ({ ...prev, [key]: newValue }))} value={preferenceValues[key]}>
        {preference.options.map((option) => {
          return (
            <Surface key={option.id} style={{ marginBottom: 16, borderRadius: 25, backgroundColor: '#fff' }} elevation={2}>
              <RadioButton.Item
                value={option.id}
                mode={os}
                label={option.label}
                labelStyle={{ color: colors.primary, fontWeight: 'bold' }}
              />
            </Surface>
          )
        })}
      </RadioButton.Group>
    </View>
  )
}

export default FocusArea