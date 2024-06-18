import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardType,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";

import Colors from "@/constants/Colors";

import { defaultStyles } from "@/constants/Styles";

interface InputFieldProps {
  autocapitalize?: "none" | "sentences" | "words" | "characters";
  type: "email" | "password" | "text" | "phone" | "number";
  value?: string;
  editable?: boolean;
  calendar?: boolean;
  onPress?: () => void;
  removeError?: () => void;
  onChangeText?: (text: string) => void;
}

const InputField = (props: InputFieldProps) => {
  const isPassword = props.type === "password";
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const keyboard = {
    email: "email-address",
    number: "numeric",
    text: "default",
    password: "default",
    phone: "phone-pad",
  };

  return (
    <View style={{ height: 45 }}>
      <TouchableOpacity activeOpacity={1} onPress={props.onPress}>
        <TextInput
          autoCapitalize={props.autocapitalize || "none"}
          value={props.value}
          editable={props.editable}
          selectionColor={Colors.main}
          style={[defaultStyles.textExtraLight, styles.inputField]}
          keyboardType={keyboard[props.type] as KeyboardType}
          secureTextEntry={isPassword && !showPassword}
          onChangeText={props.onChangeText}
          onFocus={props.removeError}
          onChange={props.removeError}
        />
      </TouchableOpacity>

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

      {props.calendar && (
        <TouchableOpacity style={styles.calendar} activeOpacity={1}>
          <MaterialCommunityIcons
            name="calendar-month-outline"
            size={20}
            color={Colors.black}
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
    color: Colors.black,
  },
  showPassword: {
    height: 45,
    width: 45,
    justifyContent: "center",
    position: "absolute",
    right: "11%",
  },
  calendar: {
    height: 45,
    width: 45,
    justifyContent: "center",
    position: "absolute",
    right: "5%",
  },
});

export default InputField;
