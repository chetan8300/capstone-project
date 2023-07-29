import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        width: '100%',
        // marginBottom: 20
    },
    containerLightMode:{
      backgroundColor: '#fff',
    },
    containerDarkMode:{
      backgroundColor: '#555',
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
      fontWeight: "900",
      paddingRight: 20,
      textAlign: "center"
    },
    nameLight: {
      color: "#4e32bc",
    },
    nameDark: {
      color: "#F0DBFF",
    },
      labelContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: 16,
        marginBottom: 8,
      },
      label: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        marginRight: 4
      },
      labelLight: {
        fontSize: 14,
        // color: '#666',
      },
      labelLightMode: {
        fontSize: 14,
        color: '#FAF3F0',
      },
      labelDarkMode: {
        fontSize: 14,
        color: '#666',
      },
      intakeText: {
        fontSize: 52,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingLeft: 20,
        paddingRight: 20,
      },
      buttonsContainer: {
        alignItems: "center",
        marginBottom: 16,
      },
      button: {
        width: 40,
        height: 40,
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
      tableHeaderLight: {
        backgroundColor: '#e0e0e0',
      },
      tableHeaderDark: {
        backgroundColor: '#9EA2E5',
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
        borderRadius: 15,
        padding: 20,
      },
      intakeContainerLight:{
        backgroundColor: '#ffffff',
        borderRadius: 15,
        padding: 20,
      },
      intakeContainerDark:{
        backgroundColor: '#9EA2E5',
        borderRadius: 15,
        padding: 20,
      },
      historyContainer:{
        marginTop: 16,
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
      },
      historyContainerLight:{
        backgroundColor: '#ffffff',
      },
      historyContainerDark:{
        backgroundColor: '#9EA2E5',
      },
    });

    export default styles;