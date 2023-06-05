import { useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";

// Common Components
import hoc from "../../components/HOC";

// Utils
import { workoutByType } from "../../utils/workouts";

const TrainingScreen = () => {
	const navigation = useNavigation();

	return (
		<View style={{ flex: 1 }}>
			{Object.keys(workoutByType).map((key) => {
        const workouts = workoutByType[key]
				return (
          <View key={key}>
            <Text>{key} {workouts.length}</Text>
            {workouts.map(workout => {
              return (
                <Text key={`${key}-${workout.id}`}>{workout.name}</Text>
              )
            })}
          </View>
        );
			})}
		</View>
	);
};

export default hoc(TrainingScreen);
