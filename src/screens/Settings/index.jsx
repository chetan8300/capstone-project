import { View, Text } from 'react-native'

// Common Components
import hoc from '../../components/HOC'

const SettingsScreen = () => {
  return (
    <View>
      <Text>
        SettingsScreen
      </Text>
    </View>
  )
}

export default hoc(SettingsScreen)