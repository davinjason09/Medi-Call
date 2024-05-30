import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import InputField from "@/components/InputField";
import Picker from "@/components/Picker";
import { useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import UserAvatar from "@/components/UserAvatar";

const EditProfilePage = () => {
  const defaultImage = require("@/assets/images/Default_Avatar.png");
  const router = useRouter();

  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState(defaultImage);

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

  const thisYear = new Date().getFullYear();
  const yearList = Array.from({ length: 100 }, (_, i) => ({
    label: String(thisYear - i),
    value: thisYear - i,
  }));

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={[defaultStyles.pageContainer]}
    >
      <ScrollView
        style={defaultStyles.pageContainer}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
      >
        <UserAvatar image={image} onPress={pickImage} />
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

        <TouchableOpacity
          style={[defaultStyles.button, styles.update]}
          activeOpacity={0.5}
          onPress={() => router.navigate("home")}
        >
          <Text style={[defaultStyles.textSubHeading, styles.updateText]}>
            Update Profile
          </Text>
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
  update: {
    backgroundColor: Colors.main,
    alignSelf: "center",
    marginTop: 40,
    marginBottom: 50,
  },
  updateText: {
    color: Colors.white,
    fontSize: 20,
  },
});

export default EditProfilePage;
