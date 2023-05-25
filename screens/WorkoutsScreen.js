import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import Nav from "../components/Nav";
import { useNavigation } from "@react-navigation/native";
import WorkoutsModal from "../components/WorkoutsModal";
import app from "../firebaseSDK";
import { getAuth } from "firebase/auth";

const WorkoutsScreen = () => {
  const navigation = useNavigation();
  const [workouts, setWorkouts] = useState([]);
  const [modal, setModal] = useState(false);
  const db = getFirestore(app);
  const auth = getAuth();
  const user = auth.currentUser;
  const getWorkouts = async () => {
    const querySnapshot = await getDocs(
      collection(db, "workouts", user.uid, "user-workout")
    );
    const newWorkouts = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setWorkouts(newWorkouts);
  };
  const removeWorkout = async (id) => {
    await deleteDoc(doc(db, "workouts", user.uid, "user-workout", id));
    const filteredWorkouts = workouts.filter((w) => w.id !== id);
    setWorkouts(filteredWorkouts);
  };
  // console.log(user.uid);
  useEffect(() => {
    getWorkouts();

    return () => {
      setWorkouts([]);
    };
  }, [modal]);

  return (
    <View className="h-full w-full my-10">
      <Text className="text-3xl font-bold mx-4">Treningi</Text>
      <TouchableOpacity
        className="bg-gray-600 p-2 m-2 rounded-md"
        onPress={() => setModal(true)}
      >
        <Text className="text-slate-100 text-center">
          Stwórz nowy trening +{" "}
        </Text>
      </TouchableOpacity>
      <Text className="px-4 text-bold uppercase text-blue-500">
        Twoje treningi
      </Text>
      <FlatList
        className="w-full h-3/4 py-2 px-4"
        contentContainerStyle={{
          justifyContent: "center",
          flexGrow: 0,
        }}
        data={workouts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="flex flex-row justify-between items-center">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Workout", {
                  workout: item,
                })
              }
            >
              <Text className="text-lg">{item.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => removeWorkout(item.id)}>
              <Text className="text-red-300 p-4">X</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Nav />
      <WorkoutsModal setVisible={setModal} visible={modal} />
    </View>
  );
};

export default WorkoutsScreen;
