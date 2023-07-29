import { useContext } from "react";
import { Platform, SafeAreaView as SafeAreaViewIos, StyleSheet } from "react-native";
import { SafeAreaView as SafeAreaViewAndroid } from "react-native-safe-area-context";
import DarkModeContext from "../../utils/DarkModeContext";

const SafeAreaView = Platform.OS === "ios" ? SafeAreaViewIos : SafeAreaViewAndroid;

const hoc = Comp => props => {
  const { isDarkMode } = useContext(DarkModeContext);

  console.log("HOC isDarkMode", isDarkMode)

  return (
    <SafeAreaView style={!isDarkMode ? styles.appContainer : styles.appContainerDark}>
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