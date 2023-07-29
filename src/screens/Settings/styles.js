import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const styles = StyleSheet.create({
  lightBackground: {
    backgroundColor: "#fff"
  },
  darkBackground: {
    backgroundColor: "#231F20"
  },
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
      // color: "#4e32bc",
      fontWeight: "900",
      paddingRight: 20,
      textAlign: "center"
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10,
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        padding: 20,
        borderRadius: 10,
        width: '80%',
        height: '60%', 
      },
      modalContentLight: {
        backgroundColor: '#fff',
      },
      modalContentDark: {
        backgroundColor: '#9EA2E5',
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
      },
      placeholderTextLight: {
        color: '#999',
      },
      placeholderTextDark: {
        color: '#0066cc',
      },
      themeContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      },
      themeSwitch: {
        // position:"relative",
        // right: -110
        justifyContent: "flex-end",
        marginRight: 25,
      },
});

export default styles;