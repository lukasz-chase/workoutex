import { TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Button = ({ text, bgColor, link, signUp, signIn }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(link, {
          signUp,
          signIn,
        })
      }
      className={`${bgColor} w-40 items-center justify-center h-10 mt-2`}
    >
      <Text className="text-slate-50">{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
