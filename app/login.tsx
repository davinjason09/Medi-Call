import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={defaultStyles.pageContainer}>
      <Text
        style={[
          defaultStyles.textSubHeading,
          { marginLeft: "7.5%", marginBottom: 12, marginTop: 160 },
        ]}
      >
        Email atau Nomor Telepon
      </Text>
      <TextInput
        autoCapitalize="none"
        style={[
          styles.inputField,
          defaultStyles.textExtraLight,
          { marginBottom: 24 },
        ]}
        value={email}
        onChangeText={setEmail}
        placeholder="Masukkan email atau nomor telepon"
      />
      <Text
        style={[
          defaultStyles.textSubHeading,
          { marginLeft: "7.5%", marginBottom: 12 },
        ]}
      >
        Password
      </Text>
      <TextInput
        style={[
          styles.inputField,
          defaultStyles.textExtraLight,
          { marginBottom: 10 },
        ]}
        value={password}
        onChangeText={setPassword}
        placeholder="Masukkan password"
        secureTextEntry={!showPassword}
      />

      <TouchableOpacity
        style={styles.showPassword}
        onPress={toggleShowPassword}
      >
        <Ionicons
          name={showPassword ? "eye-off-outline" : "eye-outline"}
          size={22}
          color={Colors.black}
        />
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.5}>
        <Text style={[defaultStyles.textHeading2, styles.forgotPassword]}>
          Lupa Password?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[defaultStyles.button, styles.login]}
        activeOpacity={0.5}
      >
        <Text style={[defaultStyles.textSubHeading, styles.loginText]}>
          Log In
        </Text>
      </TouchableOpacity>
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
    paddingHorizontal: 15,
  },
  showPassword: {
    height: 45,
    width: 30,
    justifyContent: "center",
    position: "absolute",
    right: "10%",
    top: 296,
  },
  forgotPassword: {
    fontSize: 12,
    color: Colors.main,
    textAlign: "right",
    marginRight: "7.5%",
  },
  login: {
    backgroundColor: Colors.main,
    alignSelf: "center",
    marginTop: 25,
  },
  loginText: {
    color: Colors.white,
    fontSize: 20,
  },
});

export default LoginPage;
