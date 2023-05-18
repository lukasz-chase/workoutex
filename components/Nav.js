import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Nav = () => {
  const navigation = useNavigation();
  return (
    <View className="absolute bottom-0 h-20 bg-black w-full justify-evenly flex-row">
      <TouchableOpacity
        onPress={() => navigation.navigate("Profile")}
        className="py-2 bg-"
      >
        <Text className="color-gray-300">Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Exercises")}
        className="py-2"
      >
        <Text className="color-gray-300">Exercises</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Workouts")}
        className="py-2"
      >
        <Text className="color-gray-300">Workouts</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Nav;
