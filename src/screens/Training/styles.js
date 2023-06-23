import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const styles = StyleSheet.create({
    header: {
        paddingTop: 20,
        paddingBottom: 20,
        // backgroundColor: "rgb(240, 219, 255)",
        alignItems: "center",
        // fontFamily: 'Anton', sans-serif;
        marginLeft: 100,
        },
    headerMain:{
        flexDirection: 'row',
        // justifyContent: 'space-around',
        alignItems: 'center',
        // marginLeft: 16,
        // marginRight: 55,
    },
    name: {
        color: "#4e32bc",
        fontWeight: "900",
        letterSpacing: 0.3,
    },
    searchBar: {
        marginBottom: 20
    }
})

export default styles;