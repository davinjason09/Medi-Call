import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

import LoginForm from "@/components/LoginForm";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { LoginRequest } from "@/constants/Interfaces";
import { loginUser } from "@/api/Services";
import { saveToken } from "@/utils/Utilites";

const LoginPage = () => {
  const [data, setData] = useState<LoginRequest>();
  const [isError, setIsError] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (data) {
      loginUser(data)
        .then((response) => {
          console.log(response);
          saveToken("token", response.token);
          saveToken("date", new Date().toISOString());
          router.replace("/(tabs)/home");
        })
        .catch((error) => {
          console.log(error);
          setIsError(true);
        });
    }
  }, [data]);

  return (
    <View style={defaultStyles.pageContainer}>
      <LoginForm setFormData={setData} error={isError} setError={setIsError} />

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
