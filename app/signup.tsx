import {
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

import SignInForm from "@/components/SignInForm";
import Colors from "@/constants/Colors";
import { registerUser, sendNewOTP } from "@/api/Services";
import { RegisterRequest } from "@/constants/Interfaces";
import { defaultStyles } from "@/constants/Styles";
import { saveToken } from "@/utils/Utilites";

const SignUpPage = () => {
  const router = useRouter();

  const [data, setData] = useState<RegisterRequest>();

  useEffect(() => {
    if (data) {
      console.log(data);
      registerUser(data)
        .then((response) => {
          console.log(response);
          saveToken("token", response.token);
          saveToken("date", new Date().toISOString());
          sendNewOTP(response.token);
          router.replace("otp");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [data]);

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
        <SignInForm setFormData={setData} />

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
  text: {
    ...defaultStyles.textSubHeading,
    marginLeft: "7.5%",
    marginVertical: 12,
  },
  birth: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "85%",
    alignSelf: "center",
  },
  permitBlack: {
    ...defaultStyles.textBody,
    fontSize: 12,
  },
  permitRed: {
    ...defaultStyles.textBody,
    fontSize: 12,
    color: Colors.main,
    textDecorationLine: "underline",
  },
  signUp: {
    backgroundColor: Colors.main,
    alignSelf: "center",
    marginTop: 25,
  },
  signUpText: {
    color: Colors.white,
    fontSize: 20,
  },
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
