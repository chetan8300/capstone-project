import React, { useState } from "react";

import { useFocusEffect } from "@react-navigation/native";
import {
  TouchableOpacity,
  View,
} from "react-native";
import { Text, Surface, Divider, useTheme } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// Common Components
import hoc from "../../components/HOC";

// Data
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "./style";

const ReportsScreen = ({ navigation, route, hideOption = false, isDarkMode }) => {
  const { colors } = useTheme();

  const [waterHistory, setWaterHistory] = useState([]);
  const [workoutHistory, setWorkoutHistory] = React.useState({});
  const [workoutPreference, setWorkoutPreference] = React.useState({});
  const [weightHistory, setWeightHistory] = React.useState([]);

  let textStyle = [{ color: "#4e32bc" }];
	let whiteColor = [{color: "#4e32bc"}]
	let cardBackground = [{}]

	if (isDarkMode) {
		textStyle = [{ color: "#F0DBFF" }];
		whiteColor = [{ color: "#333" }];
		cardBackground = [{backgroundColor: "#9EA2E5"}]
	}

  useFocusEffect(
    React.useCallback(() => {
      const loadWaterHistory = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem("@waterTracker:history");
          const data = jsonValue != null ? JSON.parse(jsonValue) : [];
          setWaterHistory(data);
        } catch (e) {
          console.log(e);
        }
      };

      const loadWeightHistory = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem("@weightTracker:history");
          const data = jsonValue != null ? JSON.parse(jsonValue) : [];
          setWeightHistory(data);
        } catch (e) {
          console.log(e);
        }
      };

      const loadWorkoutHistory = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem("@workout:history");
          const data = jsonValue != null ? JSON.parse(jsonValue) : {};
          setWorkoutHistory(data);
        } catch (e) {
          console.log(e);
        }
      };

      const loadWorkoutPreference = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem("workoutPreference");
          const data = jsonValue != null ? JSON.parse(jsonValue) : {};
          setWorkoutPreference(data);
        } catch (e) {
          console.log(e);
        }
      };

      loadWaterHistory();
      loadWeightHistory();
      loadWorkoutHistory();
      loadWorkoutPreference();
    }, [])
  );

  // console.log("Water History:", waterHistory);
  // console.log("Weight History:", weightHistory);
  // console.log("Workout History:", workoutHistory);
  // console.log("Workout Preference:", workoutPreference);

  // workout goal
  const goal = workoutPreference.goal;

  // calculate weight history
  const calculateWeightHistory = () => {
    if (weightHistory.length <= 2) {
      return 0
    }

    const weightHistorySorted = weightHistory.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });

    // get last 2 items from array
    const lastTwoItems = weightHistorySorted.slice(-2);

    if (lastTwoItems[0].intake < lastTwoItems[1].intake) {
      if (goal === "lose_weight") {
        return `Increased by ${lastTwoItems[1].intake - lastTwoItems[0].intake} kg since last record. You need to push harder to achieve your goal.`
      } else if (goal === "build_muscle") {
        return `Increased by ${lastTwoItems[1].intake - lastTwoItems[0].intake} kg since last record. You are on the right track.`
      } else {
        return `Increased by ${lastTwoItems[1].intake - lastTwoItems[0].intake} kg since last record. Keep it up.`
      }
    } else if (lastTwoItems[0].intake > lastTwoItems[1].intake) {
      if (goal === "lose_weight") {
        return `Decreased by ${lastTwoItems[0].intake - lastTwoItems[1].intake} kg since last record. You are on the right track.`
      } else if (goal === "build_muscle") {
        return `Decreased by ${lastTwoItems[0].intake - lastTwoItems[1].intake} kg since last record. You need to push harder to achieve your goal.`
      } else {
        return `Decreased by ${lastTwoItems[0].intake - lastTwoItems[1].intake} kg since last record. Keep it up.`
      }
    } else {
      return "No change since last record"
    }
  }

  // total glass of water drank till date
  const totalWaterDrank = waterHistory.reduce((acc, curr) => {
    return acc + curr.intake;
  }, 0);

  // console.log("WaterDrank:", totalWaterDrank);

  // // total workout done till date
  const totalWorkoutDone = Object.keys(workoutHistory).reduce((acc, curr) => {
    if (curr === "full_body_7x4") {
      return acc + workoutHistory[curr].history.length * 28;
    }
    return acc + workoutHistory[curr].length;
  }, 0);

  // console.log("WorkoutDone:", totalWorkoutDone);

  // achievement level for water
  // level 1: 100 glass of water
  // level 2: 250 glass of water
  // level 3: 400 glass of water
  // level 4: 400+ glass of water
  const waterAchievementLevel = () => {
    if (totalWaterDrank >= 400) {
      return 4;
    } else if (totalWaterDrank >= 250) {
      return 3;
    } else if (totalWaterDrank >= 100) {
      return 2;
    } else {
      return 1;
    }
  };

  // achievement level for workout
  // level 1: 10 workout
  // level 2: 25 workout
  // level 3: 50 workout
  // level 4: 50+ workout
  const workoutAchievementLevel = () => {
    if (totalWorkoutDone >= 50) {
      return 4;
    } else if (totalWorkoutDone >= 25) {
      return 3;
    } else if (totalWorkoutDone >= 10) {
      return 2;
    } else {
      return 1;
    }
  };

  const waterLevel = waterAchievementLevel()
  const workoutLevel = workoutAchievementLevel()
  const weightHistoryResult = calculateWeightHistory()

  return (
    <View style={{ flex: 1, paddingLeft: 16, paddingRight: 16, width: "100%" }}>
      <View style={styles.headerMain}>
        <View>
          {!hideOption && (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <MaterialCommunityIcons name="menu" size={28} style={[textStyle]} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.header}>
          <Text variant="headlineLarge" style={[styles.name, textStyle]}>
            Achievements
          </Text>
        </View>
      </View>

      <View>
        <Surface elevation={4} style={[{ padding: 16, borderRadius: 10 }, cardBackground]}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'center' }}>
            <MaterialCommunityIcons name="cup-water" size={28} style={[{ color: colors.primary }, whiteColor]} />
            <Text variant="headlineLarge" style={[{ marginLeft: 8, fontWeight: 'bold', color: colors.primary }, whiteColor]}>
              Water
            </Text>
          </View>
          <Divider style={{ marginVertical: 8 }} />

          <View>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between' }}>
              <Text variant="titleLarge" style={[{ color: colors.primary }, whiteColor]}>
                Glasses
              </Text>
              <Text variant="headlineLarge" style={[{ color: colors.primary }, whiteColor]}>
                {totalWaterDrank > 400 ? "400+" : totalWaterDrank}
              </Text>
            </View>

            <Divider style={{ marginVertical: 8 }} />

            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between' }}>
              <Text variant="titleLarge" style={[{ color: colors.primary }, whiteColor]}>
                Level
              </Text>
              <Text variant="headlineLarge" style={[{ color: colors.primary }, whiteColor]}>
                {waterLevel}
              </Text>
            </View>

            <Divider style={{ marginVertical: 8 }} />

            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between' }}>
              <Text variant="titleLarge" style={[{ color: colors.primary }, whiteColor]}>
                Badges
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {waterLevel >= 1 && <MaterialCommunityIcons name="star-circle-outline" size={35} style={[{ color: colors.primary }, whiteColor]} />}
                {waterLevel >= 2 && <MaterialCommunityIcons name="trophy-variant-outline" size={35} style={[{ color: colors.primary }, whiteColor]} />}
                {waterLevel >= 3 && <MaterialCommunityIcons name="medal-outline" size={35} style={[{ color: colors.primary }, whiteColor]} />}
                {waterLevel >= 4 && <MaterialCommunityIcons name="trophy-award" size={35} style={[{ color: colors.primary }, whiteColor]} />}
              </View>
            </View>
          </View>
        </Surface>

        <Surface elevation={4} style={[{ padding: 16, borderRadius: 10, marginTop: 16 }, cardBackground]}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'center' }}>
            <MaterialCommunityIcons name="dumbbell" size={28} style={[{ color: colors.primary }, whiteColor]} />
            <Text variant="headlineLarge" style={[{ marginLeft: 8, fontWeight: 'bold', color: colors.primary }, whiteColor]}>
              Workout
            </Text>
          </View>
          <Divider style={{ marginVertical: 8 }} />

          <View>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between' }}>
              <Text variant="titleLarge" style={[{ color: colors.primary }, whiteColor]}>
                Completed
              </Text>
              <Text variant="headlineLarge" style={[{ color: colors.primary }, whiteColor]}>
                {totalWorkoutDone > 50 ? "50+" : totalWorkoutDone}
              </Text>
            </View>

            <Divider style={{ marginVertical: 8 }} />

            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between' }}>
              <Text variant="titleLarge" style={[{ color: colors.primary }, whiteColor]}>
                Level
              </Text>
              <Text variant="headlineLarge" style={[{ color: colors.primary }, whiteColor]}>
                {workoutLevel}
              </Text>
            </View>

            <Divider style={{ marginVertical: 8 }} />

            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between' }}>
              <Text variant="titleLarge" style={[{ color: colors.primary }, whiteColor]}>
                Badges
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {workoutLevel >= 1 && <MaterialCommunityIcons name="star-circle-outline" size={35} style={[{ color: colors.primary }, whiteColor]} />}
                {workoutLevel >= 2 && <MaterialCommunityIcons name="trophy-variant-outline" size={35} style={[{ color: colors.primary }, whiteColor]} />}
                {workoutLevel >= 3 && <MaterialCommunityIcons name="medal-outline" size={35} style={[{ color: colors.primary }, whiteColor]} />}
                {workoutLevel >= 4 && <MaterialCommunityIcons name="trophy-award" size={35} style={[{ color: colors.primary }, whiteColor]} />}
              </View>
            </View>
          </View>
        </Surface>

        <Surface elevation={4} style={[{ padding: 16, borderRadius: 10, marginTop: 16 }, cardBackground]}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'center' }}>
            <MaterialCommunityIcons name="weight-lifter" size={28} style={[{ color: colors.primary }, whiteColor]} />
            <Text variant="headlineLarge" style={[{ marginLeft: 8, fontWeight: 'bold', color: colors.primary }, whiteColor]}>
              Weight
            </Text>
          </View>
          <Divider style={{ marginVertical: 8 }} />

          <View>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between' }}>
              <View />
              {weightHistoryResult === 0 ? (
                <Text variant="titleLarge" style={[{ color: "#888" }, whiteColor]}>
                  Not enough data to show
                </Text>
              ) : (
                <Text variant="titleSmall" style={[{ color: "#777", textAlign: 'center' }, whiteColor]}>
                  {weightHistoryResult}
                </Text>
              )}
              <View />
            </View>
          </View>
        </Surface>
      </View>
    </View>
  );
};

export default hoc(ReportsScreen);