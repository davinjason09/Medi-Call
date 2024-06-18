import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import * as Yup from "yup";

import InputField from "./InputField";
import Colors from "@/constants/Colors";
import Button from "./Button";

import { LoginRequest, LoginResponse } from "@/constants/Interfaces";
import { defaultStyles } from "@/constants/Styles";
import { saveToken } from "@/utils/Utilites";
import { loginUser } from "@/api/Services";

const phoneRegex = /(08)([0-9]{8,13})/;
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

const validationSchema = Yup.object().shape({
  login: Yup.string()
    .required("Email atau Nomor Telepon harus diisi")
    .test("phoneOrEmail", "Email atau Nomor Telepon tidak valid", (value) => {
      return phoneRegex.test(value) || emailRegex.test(value);
    }),
  password: Yup.string().required("Password harus diisi"),
});

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  const handleLogin = (values: LoginRequest) => {
    setIsLoading(true);

    setTimeout(() => {
      loginUser(values)
        .then((response: LoginResponse) => {
          console.log(response);
          saveToken("token", response.token);
          saveToken("date", new Date().toISOString());
          router.replace("/(tabs)/home");
        })
        .catch((error) => {
          console.log(error);
          setIsError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 200);
  };

  return (
    <View style={{ marginTop: 160 }}>
      <Formik
        validationSchema={validationSchema}
        initialValues={{ login: "", password: "" }}
        onSubmit={(values) => handleLogin(values)}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <View>
            <Text style={styles.text}>Email atau Nomor Telepon</Text>
            <InputField
              autocapitalize="none"
              type="email"
              onChangeText={handleChange("login")}
              value={values.login}
              removeError={() => setIsError(false)}
            />
            {errors.login && touched.login && (
              <Text style={styles.error}>{errors.login}</Text>
            )}

            <Text style={styles.text}>Password</Text>
            <InputField
              type="password"
              onChangeText={handleChange("password")}
              value={values.password}
              removeError={() => setIsError(false)}
            />
            {errors.password && touched.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            {isError && (
              <Text style={styles.error}>
                Email, Nomor Telepon atau Password salah
              </Text>
            )}

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                router.replace({
                  pathname: "forgetpass",
                  params: { type: "reset" },
                })
              }
            >
              <Text style={styles.forgotPassword}>Lupa Password?</Text>
            </TouchableOpacity>

            <Button
              title="Log In"
              onPress={() => handleSubmit()}
              buttonStyle={styles.login}
              textStyle={styles.loginText}
              loading={isLoading}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  text: {
    ...defaultStyles.textSubHeading,
    marginLeft: "7.5%",
    marginVertical: 12,
  },
  error: {
    ...defaultStyles.textBody,
    color: Colors.main,
    left: "7.5%",
    fontSize: 12,
    marginTop: 2,
  },
  forgotPassword: {
    ...defaultStyles.textHeading2,
    fontSize: 12,
    color: Colors.main,
    textAlign: "right",
    marginRight: "7.5%",
    marginTop: 10,
  },
  login: {
    ...defaultStyles.button,
    backgroundColor: Colors.main,
    alignSelf: "center",
    marginTop: 25,
  },
  loginText: {
    ...defaultStyles.textSubHeading,
    color: Colors.white,
    fontSize: 20,
  },
});
