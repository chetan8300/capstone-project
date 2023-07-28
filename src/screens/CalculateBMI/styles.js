import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const styles = StyleSheet.create({
    lightBackground: {
        backgroundColor: "#fff"
      },
      darkBackground: {
        backgroundColor: "#231F20"
      },
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
    appBar:{
        width: '100%',
        height: 70,
        padding: 20,
        backgroundColor: '#4e32bc',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
    },
    subTitle: {
        fontSize: 20,
        marginTop: 25,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    inputContainer: {
        marginTop: 40,
        flex: 1,
        alignItems: 'center',
    },
    textInput: {
        height: 40,
        width: 160,
        borderRadius: 5,
        marginBottom: 10,
        textAlign: 'center',
    },
    textInputDark: {
        backgroundColor: "#F0DBFF"
    },
    button: {
        marginTop: 10,
        width: 160,
        // padding: 10,
        // borderRadius: 50,
        // textAlign: 'center'
    },
    btnText: {
        textAlign: 'center',
        fontWeight: '600',
        color: "#fff"
    },
    result:{
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    resultBmi:{
        fontSize: 50,
        textAlign: 'center',
        marginTop: '2%',
        color: '#4e32bc',
        fontWeight: 'bold',
    },
    resultContainerLight:{
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 40
    },
    resultContainerDark:{
        backgroundColor: '#9EA2E5',
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    resultSurface:{
        marginTop: 16, 
        width: '100%',
    },
    bmiInfo:{
        textAlign: 'center',
        marginTop: 16,
        fontSize: 16,
    }
})

export default styles;