import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const styles = StyleSheet.create({
    container: {
        padding: 10,
        width: '100%',
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
    label: {
        marginTop: 16,
        fontSize: 18,
        marginBottom: 8,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    input: {
        height: 20,
        padding: 8,
    },
    intakeText: {
        fontSize: 48,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    buttonsContainer: {
        alignItems: "center",
        marginTop: 25,

    },
    button: {
        width: "50%"
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    historyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    historyEntry: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    entryDate: {
        flex: 1,
    },
    entryIntake: {
        fontWeight: 'bold',
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#e0e0e0',
    },
    tableHeaderText: {
        fontWeight: 'bold',
        fontSize: 16,
        flex: 1,
        textAlign: 'center',
    },
    tableBody: {
        flexGrow: 1,
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#ccc',
    },
    tableCell: {
        flex: 1,
        textAlign: 'center',
    },
    intakeContainer: {
        borderRadius: 15,
        padding: 20,
        maxHeight: 200,
    },
    intakeContainerLight: {
        backgroundColor: '#ffffff',
    },
    intakeContainerDark: {
        backgroundColor: '#9EA2E5',
    },
    historyContainer: {
        marginTop: 16,
        borderRadius: 15,
        padding: 20,
        flex: 1,
    },
    historyContainerLight: {
        backgroundColor: '#ffffff',
    },
    historyContainerDark: {
        backgroundColor: '#9EA2E5',
    }
});
export default styles;