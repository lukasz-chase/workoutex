import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useEffect, useState } from "react";
import { API_KEY } from "@env";
import { Picker } from "@react-native-picker/picker";

const ExercisesModal = ({ visible, setVisible, setWorkout, workout }) => {
  const [workouts, setWorkouts] = useState([]);
  const [bodyPart, setBodyPart] = useState("");
  const [equipment, setEquipment] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const getWorkouts = () => {
      const URL = `https://api.api-ninjas.com/v1/exercises?muscle=${bodyPart}&equipment=${equipment}&name=${name}`;
      fetch(URL, {
        method: "GET",
        headers: { "X-Api-Key": API_KEY },
        contentType: "application/json",
      })
        .then((res) => res.json())
        .then((data) => setWorkouts(data));
    };
    getWorkouts();
  }, [API_KEY, bodyPart, equipment, name]);

  const handleSaveExercise = (item) => {
    if (workout.exercises.find((w) => w.name === item.name)) {
      setVisible(false);
    } else {
      setWorkout((prev) => ({
        ...prev,
        exercises: [...prev.exercises, item],
      }));
      setVisible(false);
    }
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible(!visible);
      }}
    >
      <View className="bg-slate-100 w-screen h-screen m-auto">
        <Text className="text-3xl font-bold mx-4">Exercises</Text>
        <TextInput
          className="bg-gray-300 mx-4 my-2 p-1"
          value={name}
          placeholder="Search"
          onChangeText={setName}
        />
        <View className="flex-row w-full justify-evenly items-center">
          <Picker
            selectedValue={bodyPart}
            className="bg-gray-300"
            style={{
              height: 20,
              width: 170,
              backgroundColor: "rgb(209 213 219)",
              borderRadius: 10,
            }}
            onValueChange={(itemValue, itemIndex) => setBodyPart(itemValue)}
          >
            <Picker.Item label="Any Body Part" value="" />
            <Picker.Item label="biceps" value="biceps" />
            <Picker.Item label="forearms" value="forearms" />
            <Picker.Item label="lats" value="lats" />
            <Picker.Item label="quadriceps" value="quadriceps" />
            <Picker.Item label="abdominals" value="abdominals" />
            <Picker.Item label="middle_back" value="middle_back" />
            <Picker.Item label="adductors" value="adductors" />
            <Picker.Item label="calves" value="calves" />
            <Picker.Item label="forearms" value="forearms" />
            <Picker.Item label="glutes" value="glutes" />
            <Picker.Item label="hamstrings" value="hamstrings" />
            <Picker.Item label="triceps" value="triceps" />
            <Picker.Item label="chest" value="chest" />
          </Picker>
          <Picker
            selectedValue={equipment}
            style={{
              height: 20,
              width: 170,
              backgroundColor: "rgb(209 213 219)",
              borderRadius: 10,
            }}
            onValueChange={(itemValue, itemIndex) => setEquipment(itemValue)}
          >
            <Picker.Item label="Any Category" value="" />
            <Picker.Item label="machine" value="machine" />
            <Picker.Item label="dumbell" value="dumbell" />
            <Picker.Item label="other" value="other" />
          </Picker>
        </View>
        <FlatList
          className="w-full py-2 px-4"
          contentContainerStyle={{
            justifyContent: "center",
          }}
          data={workouts}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSaveExercise(item)}
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
    </Modal>
  );
};

export default ExercisesModal;
