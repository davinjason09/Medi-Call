import { sendNewOTP, validateOTP } from "@/api/Services";
import OTPInput from "@/components/OTPInput";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { getToken } from "@/utils/Utilites";
import { useRouter } from "expo-router";
import { RefObject, useEffect, useRef, useState } from "react";
import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const OTP = () => {
  const [codes, setCodes] = useState<string[] | undefined>(Array(4).fill(""));
  const [errorMessages, setErrorMessages] = useState<string[]>();
  const [countdown, setCountdown] = useState<number>(30);

  const OTPLogo = require("@/assets/images/OTP-Icon.png");
  const router = useRouter();
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

  const onResend = async () => {
    if (countdown) return;

    const token = await getToken("token");
    sendNewOTP(token!);
    setCountdown(30);
  };

  const verify = async () => {
    const token = await getToken("token");
    const date = await getToken("date");
    const otp = codes!.join("");

    if (otp.length < 4) {
      setErrorMessages(["Kode OTP tidak valid"]);
      return;
    }

    console.log(otp, token, date);
    const response = await validateOTP({ otp: otp }, token!);
    if (response) {
      router.replace("(tabs)/home");
    }
  };

  return (
    <View style={defaultStyles.pageContainer}>
      <Image source={OTPLogo} style={styles.logo} />
      <Text style={styles.title}>Verifikasi OTP</Text>
      <Text style={styles.text}>
        {"Masukkan 4 digit kode OTP yang telah\ndikirimkan ke "}
        <Text style={defaultStyles.textBodyBold}>alamat email Anda</Text>
      </Text>

      <OTPInput
        codes={codes!}
        refs={refs}
        errorMessage={errorMessages}
        onChangeCode={onChangeCode}
      />

      <Text style={styles.countdown}>
        {`00:${countdown.toString().padStart(2, "0")}`}
      </Text>

      <View style={styles.resendRow}>
        <Text style={styles.resendText}>{"Belum menerima kode OTP? "}</Text>
        <TouchableOpacity
          activeOpacity={!countdown ? 0.7 : 1}
          onPress={onResend}
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

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.5}
        onPress={verify}
      >
        <Text style={styles.buttonText}>Verifikasi</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OTP;

const styles = StyleSheet.create({
  logo: {
    marginTop: 72,
    width: 152,
    height: 152,
    resizeMode: "contain",
    alignSelf: "center",
  },
  title: {
    ...defaultStyles.textHeading1,
    marginTop: 32,
    fontSize: 24,
    textAlign: "center",
    color: Colors.main,
  },
  text: {
    ...defaultStyles.textBody,
    textAlign: "center",
    marginTop: 36,
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
  button: {
    ...defaultStyles.button,
    alignSelf: "center",
    marginTop: 42,
    backgroundColor: Colors.main,
  },
  buttonText: {
    ...defaultStyles.textHeading2,
    color: Colors.white,
  },
});
