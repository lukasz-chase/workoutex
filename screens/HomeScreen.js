import { SafeAreaView, Text } from "react-native";
import Button from "../components/Button";
import { getAuth } from "firebase/auth";
import ExercisesScreen from "./ExercisesScreen";
import Lottie from "lottie-react-native";
import animationData from "../assets/workoutAnimation.json";
const HomeScreen = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) return <ExercisesScreen />;
  return (
    <SafeAreaView className="h-full w-full items-center justify-center">
      <Lottie source={animationData} autoPlay loop />
      <Text className="text-lg font-bold">Welcome to Workoutex</Text>
      <Button
        text="Sign In"
        bgColor="bg-gray-800"
        link="SignUp"
        signIn={true}
        signUp={false}
      />
      <Button
        text="Sign Up"
        bgColor="bg-gray-600"
        link="SignUp"
        signIn={true}
        signUp={false}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
