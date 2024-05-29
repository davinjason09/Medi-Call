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
import InputField from "@/components/InputField";
import { useRouter } from "expo-router";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  return (
    <View style={defaultStyles.pageContainer}>
      <Text
        style={[defaultStyles.textSubHeading, styles.text, { marginTop: 160 }]}
      >
        Email atau Nomor Telepon
      </Text>
      <InputField type="email" value={email} onChangeText={setEmail} />
      <Text style={[defaultStyles.textSubHeading, styles.text]}>Password</Text>
      <InputField type="password" value={password} onChangeText={setPassword} />

      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => router.replace("forgetpass")}
      >
        <Text style={[defaultStyles.textHeading2, styles.forgotPassword]}>
          Lupa Password?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[defaultStyles.button, styles.login]}
        activeOpacity={0.5}
        onPress={() => router.navigate("home")}
      >
        <Text style={[defaultStyles.textSubHeading, styles.loginText]}>
          Log In
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.noAccount}
        activeOpacity={0.5}
        onPress={() => router.replace("signup")}
      >
        <Text style={defaultStyles.textExtraLight}>{"Belum punya akun? "}</Text>
        <Text style={styles.signUpText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    fontSize: 12,
    color: Colors.main,
    textAlign: "right",
    marginRight: "7.5%",
    marginTop: 10,
  },
  text: {
    marginLeft: "7.5%",
    marginVertical: 12,
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
  noAccount: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 8,
  },
  signUpText: {
    ...defaultStyles.textHeading1,
    color: Colors.main,
    fontSize: 12,
  },
});

export default LoginPage;
