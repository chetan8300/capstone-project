import React from 'react'

import { View } from 'react-native'
import { Card, Text, TouchableRipple, useTheme } from 'react-native-paper';

const GenderSelect = ({ preferenceValues, setPreferenceValues }) => {
  const { colors } = useTheme()

  return (
    <View style={{ flexDirection: 'row', gap: 20, paddingTop: 40, paddingLeft: 20, paddingRight: 20 }}>
      <View style={{ flex: 1, borderWidth: 2, borderRadius: 12, padding: 10, ...(preferenceValues.gender === "male" ? { borderColor: colors.primary } : { borderColor: 'transparent' }) }}>
        <Card>
          <TouchableRipple
            onPress={() => setPreferenceValues(prev => ({ ...prev, gender: 'male' }))}
            rippleColor="rgba(0, 0, 0, .32)"
          >
            <Card.Cover style={{ height: 400 }} source={require("./../../assets/preference/male.png")} />
          </TouchableRipple>
        </Card>
        <Text style={{ paddingTop: 10, fontWeight: 'bold', textAlign: 'center', color: colors.primary }} variant="headlineSmall">Male</Text>
      </View>
      <View style={{ flex: 1, borderWidth: 2, borderRadius: 12, padding: 10, ...(preferenceValues.gender === "female" ? { borderColor: colors.primary } : { borderColor: 'transparent' }) }}>
        <Card>
          <TouchableRipple
            onPress={() => setPreferenceValues(prev => ({ ...prev, gender: 'female' }))}
            rippleColor="rgba(0, 0, 0, .32)"
          >
            <Card.Cover style={{ height: 400 }} source={require("./../../assets/preference/female.png")} />
          </TouchableRipple>
        </Card>
        <Text style={{ paddingTop: 10, fontWeight: 'bold', textAlign: 'center', color: colors.primary }} variant="headlineSmall">Female</Text>
      </View>
    </View>
  )
}

export default GenderSelect