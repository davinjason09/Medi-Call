import { RefObject, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import * as Yup from "yup";

import InputField from "./InputField";
import OTPInput from "@/components/OTPInput";
import Colors from "@/constants/Colors";
import Button from "./Button";

import { defaultStyles } from "@/constants/Styles";
import { getToken } from "@/utils/Utilites";
import {
  requestPasswordReset,
  resetPassword,
  sendNewOTP,
} from "@/api/Services";

interface ResetPasswordFormProps {
  type: string;
}

const phoneRegex = /(08)([0-9]{8,13})/;
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

const emailValidationSchema = Yup.object().shape({
  reset: Yup.string()
    .required("Email atau Nomor Telepon harus diisi")
    .test("phoneOrEmail", "Email atau Nomor Telepon tidak valid", (value) => {
      return phoneRegex.test(value) || emailRegex.test(value);
    }),
});

const passwordValidationSchema = Yup.object().shape({
  otp: Yup.string()
    .required("Kode OTP harus diisi")
    .length(4, "Kode OTP harus 4 digit"),
  password: Yup.string()
    .required("Password harus diisi")
    .min(8, ({ min }) => `Password minimal ${min} karakter`),
  confirmPassword: Yup.string()
    .required("Konfirmasi Password harus diisi")
    .oneOf([Yup.ref("password")], "Password tidak sama"),
});

const getValidationSchema = (type: string) => {
  return type === "reset-password"
    ? passwordValidationSchema
    : emailValidationSchema;
};

const ResetPasswordForm = (props: ResetPasswordFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [codes, setCodes] = useState<string[] | undefined>(Array(4).fill(""));
  const [errorMessages, setErrorMessages] = useState<string[]>();
  const [countdown, setCountdown] = useState<number>(30);

  const router = useRouter();

  const isReset = props.type === "reset-password";
  const refs: RefObject<TextInput>[] = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const onChangeCode = (text: string, index: number) => {
    if (text.length > 1) {
      setErrorMessages(undefined);

      const newCodes = text.split("");
      setCodes(newCodes);
      refs[3]!.current!.focus();
      return;
    }

    setErrorMessages(undefined);

    const newCodes = [...codes!];
    newCodes[index] = text;
    setCodes(newCodes);

    if (text !== "" && index < 3) {
      refs[index + 1]!.current!.focus();
    }
  };

  const onResend = async (values: any) => {
    if (countdown) return;

    requestPasswordReset(values.reset);
    setCountdown(30);
  };

  const _handleReset = (values: any) => {
    console.log(values);

    setIsLoading(true);

    setTimeout(() => {
      if (isReset) {
        resetPassword(values.reset, values.otp, values.password)
          .then((response) => {
            console.log(response);
            router.replace("login");
          })
          .catch((error) => {
            console.log(error);
            setErrorMessages(["Kode OTP tidak valid"]);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        requestPasswordReset(values.reset)
          .then((response) => {
            console.log(response);
            router.setParams({
              type: "reset-password",
            });
          })
          .catch((error) => {
            console.log(error);
            setIsError(true);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    }, 200);
  };

  return (
    <View>
      <Formik
        validationSchema={getValidationSchema(props.type)}
        initialValues={{
          reset: "",
          password: "",
          confirmPassword: "",
          otp: "",
        }}
        onSubmit={(values) => _handleReset(values)}
      >
        {({
          handleChange,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
        }) => (
          <View>
            {!isReset && (
              <>
                <Text style={styles.text}>Email atau Nomor Telepon</Text>
                <InputField
                  autocapitalize="none"
                  type="email"
                  onChangeText={handleChange("reset")}
                  value={values.reset}
                  removeError={() => setIsError(false)}
                />
                {errors.reset && touched.reset && (
                  <Text style={styles.error}>{errors.reset}</Text>
                )}
              </>
            )}

            {isReset && (
              <>
                <Text style={styles.text}>Password</Text>
                <InputField
                  type="password"
                  onChangeText={handleChange("password")}
                  value={values.password}
                />
                {errors.password && touched.password && (
                  <Text style={styles.error}>{errors.password}</Text>
                )}

                <Text style={styles.text}>Konfirmasi Password</Text>
                <InputField
                  type="password"
                  onChangeText={handleChange("confirmPassword")}
                  value={values.confirmPassword}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <Text style={styles.error}>{errors.confirmPassword}</Text>
                )}
              </>
            )}

            {isError &&
              (isReset ? (
                <Text style={styles.error}>Kode OTP tidak valid</Text>
              ) : (
                <Text style={styles.error}>Email tidak terdapat di data</Text>
              ))}

            {isReset && (
              <>
                <Text style={styles.verification}>
                  {"Masukkan 4 digit kode OTP yang telah\ndikirimkan ke "}
                  <Text style={defaultStyles.textBodyBold}>
                    alamat email Anda
                  </Text>
                </Text>

                <OTPInput
                  codes={codes!}
                  refs={refs}
                  errorMessage={errorMessages}
                  onChangeCode={(text, index) => {
                    onChangeCode(text, index);
                    const newOTP = [...codes!];
                    newOTP[index] = text;
                    setFieldValue("otp", newOTP.join(""));
                  }}
                />
                {errors.otp && touched.otp && (
                  <Text style={styles.error}>{errors.otp}</Text>
                )}

                <Text style={styles.countdown}>
                  {`00:${countdown.toString().padStart(2, "0")}`}
                </Text>

                <View style={styles.resendRow}>
                  <Text style={styles.resendText}>
                    {"Belum menerima kode OTP? "}
                  </Text>
                  <TouchableOpacity
                    activeOpacity={!countdown ? 0.7 : 1}
                    onPress={() => onResend(values)}
                  >
                    <Text
                      style={[
                        styles.resend,
                        { color: !countdown ? Colors.main : Colors.inactive },
                      ]}
                    >
                      Kirim OTP
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}

            <Button
              title={isReset ? "Simpan" : "Lanjut"}
              onPress={() => handleSubmit()}
              buttonStyle={styles.reset}
              textStyle={styles.resetText}
              loading={isLoading}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default ResetPasswordForm;

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
  verification: {
    ...defaultStyles.textBody,
    marginTop: 32,
    marginBottom: -24,
    textAlign: "center",
  },
  countdown: {
    ...defaultStyles.textBodyBold,
    textAlign: "center",
    color: Colors.gray,
  },
  resendRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  resend: {
    ...defaultStyles.textBodyBold,
    fontSize: 14,
  },
  resendText: {
    ...defaultStyles.textBody,
    fontSize: 14,
    textAlign: "center",
  },
  reset: {
    backgroundColor: Colors.main,
    alignSelf: "center",
    marginTop: 55,
  },
  resetText: {
    color: Colors.white,
    fontSize: 20,
  },
});
