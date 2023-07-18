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
        marginLeft: 100,
      },
      headerMain:{
        flexDirection: 'row',
        alignItems: 'center',
      },
      name: {
        color: "#4e32bc",
        fontWeight: "900",
        letterSpacing: 0.3,
    },
    settingRow: {
        flexDirection: 'row',
        // justifyContent: 'left',
        alignItems: 'center',
        marginBottom: 20,
      },
      settingsTitle: {
        fontSize: 20,
        fontWeight: '500',
        paddingLeft: 15,
      },
      settingLabel: {
        fontSize: 16,
      },
      modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        height: '60%', 
      },
      modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
      },
      modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      modalCloseButton: {
        padding: 5,
      },
      modalCloseButtonText: {
        fontSize: 16,
        color: '#0066cc',
      },
      modalText: {
        fontSize: 16,
        marginBottom: 20,
      },
      notificationSettingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 15,
      },
      optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
      },
      optionLabel: {
        fontSize: 16,
        flex: 1,
      },
      timeText: {
        fontSize: 16,
        color: '#333',
      },
      placeholderText: {
        fontSize: 16,
        color: '#999',
      },
});

export default styles;