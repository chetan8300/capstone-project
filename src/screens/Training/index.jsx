import { useNavigation } from "@react-navigation/native";
import React, { useState } from 'react';
import { TouchableOpacity, View, ScrollView } from "react-native";
import { Text, Card, useTheme, Searchbar } from "react-native-paper";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles'

// Common Components
import hoc from "../../components/HOC";

// Utils
import { workoutByType, beginner, exercises } from "../../utils/workouts";

const TrainingScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme()

  //Search bar accessories
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => setSearchQuery(query);

  return (
    <View style={{ flex: 1, paddingLeft: 16, paddingRight: 16, width: "100%" }}>
      <View style={styles.header}>
      <Text variant="displaySmall" style={styles.name}>Fitter</Text>
      </View>

      <Searchbar placeholder="Search" onChangeText={onChangeSearch} value={searchQuery} style={styles.searchBar} />

      <ScrollView>
        {Object.keys(workoutByType).map((key) => {
          const workouts = workoutByType[key];
          const filteredWorkouts = workouts.filter((workout) =>
            workout.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
          return (
            <View key={key} style={{ marginBottom: 16 }}>
              <Text variant="headlineMedium" style={{ paddingBottom: 16, textTransform: 'capitalize' }}>{key}</Text>
              <View style={{ gap: 16 }}>
              {(searchQuery ? filteredWorkouts : workouts).map((workout) =>{
                  return (
                    <TouchableOpacity
                      key={`${key}-${workout.id}`}
                      onPress={() => {
                        // navigation.navigate("SecondScreen", {
                        //   workoutType: key,
                        //   workout: workout.id,
                        // });
                      }}
                    >
                      <Card style={{ position: "relative" }}>
                        <Card.Cover
                          source={workout.icon}
                        ></Card.Cover>
                        <Card.Title
                          title={workout.name}
                          subtitle={workout.subtitle}
                          titleStyle={{
                            color: "#fff",
                            fontSize: 24,
                            fontWeight: "bold",
                          }}
                          subtitleStyle={{
                            color: "#fff",
                            fontSize: 16,
                            fontWeight: "bold",
                          }}
                          style={{ position: "absolute", top: 10 }}
                        />
                        {key === "7x4" ? (
                          <View style={{ position: 'absolute', bottom: 16, paddingLeft: 16, paddingRight: 16, width: '100%' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                              <Text style={{ color: '#fff' }}>
                                27 Days Left
                              </Text>
                              <Text style={{ color: '#fff' }}>
                                4%
                              </Text>
                            </View>
                            <View style={{ position: 'relative', width: '100%', backgroundColor: '#9BABB8', height: 10, borderRadius: 8 }}>
                              <View style={{ position: 'absolute', width: `${(2 / 28) * 100}%`, height: 10, backgroundColor: colors.primary, borderRadius: 8 }} />
                            </View>
                          </View>
                        ) : (
                          <View style={{ position: 'absolute', bottom: 16, paddingLeft: 16, paddingRight: 16, width: '100%', flexDirection: 'row', gap: 2 }}>
                            {[...Array(3)].map((icon, index) => {
                              return (
                                index + 1 <= workout.difficultyLevel ?
                                  <MaterialCommunityIcons key={`bolt-${workout.id}-${index}`} name="lightning-bolt" size={24} color={colors.primary} />
                                  :
                                  <MaterialCommunityIcons key={`bolt-${workout.id}-${index}`} name="lightning-bolt-outline" size={24} color="#9BABB8" />
                              )
                            })}
                          </View>
                        )}
                      </Card>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>

    //   <View style={{ flex: 1 }}>
    //   {Object.keys(exercises).map((key) => {
    //     const exercise = exercises[key]
    //     return (
    //       <View key={key}>
    //         {/* <Text>{key} {exercises.length}</Text> */}
    //         <Text>{exercise.focusArea.map(x => x)}</Text>
    //         {/* <Text>{exercises.map()}</Text> */}
    //         {/* {exercises.map(exercise => {
    //           return (
    //             <Text key={`${key}-${exercise.id}`}>{exercise}</Text>
    //           )
    //         })} */}
    //       </View>
    //     );
    //   })}
    // </View>
  );
};

export default hoc(TrainingScreen);
