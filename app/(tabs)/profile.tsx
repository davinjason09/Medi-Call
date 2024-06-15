import {
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  View,
  Image,
} from "react-native";
import { Tabs, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";

import InputField from "@/components/InputField";
import UserAvatar from "@/components/UserAvatar";
import Colors from "@/constants/Colors";
import Picker from "@/components/Picker";

import { formatDate, getToken, removeToken } from "@/utils/Utilites";
import { UpdateProfilePicture, getProfile } from "@/api/Services";
import { defaultStyles } from "@/constants/Styles";
import { genderList } from "@/constants/Options";

const ProfilePage = () => {
  const { type } = useLocalSearchParams<{ type: string }>();

  const defaultImage = require("@/assets/images/Default_Avatar.png");
  const pencilIcon = require("@/assets/images/Edit-Profile.png");
  const router = useRouter();
  const isEditing = type === "edit";

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState<string>("");
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [NIK, setNIK] = useState("");
  const [image, setImage] = useState(defaultImage);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = await getToken("token");
      const response = await getProfile(token!);

      if (response) {
        setName(response.fullName);
        setEmail(response.email);
        setPhone(response.phoneNumber);
        setGender(response.gender);
        setBirthDate(new Date(response.dateOfBirth));
        setNIK(response.nik);
        setImage(response.profilePicUrl);
      }
    };

    fetchProfile();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);

      const token = await getToken("token");
      UpdateProfilePicture(token!, result.assets[0].base64!, "profilePic.jpg")
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handlePress = () => {
    if (isEditing) {
      router.replace({ pathname: "profile" });
    } else {
      removeToken("token");
      removeToken("date");
      router.replace("/");
    }
  };

  return (
    <View style={defaultStyles.pageContainer}>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            height: 72,
            display: isEditing ? "none" : "flex",
          },
        }}
      ></Tabs>
      <Tabs.Screen
        options={{
          headerRight: isEditing
            ? undefined
            : () => (
                <TouchableOpacity
                  style={{ height: 30, width: 30 }}
                  onPress={() =>
                    router.replace({
                      pathname: "profile",
                      params: { type: "edit" },
                    })
                  }
                >
                  <Image
                    source={pencilIcon}
                    style={{ width: 14, height: 20 }}
                  />
                </TouchableOpacity>
              ),
          headerRightContainerStyle: {
            top: "2.5%",
            right: "35%",
          },
          headerLeft: isEditing
            ? () => (
                <TouchableOpacity
                  style={{ marginLeft: 20, height: 30, width: 50 }}
                  onPress={() => router.replace({ pathname: "profile" })}
                >
                  <FontAwesome
                    name="angle-left"
                    size={30}
                    color={Colors.main}
                  />
                </TouchableOpacity>
              )
            : undefined,
        }}
      />

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
          <UserAvatar
            image={image}
            onPress={pickImage}
            isEditable={isEditing}
            style={{ marginTop: 20 }}
          />
          <Text style={[styles.text, { marginTop: 20 }]}>Nama Lengkap</Text>
          <InputField
            type="text"
            value={name}
            onChangeText={setName}
            editable={isEditing}
          />
          <Text style={styles.text}>Email</Text>
          <InputField
            type="email"
            value={email}
            onChangeText={setEmail}
            editable={isEditing}
          />
          <Text style={styles.text}>No. Telepon</Text>
          <InputField
            type="phone"
            value={phone}
            onChangeText={setPhone}
            editable={isEditing}
          />
          <Text style={styles.text}>Jenis Kelamin</Text>
          <Picker
            placeholder="Pilih Jenis Kelamin"
            data={genderList}
            labelField="label"
            valueField="value"
            value={gender}
            onChange={setGender}
            isEditable={isEditing}
          />
          <Text style={styles.text}>Tanggal Lahir</Text>
          <InputField
            type="number"
            value={formatDate(birthDate)}
            editable={false}
            calendar
            onPress={() => (isEditing ? setOpen(true) : null)}
          />

          {open && (
            <DateTimePicker
              mode="date"
              display="default"
              maximumDate={new Date()}
              minimumDate={new Date(1900, 0, 1)}
              value={birthDate || new Date()}
              onChange={(_, selectedDate) => {
                setOpen(false);
                setBirthDate(selectedDate!);
              }}
            />
          )}

          <Text style={styles.text}>NIK</Text>
          <InputField
            type="number"
            value={NIK}
            onChangeText={setNIK}
            editable={isEditing}
          />

          <TouchableOpacity
            style={[defaultStyles.button, styles.update]}
            activeOpacity={0.5}
            onPress={handlePress}
          >
            <Text style={[defaultStyles.textSubHeading, styles.updateText]}>
              {isEditing ? "Update Profile" : "Log Out"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
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

export default ProfilePage;
