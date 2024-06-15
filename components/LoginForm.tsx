import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

import InputField from "./InputField";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { LoginRequest } from "@/constants/Interfaces";
import { useRouter } from "expo-router";

interface LoginFormProps {
  setFormData: (formData: LoginRequest) => void;
  error?: boolean;
  setError?: (error: boolean) => void;
}

const validationSchema = Yup.object().shape({
  login: Yup.string().email("Email tidak valid").required("Email harus diisi"),
  password: Yup.string().required("Password harus diisi"),
});

const LoginForm = (props: LoginFormProps) => {
  const router = useRouter();

  return (
    <View style={{ marginTop: 160 }}>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          login: "",
          password: "",
        }}
        onSubmit={(values) => {
          props.setFormData(values);
        }}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <View>
            <Text style={styles.text}>Email atau Nomor Telepon</Text>
            <InputField
              autocapitalize="none"
              type="email"
              onChangeText={handleChange("login")}
              value={values.login}
              onFocus={() => props.setError!(false)}
            />
            {errors.login && touched.login && (
              <Text style={styles.error}>{errors.login}</Text>
            )}

            <Text style={styles.text}>Password</Text>
            <InputField
              type="password"
              onChangeText={handleChange("password")}
              value={values.password}
              onFocus={() => props.setError!(false)}
            />
            {errors.password && touched.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            {props.error && (
              <Text style={styles.error}>
                Email, Nomor Telepon atau Password salah
              </Text>
            )}

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.replace("forgetpass")}
            >
              <Text style={styles.forgotPassword}>Lupa Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.login}
              activeOpacity={0.7}
              onPress={() => handleSubmit()}
            >
              <Text style={styles.loginText}>Log In</Text>
            </TouchableOpacity>
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
