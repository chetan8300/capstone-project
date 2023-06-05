import React from 'react'

import { View } from 'react-native'
import { Divider, Text, HelperText, TextInput, SegmentedButtons } from 'react-native-paper'

const HeightWeightRecoveryTime = () => {
  const [weight, setWeight] = React.useState('0')
  const [height, setHeight] = React.useState('0')
  const [weightMeasure, setWeightMeasure] = React.useState('kg')
  const [heightMeasure, setHeightMeasure] = React.useState('cm')
  const [restTime, setRestTime] = React.useState('15')

  return (
    <View>
      <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20, marginTop: 20, width: '100%', alignItems: 'flex-end' }}>
        <View style={{ flex: 1 }}>
          <Text variant="bodyLarge" style={{ fontWeight: 'bold', marginBottom: 5 }}>
            Weight
          </Text>
          <TextInput
            value={weight}
            onChangeText={text => setWeight(text)}
            keyboardType="numeric"
            mode="flat"
            placeholder={weightMeasure === 'kg' ? 'KG' : 'LB'}
            dense
          />
        </View>
        <SegmentedButtons
          value={weightMeasure}
          onValueChange={value => setWeightMeasure(value)}
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
            value={height}
            onChangeText={text => setHeight(text)}
            keyboardType="numeric"
            mode="flat"
            placeholder={heightMeasure === 'cm' ? 'CM' : 'IN'}
            dense
          />
        </View>
        <SegmentedButtons
          value={heightMeasure}
          onValueChange={value => setHeightMeasure(value)}
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
          value={restTime}
          onChangeText={text => setRestTime(text)}
          keyboardType="numeric"
          mode="outlined"
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