import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 5,
        width: '100%',
    },
    header: {
        paddingTop: 20,
        paddingBottom: 20,
        alignItems: "center",
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
    card: {
        margin: 8,
        padding: 16   
      },
      cardTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      cardTitle: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
      },
      backContainer:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }
});

export default styles;