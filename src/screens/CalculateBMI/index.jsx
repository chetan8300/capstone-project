import { View, Text } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import * as React from 'react'
import styles from './styles'
import { useTheme } from 'react-native-paper';

// Common Components
import hoc from '../../components/HOC'


const CalculateBMIScreen = () => {
  const [height, setHeight] = React.useState('');
  const [weight, setWeight] = React.useState('');
  const [bmi, setBMI] = React.useState(null);
  var bmiResult = ""


  return (
   <View>
    <Text style={styles.title}>
      Calculate BMI
    </Text>
    <Text style={styles.subTitle}>
      Previously recorded BMI: 0
    </Text>
    <View style={styles.inputContainer}>
      <TextInput style={styles.textInput}
          mode='outlined'
          value={height}
          onChangeText={setHeight}
          keyboardType="numeric"
          placeholder='Height (cm)'
        />
      <TextInput style={styles.textInput}
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
          mode="outlined"
          placeholder='Weight (kg)'
      />
      <Button mode="contained" style={styles.button} >
        Calculate
      </Button>
      {bmi && (
        <View>
          <Text style={styles.result}>
          Your BMI is: {bmi}
          </Text>
          <Text style={styles.result}>
          Your result is considered: {bmiResultRender()}
          </Text>
        </View>
      )}
    </View>
   </View>
  )
}

export default hoc(CalculateBMIScreen)