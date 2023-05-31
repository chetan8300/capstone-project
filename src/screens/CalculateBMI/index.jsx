import { View, Text } from 'react-native'

// Common Components
import hoc from '../../components/HOC'

const CalculateBMIScreen = () => {
  return (
    <View>
      <Text>
        CalculateBMIScreen
      </Text>
    </View>
  )
}

export default hoc(CalculateBMIScreen)