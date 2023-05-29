import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Magnetometer } from "expo-sensors";
import Nav from "../components/Nav";
import { Feather } from "@expo/vector-icons";

const CompassScreen = () => {
  const [orientation, setOrientation] = useState(0);

  useEffect(() => {
    let subscription;
    const startMagnetometer = async () => {
      try {
        await Magnetometer.isAvailableAsync();
        subscription = Magnetometer.addListener(({ x, y }) => {
          const azimuth = Math.atan2(y, x) * (180 / Math.PI);
          setOrientation(azimuth >= 0 ? azimuth : azimuth + 360);
        });
        Magnetometer.setUpdateInterval(100); // Set the desired update interval (in milliseconds)
      } catch (error) {
        console.log("The magnetometer sensor is not available on this device.");
      }
    };
    startMagnetometer();

    return () => {
      if (subscription) subscription.remove();
    };
  }, []);
  const directions = [
    "Północ",
    "Północno-Wschodni",
    "Wschód",
    "Południowo-Wschodni ",
    "Południe",
    "Południowo-Zachodni",
    "Zachód",
    "Północno-Zachodni",
  ];
  const getDirection = () => {
    const index = Math.round(orientation / 45) % 8;
    return directions[index];
  };

  const getRotationStyle = () => {
    const rotation = 360 - orientation;
    return `transform-[${rotation}deg]`;
  };
  return (
    <View className="flex-1 items-center justify-center">
      <View className="items-center justify-center w-64 h-64 rounded-full border border-gray-300 relative">
        <Text className="text-2xl mb-2">Północ</Text>
        <View className="flex-row gap-4">
          <Text className="text-2xl">Zachód</Text>
          <View style={`absolute top-1/2 items-center ${getRotationStyle()}`}>
            <Feather name="arrow-up" size={30} color="black" />
          </View>
          <Text className="text-2xl">Wschód</Text>
        </View>
        <Text className="text-2xl mt-2">Południe</Text>
      </View>
      <Text className="mt-4 text-2xl font-bold">{getDirection()}</Text>
      <Nav />
    </View>
  );
};

export default CompassScreen;
