import { Platform, SafeAreaView as SafeAreaViewIos, StyleSheet } from "react-native";
import { SafeAreaView as SafeAreaViewAndroid } from "react-native-safe-area-context";

const SafeAreaView = Platform.OS === "ios" ? SafeAreaViewIos : SafeAreaViewAndroid;

const hoc = Comp => props => {
  return (
    <SafeAreaView style={styles.appContainer}>
      <Comp {...props} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});

export default hoc