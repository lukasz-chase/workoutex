import { SafeAreaView, Text } from "react-native";
import Button from "../components/Button";
import { getAuth } from "firebase/auth";
import ExercisesScreen from "./ExercisesScreen";

const HomeScreen = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) return <ExercisesScreen />;
  return (
    <SafeAreaView className="h-full w-full items-center justify-center">
      <Text className="text-lg font-bold">Witaj w Workoutex</Text>
      <Button
        text="Zaloguj się"
        bgColor="bg-gray-800"
        link="SignUp"
        signIn={true}
        signUp={false}
      />
      <Button
        text="Zarejestruj się"
        bgColor="bg-gray-600"
        link="SignUp"
        signIn={true}
        signUp={false}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
