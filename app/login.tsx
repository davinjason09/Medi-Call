import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

import LoginForm from "@/components/LoginForm";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";

const LoginPage = () => {
  const router = useRouter();

  return (
    <View style={defaultStyles.pageContainer}>
      <LoginForm />

      <TouchableOpacity
        style={styles.noAccount}
        activeOpacity={0.7}
        onPress={() => router.replace("signup")}
      >
        <Text style={defaultStyles.textExtraLight}>{"Belum punya akun? "}</Text>
        <Text style={styles.signUpText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
