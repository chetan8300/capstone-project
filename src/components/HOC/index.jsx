import { useContext } from "react";
import { Platform, SafeAreaView as SafeAreaViewIos, StatusBar, StyleSheet } from "react-native";
import { SafeAreaView as SafeAreaViewAndroid } from "react-native-safe-area-context";
import DarkModeContext from "../../utils/DarkModeContext";

const SafeAreaView = Platform.OS === "ios" ? SafeAreaViewIos : SafeAreaViewAndroid;

const hoc = Comp => props => {
  const { isDarkMode } = useContext(DarkModeContext);
  const isInner = [
    "WorkoutWeeksList",
    "DayExercisesList",
    "StartWorkout",
  ].includes(props.route.name);

  return (
    <SafeAreaView style={!isDarkMode ? styles.appContainer : styles.appContainerDark}>
      {!isInner && (
        <StatusBar
          backgroundColor={!isDarkMode ? "#fff" : "#231F20"}
          barStyle={!isDarkMode ? "dark-content" : "light-content"}
        />
      )}
      <Comp {...props} isDarkMode={isDarkMode} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  appContainerDark: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#231F20',
  },
});

export default hoc