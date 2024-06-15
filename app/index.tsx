import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";

import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";

const StartScreen = () => {
  const logo = require("../assets/images/Medi_Call_Logo.png");
  const router = useRouter();

  return (
    <View style={defaultStyles.pageContainer}>
      <Image source={logo} style={styles.logo} />
      <Text style={[defaultStyles.textSubHeading, styles.title]}>
        Solusi Sehat di Rumah
      </Text>

      <TouchableOpacity
        style={[defaultStyles.button, styles.login]}
        activeOpacity={0.5}
        onPress={() => router.push("login")}
      >
        <Text style={[defaultStyles.textSubHeading, styles.loginText]}>
          Log In
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[defaultStyles.button, styles.signup]}
        activeOpacity={0.5}
        onPress={() => router.push("signup")}
      >
        <Text style={[defaultStyles.textSubHeading, styles.signupText]}>
          Sign Up
        </Text>
      </TouchableOpacity>
      <StatusBar style="dark" />
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    marginTop: 270,
    width: 300,
    height: 78,
    alignSelf: "center",
  },
  title: {
    fontSize: 16,
    color: Colors.main,
    marginBottom: 200,
    textAlign: "center",
  },
  login: {
    backgroundColor: Colors.main,
    alignSelf: "center",
  },
  signup: {
    backgroundColor: Colors.accent,
    alignSelf: "center",
  },
  loginText: {
    color: Colors.white,
    fontSize: 20,
  },
  signupText: {
    color: Colors.main,
    fontSize: 20,
  },
});

export default StartScreen;
