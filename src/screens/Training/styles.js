import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";


const styles = (colors) => StyleSheet.create({
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
		fontWeight: "900",
		paddingRight: 20,
		textAlign: "center",
		// color: "#4e32bc",
	},
	nameLight:{
		color: "#4e32bc",
	},
	nameDark:{
		color: "#F0DBFF",
		
	},
	searchBar: {
		marginBottom: 20,
	},
	bolt: {
		borderColor: "#fff",
		borderWidth: 1,
	},

	trainingProgessOngoingBackground: {
		position: "absolute",
		height: 10,
		borderRadius: 8,
		backgroundColor: colors.primary,
	},
	// trainingProgessOngoingBackgroundLight : {
	// 	backgroundColor: colors.primary,
	// },
	// trainingProgessOngoingBackgroundDark : {
	// 	backgroundColor: "#F0DBFF",
	// }
});

export default styles;
