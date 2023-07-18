import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#fff',
        padding: 10,
        width: '100%',
        // marginBottom: 20
    },
    header: {
        paddingTop: 20,
        paddingBottom: 20,
        alignItems: "center",
        marginLeft: 50,
    },
    headerMain: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        color: "#4e32bc",
        fontWeight: "900",
        letterSpacing: 0.3,
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
        backgroundColor: '#ffffff',
        borderRadius: 15,
        padding: 20,
        maxHeight: 200,
    },
    historyContainer: {
        marginTop: 16,
        backgroundColor: '#ffffff',
        borderRadius: 15,
        padding: 20,
        flex: 1,
        // maxHeight: 400,
    }
});
export default styles;