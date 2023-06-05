import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
      
    },
    subTitle: {
        fontSize: 20,
        marginTop: 25,
        fontWeight: 'bold',
    },
    inputContainer: {
        marginTop: '15%',
        flex: 1,
        alignItems: 'center',
        },
    textInput: {
        height: 40,
        width: 160,
        borderRadius: 5,
        marginBottom: 10,
        paddingLeft: 10,
    },
    button: {
        marginTop: 20,
        width: 160,
    },
    result:{
        fontSize: 18,
        marginTop: 20,
    }
})

export default styles;