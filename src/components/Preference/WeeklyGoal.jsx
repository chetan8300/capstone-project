import React from 'react'

import { View } from 'react-native'
import { RadioButton, Chip, Text, Surface, useTheme } from 'react-native-paper';

const WeeklyGoal = ({ preference, preferenceValues, setPreferenceValues }) => {
  const { colors } = useTheme()

  return (
    <View style={{ paddingTop: 40, paddingLeft: 20, paddingRight: 20, width: '100%' }}>
      <Text variant="bodyLarge" style={{ marginTop: 10, textAlign: 'center' }}>
        Weekly training days
      </Text>
      <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'center', marginTop: 20, flexWrap: 'wrap' }}>
        {preference.options.map((option) => {
          return (
            <Surface key={option.id} style={{ marginBottom: 16, borderRadius: 25, backgroundColor: '#fff' }} elevation={2}>
              <Chip
                style={{ borderWidth: 0, width: 60, height: 60 }}
                textStyle={{ fontWeight: 'bold', fontSize: 30, lineHeight: 30 }}
                mode={preferenceValues.weeklyTrainingDays === option.id ? 'flat' : 'outlined'}
                selected={preferenceValues.weeklyTrainingDays === option.id}
                onPress={() => setPreferenceValues(prev => ({ ...prev, weeklyTrainingDays: option.id }))}
                icon={false}
                elevated
              >
                {option.id}
              </Chip>
            </Surface>
          )
        })}
      </View>
    </View>
  )
}

export default WeeklyGoal