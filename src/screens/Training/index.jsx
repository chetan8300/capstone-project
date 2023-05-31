import { useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native"

// Common Components
import hoc from '../../components/HOC'

const TrainingScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <Text>
        TrainingScreen
      </Text>
    </View>
  )
}

export default hoc(TrainingScreen)