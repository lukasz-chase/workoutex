import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import Nav from "../components/Nav";
import { useNavigation } from "@react-navigation/native";

const WorkoutScreen = ({ route }) => {
  const { workout } = route.params;
  const navigation = useNavigation();
  return (
    <View className="h-full w-full">
      <View className="my-10 mx-4">
        <Text className="text-3xl font-bold text-center">{workout.name}</Text>
        <FlatList
          className="w-full py-2 px-4"
          contentContainerStyle={{
            justifyContent: "center",
          }}
          data={workout.exercises}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Exercise", {
                  item: item,
                })
              }
              className="py-2"
            >
              <Text className="text-lg">
                {item.name} ({item.equipment})
              </Text>
              <Text className="text-sm">{item.muscle}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <Nav />
    </View>
  );
};

export default WorkoutScreen;
