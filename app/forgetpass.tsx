import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { defaultStyles } from "@/constants/Styles";
import InputField from "@/components/InputField";
import { useRouter } from "expo-router";
import Colors from "@/constants/Colors";

const ForgetPasswordPage = () => {
  const router = useRouter();

  return (
    <View style={defaultStyles.pageContainer}>
      <Text style={[styles.text, { marginTop: 180 }]}>Password</Text>
      <InputField type="password" />
      <Text style={styles.text}>Konfirmasi Password</Text>
      <InputField type="password" />

      <TouchableOpacity
        style={[defaultStyles.button, styles.save]}
        activeOpacity={0.5}
        onPress={() => router.replace("login")}
      >
        <Text style={[defaultStyles.textSubHeading, styles.saveText]}>
          Simpan
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    ...defaultStyles.textSubHeading,
    marginLeft: "7.5%",
    marginVertical: 12,
  },
  save: {
    backgroundColor: Colors.main,
    alignSelf: "center",
    marginTop: 55,
  },
  saveText: {
    color: Colors.white,
    fontSize: 20,
  },
});

export default ForgetPasswordPage;
