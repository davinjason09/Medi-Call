import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardType,
} from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";

interface InputFieldProps {
  type: "email" | "password" | "text" | "phone" | "number";
  onChangeText?: (text: string) => void;
  value?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  onChangeText,
  value,
}) => {
  const isPassword = type === "password";
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const keyboard = {
    email: "email-address",
    number: "numeric",
    text: "default",
    password: "default ",
    phone: "phone-pad",
  };

  return (
    <View style={{ height: 45 }}>
      <TextInput
        style={[defaultStyles.textExtraLight, styles.inputField]}
        autoCapitalize="none"
        keyboardType={keyboard[type] as KeyboardType}
        secureTextEntry={isPassword && !showPassword}
        onChangeText={onChangeText}
        value={value}
      />

      {isPassword && (
        <TouchableOpacity
          style={styles.showPassword}
          onPress={toggleShowPassword}
        >
          <Ionicons
            name={!showPassword ? "eye-off-outline" : "eye-outline"}
            size={24}
            color={Colors.black}
            onPress={toggleShowPassword}
            style={{ transform: [{ rotateY: "180deg" }] }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputField: {
    backgroundColor: Colors.accent,
    width: "85%",
    height: 45,
    borderRadius: 13,
    alignSelf: "center",
    paddingHorizontal: 12,
  },
  showPassword: {
    height: 45,
    width: 45,
    justifyContent: "center",
    position: "absolute",
    right: "11%",
  },
});

export default InputField;
