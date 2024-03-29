import React, { useState } from "react";

import { useFocusEffect } from "@react-navigation/native";
import {
	TouchableHighlight,
	TouchableOpacity,
	View,
	ScrollView,
	BackHandler,
	Alert,
} from "react-native";
import { Text, Card, useTheme, Searchbar } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// Common Components
import hoc from "../../components/HOC";

// Utils
import { workoutByType } from "../../utils/workouts";
import makeStyles from "./styles";

// Data
import AsyncStorage from "@react-native-async-storage/async-storage";

const TrainingScreen = ({ navigation, route, hideOption = false, isDarkMode }) => {
	const { colors } = useTheme();
	const styles = makeStyles(colors)
	const [workoutHistory, setWorkoutHistory] = React.useState(null);
	const [workoutPreference, setWorkoutPreference] = React.useState({});

	//Search bar accessories
	const [searchQuery, setSearchQuery] = useState("");
	const onChangeSearch = (query) => setSearchQuery(query);

	let mainViewStyle = [styles.lightBackground];
	let textStyle = [{ color: "#4e32bc" }];
	let textBodyStyle = [{ color: "#000" }];
	let buttonStyle = [{ backgroundColor: "#4e32bc" }];
	let cardBackground = [{}]

	if (isDarkMode) {
		mainViewStyle = [styles.darkBackground];
		textStyle = [{ color: "#F0DBFF" }];
		textBodyStyle = [{ color: "#fff" }];
		buttonStyle = [{ backgroundColor: "#4e32bc", borderColor: "#4e32bc" }];
		cardBackground = [{ backgroundColor: "#555" }]
	}

	useFocusEffect(
		React.useCallback(() => {
			const loadHistory = async () => {
				try {
					const jsonValue = await AsyncStorage.getItem("@workout:history");
					const parsedValue = jsonValue ? JSON.parse(jsonValue) : {};
					setWorkoutHistory(parsedValue);
				} catch (error) {
					console.log("Error loading history training: ", error);
				}
			};

			loadHistory();
		}, [])
	);

	useFocusEffect(
		React.useCallback(() => {
			(async () => {
				try {
					const data = await AsyncStorage.getItem("workoutPreference");
					setWorkoutPreference(data ? JSON.parse(data) : {});
				} catch (error) {
					console.log(error);
				}
			})();
		}, [])
	);

	React.useEffect(
		() =>
			navigation.addListener("beforeRemove", (e) => {
				// Prevent default behavior of leaving the screen
				e.preventDefault();

				// Prompt the user before leaving the screen
				Alert.alert("Hold on!", `Are you sure you want to exit app?`, [
					{
						text: "Cancel",
						onPress: () => { },
						style: "cancel",
					},
					{ text: "YES", onPress: () => BackHandler.exitApp() },
				]);
			}),
		[navigation]
	);

	const gender = workoutPreference?.gender || "male";

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
					<Text variant="headlineLarge" style={[styles.name, !isDarkMode ? styles.nameLight : styles.nameDark]}>
						Fitter
					</Text>
				</View>
			</View>

			<Searchbar
				placeholder="Search"
				onChangeText={onChangeSearch}
				value={searchQuery}
				style={styles.searchBar}
			/>

			<ScrollView>
				{Object.keys(workoutByType).map((key) => {
					const workouts = workoutByType[key];
					const filteredWorkouts = workouts.filter((workout) =>
						workout.name.toLowerCase().includes(searchQuery.toLowerCase())
					);

					const workoutList = searchQuery ? filteredWorkouts : workouts
					return (
						<View key={key} style={{ marginBottom: 16 }}>
							<Text
								variant="headlineMedium"
								style={[{ paddingBottom: 16, textTransform: "capitalize" }, textBodyStyle]}
							>
								{key}
							</Text>
							<View style={[{ gap: 16 }]}>
								{workoutList.length > 0 ?
									workoutList.map((workout) => {
										const progress =
											workoutHistory?.[workout.id]?.current || null;
										return (
											<TouchableHighlight
												style={{ borderRadius: 12 }}
												key={`${key}-${workout.id}`}
												onPress={() => {
													if (key === "7x4") {
														navigation.navigate("WorkoutWeeksList", {
															workoutType: key,
															workout: workout.id,
														});
													} else {
														navigation.navigate("DayExercisesList", {
															workoutType: key,
															workout: workout.id,
														});
													}
												}}
											>
												<Card style={{ position: "relative" }}>
													<Card.Cover
														source={
															gender === "male"
																? workout.male_icon
																: workout.female_icon
														}
														blurRadius={4}
													/>
													<Card.Title
														title={workout.name}
														subtitle={workout.subtitle}
														titleStyle={{
															color: "#fff",
															fontSize: 26,
															lineHeight: 26,
															fontWeight: "bold",
															textTransform: "uppercase",
														}}
														subtitleStyle={{
															color: "#fff",
															fontSize: 20,
															lineHeight: 20,
															fontWeight: "bold",
															textTransform: "uppercase",
														}}
														style={{ position: "absolute", top: 10 }}
													/>
													{key === "7x4" ? (
														progress &&
														progress?.daysCompleted > 0 && (
															<View
																style={{
																	position: "absolute",
																	bottom: 16,
																	paddingLeft: 16,
																	paddingRight: 16,
																	width: "100%",
																}}
															>
																<View
																	style={{
																		flexDirection: "row",
																		justifyContent: "space-between",
																		marginBottom: 6,
																	}}
																>
																	<Text style={{ color: "#fff" }}>
																		{28 - progress.daysCompleted} Days Left
																	</Text>
																	<Text style={{ color: "#fff" }}>
																		{Math.ceil(
																			(progress.daysCompleted / 28) * 100
																		)}
																		%
																	</Text>
																</View>
																<View
																	style={{
																		position: "relative",
																		width: "100%",
																		backgroundColor: "#9BABB8",
																		height: 10,
																		borderRadius: 8,
																	}}
																>
																	<View
																		style={[
																			styles.trainingProgessOngoingBackground,
																			// !isDarkMode ? styles.trainingProgessOngoingBackgroundLight : styles.trainingProgessOngoingBackgroundDark,
																			{
																				width: `${(progress.daysCompleted / 28) * 100}%`
																			}
																		]}
																	/>
																</View>
															</View>
														)
													) : (
														<View
															style={{
																position: "absolute",
																bottom: 16,
																paddingLeft: 16,
																paddingRight: 16,
																width: "100%",
																flexDirection: "row",
																gap: 2,
															}}
														>
															{[...Array(3)].map((icon, index) => {
																return index + 1 <= workout.difficultyLevel ? (
																	<MaterialCommunityIcons
																		key={`bolt-${workout.id}-${index}`}
																		name="lightning-bolt"
																		size={24}
																		color={colors.secondary}
																	/>
																) : (
																	<MaterialCommunityIcons
																		key={`bolt-${workout.id}-${index}`}
																		name="lightning-bolt-outline"
																		size={24}
																		color="#fff"
																	/>
																);
															})}
														</View>
													)}
												</Card>
											</TouchableHighlight>
										);
									})
									:
									<Text variant="titleSmall" style={{ color: isDarkMode ? "#888" : "#777" }}>No workouts to display</Text>
								}
							</View>
						</View>
					);
				})}
			</ScrollView>
		</View>
	);
};

export default hoc(TrainingScreen);
