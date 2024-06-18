import { Image, StyleSheet, Text, View } from "react-native";

import { defaultStyles } from "@/constants/Styles";

const NoDoctors = () => {
  const icon = require("@/assets/images/No-Doctors.png");
  return (
    <View style={styles.container}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.text}>Belum ada dokter yang tersedia</Text>
    </View>
  );
};

export default NoDoctors;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 400,
  },
  icon: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  text: {
    ...defaultStyles.textSubHeading,
    marginTop: 16,
    textAlign: "center",
  },
});
