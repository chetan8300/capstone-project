import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const styles = StyleSheet.create({
    appBar:{
        width: '100%',
        height: 70,
        padding: 20,
        backgroundColor: '#4e32bc',
    },
      title: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#fff',
      },
      label: {
        marginTop: 16,
        fontSize: 18,
        marginBottom: 8,
      },
      intakeText: {
        fontSize: 48,
        fontWeight: 'bold',
        marginBottom: 16,
      },
      buttonsContainer: {
        flexDirection: 'row',
        marginBottom: 16,
      },
      button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        paddingVertical: 12,
      },
      buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
      },
      addButton: {
        // backgroundColor: '#2196f3',
        // borderRadius: 8,
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
      },
      addButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
      },
      historyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
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
    });

    export default styles;