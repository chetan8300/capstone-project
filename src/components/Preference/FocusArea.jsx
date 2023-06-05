import React from 'react'

import { Image, View } from 'react-native'
import { Button, Divider, HelperText } from 'react-native-paper';

const FocusArea = ({ preference, preferenceValues, setPreferenceValues }) => {
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
      <View style={{ gap: 16 }}>
        {preference.options.map((option) => {
          return (
            <View key={option.id}>
              <Button
                icon={option.icon ?
                  ({ size }) => (
                    <Image
                      source={option.icon}
                      style={{ width: size, height: size }}
                    />
                  ) : "camera"
                }
                style={{ borderRadius: 30 }}
                labelStyle={{ fontSize: 18, lineHeight: 30 }}
                mode={preferenceValues[key] === option.id ? "contained" : "contained-tonal"}
                onPress={() => setPreferenceValues(prev => ({ ...prev, [key]: option.id }))}
              >
                {option.label}
              </Button>

              {option?.helperText && (
                <>
                  <HelperText>
                    {option.helperText}
                  </HelperText>
                  <Divider />
                </>
              )}
            </View>
          )
        })}
      </View>
    </View>
  )
}

export default FocusArea