import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Magnetometer } from "expo-sensors";
import { Feather } from "@expo/vector-icons";
import Nav from "../components/Nav";
const CompassScreen = () => {
  const [degree, setDegree] = useState(0);

  useEffect(() => {
    let magnetometerSubscription;

    const startSensors = async () => {
      try {
        await Promise.all([Magnetometer.isAvailableAsync()]);

        magnetometerSubscription = Magnetometer.addListener((data) => {
          const { x, y } = data;

          let newDegree = Math.atan2(y, x) * (180 / Math.PI) - 98;
          if (newDegree < 0) {
            newDegree += 360;
          }

          setDegree(newDegree);
        });

        Magnetometer.setUpdateInterval(100);
      } catch (error) {
        console.log("The magnetometer sensor is not available on this device.");
      }
    };

    startSensors();

    return () => {
      if (magnetometerSubscription) magnetometerSubscription.remove();
    };
  }, []);

  const getDirection = () => {
    const directions = [
      "Północ",
      "Północno-Wschodni",
      "Wschód",
      "Południowo-Wschodni",
      "Południe",
      "Południowo-Zachodni",
      "Zachód",
      "Północno-Zachodni",
    ];

    const index = Math.round(degree / 45) % 8;
    return directions[index];
  };

  const getRotationStyle = () => {
    const rotation = 360 - degree;
    return `rotate(${rotation.toFixed()}deg)`;
  };

  return (
    <View className="flex-1 items-center justify-center">
      <View className="items-center justify-center w-64 h-64 rounded-full border border-gray-300 relative">
        <View style={{ transform: getRotationStyle() }}>
          <Feather name="arrow-up" size={30} color="black" />
        </View>
      </View>
      <Text className="mt-4 text-2xl font-bold">{getDirection()}</Text>
      <Nav />
    </View>
  );
};

export default CompassScreen;
