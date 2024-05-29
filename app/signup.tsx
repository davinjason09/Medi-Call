import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import { useRouter } from "expo-router";
import InputField from "@/components/InputField";
import Colors from "@/constants/Colors";
import Picker from "@/components/Picker";

const SignUpPage = () => {
  const router = useRouter();

  const genderList = [
    { label: "Pria", value: "Pria" },
    { label: "Wanita", value: "Wanita" },
  ];

  const dateList = Array.from({ length: 31 }, (_, i) => ({
    label: String(i + 1),
    value: i + 1,
  }));

  const monthList = Array.from({ length: 12 }, (_, i) => {
    const d = new Date();
    d.setMonth(i);

    return {
      label: d.toLocaleString("en-ca", { month: "short" }),
      value: i + 1,
    };
  });

  const yearList = Array.from({ length: 100 }, (_, i) => ({
    label: String(2024 - i),
    value: 2024 - i,
  }));

  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [gender, setGender] = useState("");

  return (
    <KeyboardAvoidingView
      behavior={"padding"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={10}
    >
      <ScrollView
        style={defaultStyles.pageContainer}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[styles.text, { marginTop: 20 }]}>Nama Lengkap</Text>
        <InputField type="text" />
        <Text style={styles.text}>Email</Text>
        <InputField type="email" />
        <Text style={styles.text}>No. Telepon</Text>
        <InputField type="phone" />
        <Text style={styles.text}>Gender</Text>
        <Picker
          placeholder="Pilih Gender"
          data={genderList}
          labelField="label"
          valueField="value"
          value={gender}
          onChange={setGender}
        />
        <Text style={styles.text}>Tanggal Lahir</Text>
        <View style={styles.birth}>
          <Picker
            containerWidth={"30%"}
            placeholder="Tanggal"
            data={dateList}
            labelField="label"
            valueField="value"
            value={date}
            onChange={setDate}
          />
          <Picker
            containerWidth={"30%"}
            placeholder="Bulan"
            data={monthList}
            labelField="label"
            valueField="value"
            value={month}
            onChange={setMonth}
          />
          <Picker
            containerWidth={"30%"}
            placeholder="Tahun"
            data={yearList}
            labelField="label"
            valueField="value"
            value={year}
            onChange={setYear}
          />
        </View>
        <Text style={styles.text}>NIK</Text>
        <InputField type="number" />
        <Text style={styles.text}>Password</Text>
        <InputField type="password" />
        <Text style={styles.text}>Konfirmasi Password</Text>
        <InputField type="password" />

        <Text style={{ textAlign: "center", marginTop: 45 }}>
          <Text style={styles.permitBlack}>
            Dengan mengetuk Sign Up, Anda menyetujui semua{"\n"}
          </Text>
          <Text style={styles.permitRed}>Ketentuan Penggunaan</Text>
          <Text style={styles.permitBlack}>{" dan "}</Text>
          <Text style={styles.permitRed}>Privasi</Text>
          <Text style={styles.permitBlack}>{" kami."}</Text>
        </Text>

        <TouchableOpacity
          style={[defaultStyles.button, styles.signUp]}
          activeOpacity={0.5}
          onPress={() => router.navigate("home")}
        >
          <Text style={[defaultStyles.textSubHeading, styles.signUpText]}>
            Log In
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.haveAccount}
          activeOpacity={0.5}
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
