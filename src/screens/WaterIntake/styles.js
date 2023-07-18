import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 5,
        width: '100%',
        // marginBottom: 20
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
      intakeText: {
        fontSize: 48,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
      },
      buttonsContainer: {
        alignItems: "center",
        marginBottom: 16,
      },
      button: {
        width: "50%"
      },
      buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
      },
      addButton: {
        marginBottom: 16,
        width: "50%",
        marginTop: 16,
      },
      addButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
      },
      disabledButton: {
        // opacity: 0.5,
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
      intakeContainer:{
        backgroundColor: '#ffffff',
        borderRadius: 15,
        padding: 20,
      },
      historyContainer:{
        marginTop: 16,
        backgroundColor: '#ffffff',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
      }
    });

    export default styles;