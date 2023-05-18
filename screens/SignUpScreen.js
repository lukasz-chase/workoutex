import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import firebase from "../firebaseSDK.js";

const SignUpScreen = ({ route, navigation }) => {
  const { signIn, signUp } = route.params;
  const auth = getAuth(firebase);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        setError("");
        navigation.navigate("SignUp", {
          signIn: true,
          signUp: false,
        });
      })
      .catch((error) => setError(error.message));
  };
  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        setError("");
        navigation.navigate("Workouts");
      })
      .catch((error) => setError(error.message));
  };
  return (
    <View className="h-full w-full items-center justify-center">
      <TextInput
        className="h-10 w-60 border-2 mb-2 p-2"
        onChangeText={setEmail}
        value={email}
        placeholder="email"
      />
      <TextInput
        className="h-10 w-60 border-2 p-2"
        onChangeText={setPassword}
        value={password}
        placeholder="password"
        secureTextEntry
      />
      <TouchableOpacity
        onPress={signIn ? handleSignIn : handleSignUp}
        className="bg-gray-600 w-60 items-center justify-center h-10 mt-2"
      >
        <Text className="text-slate-50">{signIn ? "Sign In" : "Sign Up"}</Text>
      </TouchableOpacity>
      <Text className="text-red-500">{error}</Text>
      <View className="flex-row gap-1 mt-2">
        <Text>{signIn ? "Dont have an account?" : "Already signed up?"}</Text>
        <TouchableOpacity
          onPress={() => {
            setError("");
            navigation.navigate("SignUp", {
              signIn: !signIn,
              signUp: !signUp,
            });
          }}
        >
          <Text>{signIn ? "Sign Up" : "Sign In"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpScreen;
