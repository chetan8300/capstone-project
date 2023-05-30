import { View, Text } from 'react-native'

// Common Components
import hoc from '../../components/HOC'

const DiscoverScreen = () => {
  return (
    <View>
      <Text>
        DiscoverScreen
      </Text>
    </View>
  )
}

export default hoc(DiscoverScreen)