import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const styles = StyleSheet.create({
	header: {
		paddingTop: 20,
		paddingBottom: 20,
		alignItems: "center",
		// fontFamily: 'Anton', sans-serif;
		flex: 1
	},
	headerMain: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	name: {
		color: "#4e32bc",
		fontWeight: "900",
		paddingRight: 20,
		textAlign: "center"
	},
	searchBar: {
		marginBottom: 20,
	},
	bolt: {
		borderColor: "#fff",
		borderWidth: 1,
	},
});

export default styles;
