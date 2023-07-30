import React from "react";

import { TouchableOpacity, View } from "react-native";
import { TextInput, Button, Surface, Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// Common Components
import hoc from "../../components/HOC";

import styles from "./styles";

const CalculateBMIScreen = ({
	navigation,
	hideOption = false,
	isDarkMode,
}) => {
	const [height, setHeight] = React.useState("");
	const [weight, setWeight] = React.useState("");
	const [bmi, setBMI] = React.useState(null);

	let mainViewStyle = [styles.lightBackground];
	let textStyle = [{ color: "#4e32bc" }];
	let textBodyStyle = [{ color: "#000" }];
	let buttonStyle = [{ backgroundColor: "#4e32bc" }];

	if (isDarkMode) {
		mainViewStyle = [styles.darkBackground];
		textStyle = [{ color: "#F0DBFF" }];
		textBodyStyle = [{ color: "#fff" }];
		buttonStyle = [{ backgroundColor: "#4e32bc", borderColor: "#4e32bc" }];
	}

	const calculateBMI = () => {
		if (isNaN(height) || isNaN(weight) || height < 0 || weight < 0) {
			alert("Please enter valid height and weight");
			return;
		}

		if (height && weight) {
			const heightInMeters = height / 100;
			const bmiValue = weight / (heightInMeters * heightInMeters);
			setBMI(bmiValue.toFixed(2));
		}
	};

	const getBMIResult = () => {
		let bmiResult = "";
		if (bmi < 18.5) {
			bmiResult = "Underweight";
		} else if (bmi >= 18.5 && bmi <= 24.9) {
			bmiResult = "Normal";
		} else if (bmi >= 25 && bmi <= 29.9) {
			bmiResult = "Overweight";
		} else if (bmi >= 30) {
			bmiResult = "Obese";
		}

		return bmiResult;
	};

	const renderLine = (color, style, bmiOriginalDiff, deduct = 0) => {
		const bmiActualDiff = bmi - deduct;
		const percentage = (bmiActualDiff / bmiOriginalDiff) * 100;

		let show = false;
		if (
			bmiActualDiff < bmiOriginalDiff &&
			bmiActualDiff / bmiOriginalDiff < 1 &&
			bmiActualDiff / bmiOriginalDiff > 0
		) {
			show = true;
		}

		return (
			<View
				style={{
					flex: 1,
					height: 10,
					backgroundColor: color,
					position: "relative",
					...style,
				}}
			>
				{show && (
					<View
						style={{
							position: "absolute",
							left: `${percentage}%`,
							top: -1,
							marginLeft: -6,
							width: 12,
							height: 12,
							borderRadius: 50,
							borderColor: "#fff",
							borderWidth: 2,
							backgroundColor: "black",
						}}
					/>
				)}
			</View>
		);
	};

	return (
		<>
			<View
				style={[
					{ flex: 1, paddingLeft: 16, paddingRight: 16, width: "100%" },
					mainViewStyle,
				]}
			>
				<View style={styles.headerMain}>
					<View>
						{!hideOption && (
							<TouchableOpacity onPress={() => navigation.toggleDrawer()}>
								<MaterialCommunityIcons
									name="menu"
									size={28}
									style={[textStyle]}
								/>
							</TouchableOpacity>
						)}
					</View>
					<View style={styles.header}>
						<Text variant="headlineLarge" style={[styles.name, textStyle]}>
							Calculate BMI
						</Text>
					</View>
				</View>

				<View style={styles.inputContainer}>
					<Text
						variant="bodyLarge"
						style={[{ fontWeight: "bold", marginBottom: 5 }, textBodyStyle]}
					>
						Height
					</Text>
					<TextInput
						style={[styles.textInput, !isDarkMode ? styles.textInput : styles.textInputDark]}
						mode="outlined"
						value={height}
						onChangeText={(text) => {
							if (isNaN(text) || text < 0) {
								return;
							}
							setHeight(text.trim());
						}}
						selectionColor="#4e32bc40"
						numeric
						keyboardType="numeric"
						placeholder="180"
						placeholderTextColor={"#a8a8a8"}
						right={<TextInput.Affix textStyle={{ paddingTop: 5 }} text="cm" />}
					/>

					<Text
						variant="bodyLarge"
						style={[{ fontWeight: "bold", marginBottom: 5 }, textBodyStyle]}
					>
						Weight
					</Text>
					<TextInput
						style={[styles.textInput, !isDarkMode ? styles.textInput : styles.textInputDark]}
						value={weight}
						onChangeText={(text) => {
							if (isNaN(text) || text < 0) {
								return;
							}
							setWeight(text.trim());
						}}
						keyboardType="numeric"
						selectionColor="#4e32bc40"
						mode="outlined"
						placeholder="70"
						placeholderTextColor={"#a8a8a8"}
						right={<TextInput.Affix textStyle={{ paddingTop: 5 }} text="kg" />}
					/>
					<Button mode="contained" style={[styles.button, buttonStyle]} onPress={calculateBMI}>
						Calculate
					</Button>
					{bmi && (
						<Surface style={styles.resultSurface}>
							<View style={!isDarkMode ? styles.resultContainerLight : styles.resultContainerDark}>
								<Text style={[styles.result, textBodyStyle]}>
									Your BMI is{" "}
									<Text
										style={[{
											color: "#4e32bc",
											fontWeight: "bold",
											fontSize: 18,
										}, ]}
									>
										{getBMIResult()}
									</Text>
								</Text>
								<Text style={styles.resultBmi}>{bmi}</Text>
								<Text style={[styles.bmiInfo, textBodyStyle]}>
									Body Mass Index (BMI) is a person's weight in kilograms
									divided by the square of height in meters.
								</Text>
								<View style={{ marginTop: 40, marginBottom: 20 }}>
									<View style={{ flexDirection: "row", gap: 2 }}>
										{renderLine(
											"lightgrey",
											{ borderTopLeftRadius: 4, borderBottomLeftRadius: 4 },
											18.5
										)}
										{renderLine("green", {}, 6.3, 18.6)}
										{renderLine("yellow", {}, 4.9, 24.9)}
										{renderLine(
											"red",
											{ borderTopRightRadius: 4, borderBottomRightRadius: 4 },
											100,
											30
										)}
									</View>
								</View>
							</View>
						</Surface>
					)}
				</View>
			</View>
		</>
	);
};

export default hoc(CalculateBMIScreen);
