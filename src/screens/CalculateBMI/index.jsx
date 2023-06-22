import * as React from 'react'

import { View, SafeAreaView } from 'react-native'
import { TextInput, Button, Surface, Text, useTheme, Appbar } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';

// Common Components
import hoc from '../../components/HOC'

import styles from './styles'

const CalculateBMIScreen = () => {

  const [height, setHeight] = React.useState('');
  const [weight, setWeight] = React.useState('');
  const [bmi, setBMI] = React.useState(null);
  var bmiResult = ""

  // const [workoutPreference, setWorkoutPreference] = React.useState({});
  // console.log('workoutPreference, ', workoutPreference)

  // React.useEffect(() => {
  //   (async () => {
  //     try {
  //       const data = await AsyncStorage.getItem('workoutPreference');
  //       setWorkoutPreference(data ? JSON.parse(data) : {})
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   })()
  // }, [])


  const calculateBMI = () => {
    if (height && weight) {
      const heightInMeters = height / 100;
      const bmiValue = weight / (heightInMeters * heightInMeters);
      setBMI(bmiValue.toFixed(2));
    }
  };

  const bmiResultRender = () => {
    let bmiResult = ""
    if (bmi < 18.5) {
      bmiResult = 'Underweight'

    }
    if (bmi >= 18.5 && bmi <= 24.9) {
      bmiResult = 'Normal'

    }
    if (bmi >= 25 && bmi <= 29.9) {
      bmiResult = 'Overweight'

    }
    if (bmi >= 30) {
      bmiResult = 'Obese'

    }

    return bmiResult
  }

  const renderLine = (color, style, bmiOriginalDiff, deduct = 0) => {
    const bmiActualDiff = bmi - deduct
    const percentage = bmiActualDiff / bmiOriginalDiff * 100

    let show = false
    if (bmiActualDiff < bmiOriginalDiff && (bmiActualDiff / bmiOriginalDiff < 1) && (bmiActualDiff / bmiOriginalDiff > 0)) {
      show = true
    }

    return (
      <View style={{ flex: 1, height: 10, backgroundColor: color, position: 'relative', ...style }}>
        {show && (
          <View style={{ position: 'absolute', left: `${percentage}%`, top: -1, marginLeft: -6, width: 12, height: 12, borderRadius: '50%', borderColor: '#fff', borderWidth: 2, backgroundColor: 'black' }} />
        )}
      </View>
    )
  }

  return (
    <>
    <Surface style={styles.appBar}>
    <Text style={styles.title}>
          Calculate BMI
        </Text>
    </Surface>
      <View style={{ flex: 1, width: '100%', paddingLeft: 20, paddingRight: 20 }}>
        {/* <Text style={styles.subTitle}>
        Previously recorded BMI: 0
      </Text> */}
        <View style={styles.inputContainer}>
          <Text variant="bodyLarge" style={{ fontWeight: 'bold', marginBottom: 5 }}>
            Height
          </Text>
          <TextInput style={styles.textInput}
            mode='outlined'
            value={height}
            onChangeText={setHeight}
            keyboardType="numeric"
            placeholder='180 cm'
          />

          <Text variant="bodyLarge" style={{ fontWeight: 'bold', marginBottom: 5 }}>
            Weight
          </Text>
          <TextInput style={styles.textInput}
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
            mode="outlined"
            placeholder='70 kg'
          />
          <Button mode="contained" style={styles.button} onPress={calculateBMI}>
            Calculate
          </Button>
          {bmi && (
            <Surface style={styles.resultSurface}>
              <View style={styles.resultContainer}>
                <Text style={styles.result}>
                  Your BMI is <Text style={{ color: "#4e32bc", fontWeight: "bold", fontSize: 18 }}>{bmiResultRender()}</Text>
                </Text>
                <Text style={styles.resultBmi}>
                  {bmi}
                </Text>
                <Text style={styles.bmiInfo}>
                  Body Mass Index (BMI) is a person's weight in kilograms divided by the square of height in meters.
                </Text>
                <View style={{ marginTop: 40, marginBottom: 20 }}>
                  <View style={{ flexDirection: 'row', gap: 2 }}>
                    {renderLine('lightgrey', { borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }, 18.5)}
                    {renderLine('green', {}, 6.3, 18.6)}
                    {renderLine('yellow', {}, 4.9, 24.9)}
                    {renderLine('red', { borderTopRightRadius: 4, borderBottomRightRadius: 4 }, 100, 30)}
                  </View>
                </View>
              </View>
            </Surface>
          )}
        </View>
      </View>  
      </>
  )
}


export default hoc(CalculateBMIScreen)