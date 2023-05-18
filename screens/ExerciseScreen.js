import { View, Text } from "react-native";
import React from "react";
import Nav from "../components/Nav";

const ExerciseScreen = ({ route, navigation }) => {
  const { item } = route.params;
  return (
    <View className="h-full w-full">
      <View className="my-10 mx-4">
        <Text className="text-3xl font-bold text-center">{item.name}</Text>
        <Text className="text-xl py-2">
          <Text className="text-gray-600">Difficulty: </Text>
          {item.difficulty}
        </Text>
        <Text className="text-xl py-2">
          <Text className="text-gray-600">Type: </Text>
          {item.type}
        </Text>
        <Text className="text-xl py-2">
          <Text className="text-gray-600">Muscle: </Text>
          {item.muscle}
        </Text>
        <Text className="text-xl py-2">
          <Text className="text-gray-600">Equipment: </Text>
          {item.equipment}
        </Text>
        <Text className="text-base p-4">{item.instructions}</Text>
      </View>
      <Nav />
    </View>
  );
};

export default ExerciseScreen;
