import {
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { useRouter } from "expo-router";

import SignUpForm from "@/components/SignUpForm";
import Colors from "@/constants/Colors";

import { defaultStyles } from "@/constants/Styles";

const SignUpPage = () => {
  const router = useRouter();

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={defaultStyles.pageContainer}
    >
      <ScrollView
        style={defaultStyles.pageContainer}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
      >
        <SignUpForm />

        <TouchableOpacity
          style={styles.haveAccount}
          activeOpacity={0.7}
          onPress={() => router.replace("login")}
        >
          <Text style={defaultStyles.textExtraLight}>
            {"Sudah punya akun? "}
          </Text>
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  haveAccount: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 8,
  },
  loginText: {
    ...defaultStyles.textHeading1,
    color: Colors.main,
    fontSize: 12,
    marginBottom: 50,
  },
});

export default SignUpPage;
