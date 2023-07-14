import React from 'react'

import { View } from 'react-native'
import { Divider, Text, HelperText, TextInput, SegmentedButtons } from 'react-native-paper'

const HeightWeightRecoveryTime = ({ preferenceValues, setPreferenceValues }) => {
  const handleChange = (text, type) => {
    if (isNaN(text) || text < 0) {
      return
    }
    setPreferenceValues(prev => ({ ...prev, [type]: text.trim() }))
  }

  return (
    <View>
      <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20, marginTop: 20, width: '100%', alignItems: 'flex-end' }}>
        <View style={{ flex: 1 }}>
          <Text variant="bodyLarge" style={{ fontWeight: 'bold', marginBottom: 5 }}>
            Weight
          </Text>
          <TextInput
            value={preferenceValues.weight}
            onChangeText={text => handleChange(text, 'weight')}
            keyboardType="numeric"
            mode="flat"
            placeholder={preferenceValues.weightUnit === 'kg' ? 'KG' : 'LB'}
            returnKeyType="done"
            dense
          />
        </View>
        <SegmentedButtons
          value={preferenceValues.weightUnit}
          onValueChange={value => setPreferenceValues(prev => ({ ...prev, weightUnit: value }))}
          style={{ flex: 1 }}
          density="small"
          buttons={[
            {
              value: 'kg',
              label: 'KG',
              style: { width: 30 }
            },
            {
              value: 'lb',
              label: 'LB',
              style: { width: 30 }
            },
          ]}
        />
      </View>
      <Divider />
      <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20, marginTop: 20, width: '100%', alignItems: 'flex-end' }}>
        <View style={{ flex: 1 }}>
          <Text variant="bodyLarge" style={{ fontWeight: 'bold', marginBottom: 5 }}>
            Height
          </Text>
          <TextInput
            value={preferenceValues.height}
            onChangeText={text => handleChange(text, 'height')}
            keyboardType="numeric"
            mode="flat"
            placeholder={preferenceValues.heightUnit === 'cm' ? 'CM' : 'IN'}
            returnKeyType="done"
            dense
          />
        </View>
        <SegmentedButtons
          value={preferenceValues.heightUnit}
          onValueChange={value => setPreferenceValues(prev => ({ ...prev, heightUnit: value }))}
          style={{ flex: 1 }}
          density="small"
          buttons={[
            {
              value: 'cm',
              label: 'CM',
              style: { width: 30 }
            },
            {
              value: 'in',
              label: 'IN',
              style: { width: 30 }
            },
          ]}
        />
      </View>
      <Divider />
      <View style={{ flex: 1, marginTop: 20 }}>
        <Text variant="bodyLarge" style={{ fontWeight: 'bold' }}>
          Rest Time
        </Text>
        <TextInput
          value={preferenceValues.restTime}
          onChangeText={text => handleChange(text, 'restTime')}
          keyboardType="numeric"
          mode="outlined"
          returnKeyType="done"
          dense
        />
        <HelperText>
          Recovery time between sets in seconds (default: 15)
        </HelperText>
      </View>
    </View>
  )
}

export default HeightWeightRecoveryTime