import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Magnetometer } from "expo-sensors";

const CompassScreen = () => {
  const [orientation, setOrientation] = useState(0);

  useEffect(() => {
    let subscription;
    const startMagnetometer = async () => {
      try {
        await Magnetometer.isAvailableAsync();
        subscription = Magnetometer.addListener(({ x, y, z }) => {
          const azimuth = Math.atan2(y, x) * (180 / Math.PI);
          setOrientation(azimuth >= 0 ? azimuth : azimuth + 360);
        });
        await Magnetometer.setUpdateInterval(100); // Set the desired update interval (in milliseconds)
      } catch (error) {
        console.log("The magnetometer sensor is not available on this device.");
      }
    };
    startMagnetometer();

    return () => {
      if (subscription) subscription.remove();
    };
  }, []);

  const getDirection = () => {
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
    const index = Math.round(orientation / 45) % 8;
    return directions[index];
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{getDirection()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default CompassScreen;
