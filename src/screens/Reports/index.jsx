import React, { useState } from "react";

import { useFocusEffect } from "@react-navigation/native";
import {
	TouchableOpacity,
	View,
	FlatList,
} from "react-native";
import moment from "moment";
import { Text, Card, useTheme } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// Common Components
import hoc from "../../components/HOC";
import HorizontalLine from "../../components/HorizontalLine";

// Data
import AsyncStorage from "@react-native-async-storage/async-storage";

// Utils
import styles from "./style";
import { Fragment } from "react/cjs/react.production.min";

const ReportsScreen = ({ navigation, hideOption = false, isDarkMode }) => {
	const { colors } = useTheme();
	const [waterHistory, setWaterHistory] = useState([]);
	const [workoutHistory, setWorkoutHistory] = React.useState({});

	let textStyle = [{ color: "#4e32bc" }];
	let textBodyStyle = [{ color: "#000" }];
	let textheadingStyle = [{ color: "#000" }];
	let cardBackground = [{}]

	if (isDarkMode) {
		textStyle = [{ color: "#F0DBFF" }];
		textBodyStyle = [{ color: "#fff" }];
		textheadingStyle = [{ color: "#FBF6FF" }];
		cardBackground = [{ backgroundColor: "#555" }]
	}

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
				} catch (error) {
					console.log("Error loading history training: ", error);
				}
			};

			loadWorkoutHistory();
		}, [])
	);

	const renderHistoryItem = ({ item, index }) => {
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

		const workoutForDate = Object.keys(workoutHistoryData).every(
			(key) => workoutHistoryData[key] !== 0
		)

		console.log("workoutForDate", workoutForDate);

		return (
			<Card style={[styles.card, cardBackground]}>
				<Card.Content>
					<Text style={[styles.cardTitle, textStyle]} variant="titleLarge">
						{moment(date).format("dddd, MMMM Do, YYYY")}
					</Text>

					<Text style={styles.cardText}>
						{waterData && waterData.date ? (
							<>
								<Text style={[styles.contentHeading, textheadingStyle]}>Water Intake:{"\n"}</Text>
								<Text style={[styles.contentStatement, textBodyStyle]}>
									{waterData.intake} Glasses
								</Text>
							</>
						) : (
							<Text style={[styles.contentStatement, textBodyStyle]}>
								No record for water consumption.
							</Text>
						)}
					</Text>
					{/* <Text>Workout:</Text> */}
					{workoutForDate && Object.keys(workoutHistoryData).length > 0 ? (
						<View>
							{Object.keys(workoutHistoryData).map((key) => {
								if (workoutHistoryData[key] === 0 || key.includes("7x4")) {
									return null;
								}

								return (
									<Fragment key={key}>
										<Text style={[styles.contentHeading, textheadingStyle]} key={key}>
											{keyToNameMap[key]}:
										</Text>
										<Text style={[styles.cardText, styles.contentStatement, textBodyStyle]}>
											{workoutHistoryData[key]}x Completed
										</Text>
									</Fragment>
								);
							})}
						</View>
					) : (
						<View style={styles.contentStatementContainer}>
							<Text style={[styles.contentStatement, textBodyStyle]}>
								No workouts report to display.
							</Text>
						</View>
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
							<MaterialCommunityIcons name="menu" size={28} style={[textStyle]} />
						</TouchableOpacity>
					)}
				</View>

				<View style={styles.header}>
					<Text variant="headlineLarge" style={[styles.name, textStyle]}>
						Reports
					</Text>
				</View>
			</View>
			<Text variant="titleLarge" style={[styles.flatListHeader, textStyle]}>
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
