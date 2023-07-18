import React, { useState } from "react";

import { useFocusEffect } from "@react-navigation/native";
import {
	TouchableHighlight,
	TouchableOpacity,
	View,
	ScrollView,
	BackHandler,
	Alert,
	FlatList,
} from "react-native";
import moment from "moment";
import { Text, Card, useTheme, Searchbar } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// Common Components
import hoc from "../../components/HOC";
import HorizontalLine from "../../components/HorizontalLine";

// Data
import AsyncStorage from "@react-native-async-storage/async-storage";

// Utils
import styles from "./style";

const ReportsScreen = ({ navigation, route, hideOption = false }) => {
	const { colors } = useTheme();
	const [waterHistory, setWaterHistory] = useState([]);
	const [workoutHistory, setWorkoutHistory] = React.useState({});
	const [workoutPreference, setWorkoutPreference] = React.useState({});

	const dateArray = new Array(7).fill(null);

	const keyToNameMap = {
		full_body_7x4: "Full Body 7x4",
		upper_body_7x4: "Upper Body 7x4",
		lower_body_7x4: "Lower Body 7x4",
		abs_beginner: "Abs Beginner",
		chest_beginner: "Chest Beginner",
		arm_beginner: "Arms Beginner",
		leg_beginner: "Legs Beginner",
		shoulder_back_beginner: "Shoulder & Back Beginners",
		abs_intermediate: "Abs Intermediate",
		chest_intermediate: "Chest Intermediate",
		arm_intermediate: "Arms Intermediate",
		leg_intermediate: "Legs Intermediate",
		shoulder_back_intermediate: "Shoulder & Back Intermediate",
		abs_advanced: "Abs Advanced",
		chest_advanced: "Chest Advanced",
		arm_advanced: "Arms Advanced",
		leg_advanced: "Legs Advanced",
		shoulder_back_advanced: "Shoulder & Back Advanced",
	};

	useFocusEffect(
		React.useCallback(() => {
			const loadWaterHistory = async () => {
				try {
					const jsonValue = await AsyncStorage.getItem("@waterTracker:history");
					if (jsonValue !== null) {
						const parsedValue = JSON.parse(jsonValue);
						setWaterHistory(parsedValue);
						console.log("Water History:", parsedValue);
					}
				} catch (error) {
					console.log("Error loading history: ", error);
				}
			};

			loadWaterHistory();
		}, [])
	);

	useFocusEffect(
		React.useCallback(() => {
			const loadWorkoutHistory = async () => {
				try {
					const jsonValue = await AsyncStorage.getItem("@workout:history");
					const parsedValue = jsonValue ? JSON.parse(jsonValue) : {};
					setWorkoutHistory(parsedValue);
					console.log("Workout History:");
					console.log(JSON.stringify(parsedValue, null, 2));
					// console.log("State:", workoutHistory)
				} catch (error) {
					console.log("Error loading history training: ", error);
				}
			};

			loadWorkoutHistory();
		}, [])
	);

	// const waterHistorySample = [
	// 	{ date: "2023-07-17", intake: 10 },
	// 	{ date: "2023-07-16", intake: 10 },
	// 	{ date: "2023-07-15", intake: 10 },
	// 	{ date: "2023-07-14", intake: 10 },
	// 	{ date: "2023-07-13", intake: 10 },
	// 	{ date: "2023-07-12", intake: 10 },
	// ];

	const renderHistoryItem = ({ item, index }) => {
		console.log("ITEM: ", item, index);
		const dateOffset = 6 - index;
		const currentDate = moment();
		const date = currentDate.subtract(dateOffset, "days");
		const waterDataIndex = waterHistory.findIndex((x) =>
			moment(x.date, "YYYY-MM-DD").isSame(date, "day")
		);
		const waterData =
			waterDataIndex !== -1 ? waterHistory[waterDataIndex] : null;
		let workoutHistoryData = {};
		Object.keys(workoutHistory).forEach((key) => {
			if (!key.includes("7x4")) {
				const workoutData = workoutHistory[key];
				const workoutDate =
					workoutData && workoutData[0]
						? moment(workoutData[0].date).format("YYYY-MM-DD")
						: null;
				if (
					workoutDate &&
					moment(workoutDate, "YYYY-MM-DD").isSame(date, "day")
				) {
					workoutHistoryData[key] = workoutData.length;
				} else {
					workoutHistoryData[key] = 0;
				}
			} else {
				const workoutData = workoutHistory[key];
				if (workoutData) {
					const currentObject = workoutData.current;
					if (currentObject && currentObject.weekWiseData) {
						workoutHistoryData[key] = currentObject.weekWiseData.map(
							(weekData) => ({
								week: weekData.week,
								daysCompleted: weekData.daysCompleted,
								completed: weekData.completed,
							})
						);
					} else {
						workoutHistoryData[key] = [];
					}
				} else {
					workoutHistoryData[key] = [];
				}
			}
		});

		// return (
		// 	<View style={styles.reportContainer}>
		// 		<Text style={styles.date}>{moment(date).format("YYYY-MM-DD")}</Text>
		// 		<Text>
		// 			{waterData && waterData.date ? (
		// 				<Text>Intake: {waterData.intake} Glasses</Text>
		// 			) : (
		// 				<Text>No record for water consumption.</Text>
		// 			)}
		// 		</Text>
		// 		{/* <Text>Workout:</Text> */}
		// 		<View>
		// 			{Object.keys(workoutHistoryData).map((key) => {
		// 				if (workoutHistoryData[key] === 0 || key.includes("7x4")) {
		// 					return null;
		// 				}
		// 				{
		// 					/* if (key.includes("7x4")) {
		// 					return (
		// 						<View key={key}>
		// 							<Text>{key}:</Text>
		// 							<View>
		// 								{workoutHistoryData[key].map((weekData) => (
		// 									<Text key={weekData.week}>
		// 										Week {weekData.week}: {weekData.daysCompleted} Days Completed
		// 									</Text>
		// 								))}
		// 							</View>
		// 						</View>
		// 					);
		// 				} */
		// 				}

		// 				return (
		// 					<View>
		// 						<Text key={key}>
		// 							{key}: {workoutHistoryData[key]} Days Completed
		// 						</Text>
		// 					</View>
		// 				);
		// 			})}
		// 		</View>
		// 	</View>
		// );

		return (
			<Card style={styles.card}>
				<Card.Content>
					{/* <Text style={styles.cardText} variant="titleLarge">{moment(date).format("YYYY-MM-DD")}</Text> */}
					<Text style={styles.cardTitle} variant="titleLarge">
						{moment(date).format("dddd, MMMM Do, YYYY")}
					</Text>

					<Text style={styles.cardText}>
						{waterData && waterData.date ? (
							<>
								<Text style={styles.contentHeading}>Water Intake:{'\n'}</Text>
								<Text style={styles.contentStatement}>{waterData.intake} Glasses</Text>
							</>
						) : (
							<Text style={styles.contentStatement}>No record for water consumption.</Text>
						)}
					</Text>
					{/* <Text>Workout:</Text> */}
					{Object.keys(workoutHistoryData).some(
						(key) => workoutHistoryData[key] !== 0
					) ? (
						<View>
							{Object.keys(workoutHistoryData).map((key) => {
								if (workoutHistoryData[key] === 0 || key.includes("7x4")) {
									return null;
								}

								return (
									<>
									<Text style={[styles.contentHeading]} key={key}>
										{keyToNameMap[key]}: 
									</Text>
									<Text style={[styles.cardText, styles.contentStatement]}>
										{workoutHistoryData[key]}x
										Completed
									</Text>
									</>
								);
							})}
						</View>
					) : (
						<Text>No workouts to display.</Text>
					)}
				</Card.Content>
			</Card>
		);
	};

	return (
		<View style={{ flex: 1, paddingLeft: 16, paddingRight: 16, width: "100%" }}>
			<View style={styles.headerMain}>
				<View>
					{!hideOption && (
						<TouchableOpacity onPress={() => navigation.toggleDrawer()}>
							<MaterialCommunityIcons name="menu" size={28} color="black" />
						</TouchableOpacity>
					)}
				</View>

				<View style={styles.header}>
					<Text variant="displaySmall" style={styles.name}>
						Reports
					</Text>
				</View>
			</View>
			<Text variant="titleLarge" style={styles.flatListHeader}>
				Weekly Report
			</Text>
			<HorizontalLine color={colors.secondary} height={2} />
			<FlatList
				style={styles.hr}
				data={dateArray}
				renderItem={renderHistoryItem}
				keyExtractor={(item, index) => index.toString()}
				contentContainerStyle={styles.tableBody}
				ListHeaderComponent={() => null}
			/>
		</View>
	);
};

export default hoc(ReportsScreen);
