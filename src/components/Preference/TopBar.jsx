import React from 'react';

import { View } from 'react-native'
import { Button, ProgressBar, IconButton, useTheme } from 'react-native-paper';

const PreferenceTopBar = ({ preference, setCurrentPreference, navigation, progress }) => {
  const { colors } = useTheme()

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
      {preference?.prev ? (
        <IconButton
          icon="keyboard-backspace"
          size={30}
          iconColor={colors.primary}
          onPress={() => setCurrentPreference(preference.prev)}
        />
      ) : (
        <IconButton
          icon="keyboard-backspace"
          size={30}
          style={{ opacity: 0 }}
        />
      )}
      <View style={{ paddingLeft: 30, paddingRight: 30, flex: 1 }}>
        <ProgressBar progress={progress} color={colors.primary} />
      </View>
      <Button mode="text" onPress={() => navigation.navigate('MainApp')} labelStyle={{ fontSize: 20 }}>
        Skip
      </Button>
      {/* <IconButton
        icon="keyboard-backspace"
        size={30}
        style={{ opacity: 0 }}
      /> */}
    </View>
  )
}

export default PreferenceTopBar