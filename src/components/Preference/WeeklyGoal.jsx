import React from 'react'

import { View } from 'react-native'
import { Chip, Text, useTheme } from 'react-native-paper';

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
            <Chip
              key={option.id}
              style={{ borderWidth: 0, width: 60, height: 60, ...(preferenceValues.weeklyTrainingDays === option.id ? { backgroundColor: colors.primary } : { borderWidth: 2, borderColor: colors.primary}) }}
              textStyle={{ fontWeight: 'bold', fontSize: 25, lineHeight: 30, marginLeft: 'auto', marginRight: 'auto', ...(preferenceValues.weeklyTrainingDays === option.id ? { color: '#fff' } : { color: colors.primary}) }}
              mode={preferenceValues.weeklyTrainingDays === option.id ? 'flat' : 'outlined'}
              onPress={() => setPreferenceValues(prev => ({ ...prev, weeklyTrainingDays: option.id }))}
            >
              {option.id}
            </Chip>
          )
        })}
      </View>
    </View>
  )
}

export default WeeklyGoal