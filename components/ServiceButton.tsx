import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";

type Services =
  | "doctor"
  | "nurse"
  | "midwife"
  | "physiotheraphy"
  | "homecare"
  | "caregiver";

interface ServiceButtonProps {
  service: Services;
}

const images = {
  doctor: require("@/assets/images/Dokter-Icon.png"),
  nurse: require("@/assets/images/Perawat-Icon.png"),
  midwife: require("@/assets/images/Bidan-Icon.png"),
  physiotheraphy: require("@/assets/images/Fisioterapis-Icon.png"),
  homecare: require("@/assets/images/Homecare-Icon.png"),
  caregiver: require("@/assets/images/Caregiver-Icon.png"),
};

const ServiceButton = (params: ServiceButtonProps) => {
  const router = useRouter();
  const image = images[params.service];
  let query = "";

  switch (params.service) {
    case "doctor":
      query = "Dokter";
      break;
    case "nurse":
      query = "Perawat";
      break;
    case "midwife":
      query = "Bidan";
      break;
    case "physiotheraphy":
      query = "Fisioterapis";
      break;
    case "homecare":
      query = "Homecare";
      break;
    case "caregiver":
      query = "Caregiver";
      break;
  }

  const handlePress = () => {
    router.replace({
      pathname: "(tabs)/service",
      params: { query: query },
    });
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.8}
        onPress={handlePress}
      >
        <Image source={image} style={styles.image} />
      </TouchableOpacity>
      <Text style={styles.text}>{query}</Text>
    </View>
  );
};

export default ServiceButton;

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.accent,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  text: {
    ...defaultStyles.textBody,
    fontSize: 12,
    textAlign: "center",
    marginTop: 6,
  },
});
