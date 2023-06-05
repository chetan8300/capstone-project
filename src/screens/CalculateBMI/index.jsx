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

  const calculateBMI = () => {
      if (height && weight) {
        const heightInMeters = height / 100;
        const bmiValue = weight / (heightInMeters * heightInMeters);
        setBMI(bmiValue.toFixed(2));
      }
    };
  
    const bmiResultRender = () => {
      let bmiResult = ""
      if(bmi < 18.5) {
        bmiResult = 'Underweight'
        console.log(bmiResult)
  
      }
      if(bmi >= 18.5 && bmi <= 24.9) {
        bmiResult = 'Normal'
        console.log(bmiResult)
      }
      if(bmi >= 25 && bmi <= 29.9) {
        bmiResult = 'Overweight'
        console.log(bmiResult)
      }
      if(bmi >= 30) {
        bmiResult = 'Obese'
        console.log(bmiResult)
      }
  
      return bmiResult
    }
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
      <Button mode="contained" style={styles.button} onPress={calculateBMI}>
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