import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const styles = StyleSheet.create({
	header: {
		paddingTop: 20,
		paddingBottom: 20,
		// backgroundColor: "rgb(240, 219, 255)",
		alignItems: "center",
		// fontFamily: 'Anton', sans-serif;
		// marginLeft: 100,
	},
	headerMain: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		// marginLeft: 16,
		// marginRight: 55,
	},
	name: {
		color: "#4e32bc",
		fontWeight: "900",
		letterSpacing: 0.3,
		paddingRight: 100,
	},
	tableBody: {
		flexGrow: 1,
	},
	card: {
		marginLeft: "auto",
		marginRight: "auto",
		marginBottom: 15,
		marginTop: 5,
		width: "99%"
	},
	cardText: {
		marginBottom: 10,
	},
	cardTitle: {
		marginBottom: 10,
		color: "#4e32bc",
		fontWeight: "600",
		textDecorationLine: "underline",
	},
	flatListHeader: {
		textAlign: "left",
		marginLeft: 5,
		marginBottom: 10,
		fontWeight: 600
	},
	hr: {
		marginTop: 10
	},
	contentHeading: {
		fontWeight: "500",
		fontSize: 18
	},
	contentStatement: {
		fontSize: 14,
		color: "#525252"
	}
});

export default styles;
