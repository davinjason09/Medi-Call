import { Image, View, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";

import Button from "@/components/Button";
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

      <Button
        title="Log In"
        onPress={() => router.push("login")}
        buttonStyle={styles.login}
        textStyle={styles.loginText}
      />
      <Button
        title="Sign Up"
        onPress={() => router.push("signup")}
        buttonStyle={styles.signup}
        textStyle={styles.signupText}
      />
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
