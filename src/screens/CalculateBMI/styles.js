import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const styles = StyleSheet.create({
    appBar:{
        width: '100%',
        height: 70,
        padding: 20,
        backgroundColor: '#4e32bc',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#fff',
    },
    subTitle: {
        fontSize: 20,
        marginTop: 25,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    inputContainer: {
        marginTop: 25,
        flex: 1,
        alignItems: 'center',
    },
    textInput: {
        height: 40,
        width: 160,
        borderRadius: 5,
        marginBottom: 10,
        textAlign: 'center',
    },
    button: {
        marginTop: 20,
        width: 160,
    },
    result:{
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    resultBmi:{
        fontSize: 50,
        textAlign: 'center',
        marginTop: '2%',
        color: '#4e32bc',
        fontWeight: 'bold',
    },
    resultContainer:{
        backgroundColor: '#fff',
        padding: 20
    },
    resultSurface:{
        marginTop: 16, 
        width: '100%',
    },
    bmiInfo:{
        textAlign: 'center',
        marginTop: 16,
        fontSize: 16,
    }
})

export default styles;