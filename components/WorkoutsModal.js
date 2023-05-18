import React, { useState } from "react";
import {
  Modal,
  FlatList,
  Text,
  Pressable,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import ExercisesModal from "./ExercisesModal";
import { setDoc, doc, getFirestore } from "firebase/firestore";
import app from "../firebaseSDK";
import { getAuth } from "firebase/auth";
import * as Crypto from "expo-crypto";

const WorkoutsModal = ({ visible, setVisible }) => {
  const [modal, setModal] = useState(false);
  const [error, setError] = useState("");
  const [workout, setWorkout] = useState({
    name: "",
    exercises: [],
  });
  const db = getFirestore(app);
  const auth = getAuth();
  const user = auth.currentUser;
  const clearWorkout = () =>
    setWorkout({
      name: "",
      exercises: [],
    });
  const closeModal = () => {
    setVisible(!visible);
    setError("");
  };
  const handleSaveWorkout = async () => {
    try {
      if (!workout.name) {
        return setError("workout needs a name");
      }
      if (workout.exercises.length === 0) {
        return setError("workout needs at least 1 exercise");
      }

      const UUID = Crypto.randomUUID();
      await setDoc(
        doc(db, "workouts", user.uid, "user-workout", UUID),
        workout
      );
      clearWorkout();
      setError("");
      closeModal();
    } catch (error) {
      console.error("Error adding document: ", error);
      clearWorkout();
      closeModal();
    }
  };
  const removeExercise = (name) => {
    const exercisesFiltered = workout.exercises.filter((w) => w.name !== name);
    setWorkout({ ...workout, exercises: exercisesFiltered });
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}
    >
      <View className="bg-slate-100 h-screen w-screen p-4">
        <View>
          <Text className="text-bold text-center py-4 text-xl uppercase">
            Workout Creation
          </Text>
          <TextInput
            value={workout.name}
            className="bg-slate-100 border-2 border-black p-2"
            placeholder="workout name"
            onChangeText={(text) => setWorkout({ ...workout, name: text })}
          />
          <Text className="pt-2">Exercises</Text>
          <FlatList
            className="w-full py-2 px-4"
            contentContainerStyle={{
              justifyContent: "center",
            }}
            data={workout.exercises}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <View className="flex flex-row justify-between items-center border-l-2 px-2 border-black">
                <Text className="text-lg">{item.name}</Text>
                <TouchableOpacity onPress={() => removeExercise(item.name)}>
                  <Text className="text-red-300 p-4">X</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <Pressable
            className="mx-auto border-2 border-black p-4 rounded-md"
            onPress={() => setModal(true)}
          >
            <Text>Add exercise</Text>
          </Pressable>
          <Text className="text-bold text-red-500 uppercase text-center pt-4">
            {error}
          </Text>
          <View className="flex flex-row justify-evenly items-center pt-2">
            <Pressable
              className="bg-red-300 p-4 rounded-md"
              onPress={closeModal}
            >
              <Text>Cancel</Text>
            </Pressable>
            <Pressable
              className="bg-blue-300 p-4 rounded-md"
              onPress={handleSaveWorkout}
            >
              <Text>Save Workout</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <ExercisesModal
        setVisible={setModal}
        visible={modal}
        setWorkout={setWorkout}
        workout={workout}
      />
    </Modal>
  );
};
export default WorkoutsModal;
