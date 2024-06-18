import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Formik } from "formik";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import * as Yup from "yup";

import InputField from "./InputField";
import Picker from "./Picker";
import Colors from "@/constants/Colors";
import UserAvatar from "./UserAvatar";
import { useRouter } from "expo-router";
import { dateToISO, formatDate, getToken, removeToken } from "@/utils/Utilites";
import { defaultStyles } from "@/constants/Styles";
import { genderList } from "@/constants/Options";

import { UpdateProfileRequest, UserProfile } from "@/constants/Interfaces";
import { updateProfile, updateProfilePicture } from "@/api/Services";
import Button from "./Button";

interface EditProfileFormProps {
  values: UserProfile;
  isEditing: boolean;
}

const validationSchema = Yup.object().shape({
  image: Yup.string(),
  name: Yup.string()
    .required("Nama Lengkap harus diisi")
    .min(3, ({ min }) => `Nama Lengkap minimal ${min} karakter`)
    .matches(/^[a-zA-Z\s]*$/, "Nama Lengkap hanya boleh huruf"),
  email: Yup.string().email("Email tidak valid").required("Email harus diisi"),
  phone: Yup.string()
    .required("Nomor Telepon harus diisi")
    .matches(/(08)([0-9]{8,13})/, "Nomor Telepon tidak valid")
    .min(10, ({ min }) => `Nomor Telepon harus ${min} digit`)
    .max(15, ({ max }) => `Nomor Telepon maksimal ${max} digit`),
  gender: Yup.string()
    .required("Jenis Kelamin harus diisi")
    .oneOf(["male", "female"], "Jenis Kelamin harus diisi"),
  birthDate: Yup.date().required("Tanggal Lahir harus diisi"),
  NIK: Yup.string()
    .required("NIK harus diisi")
    .length(16, "NIK harus 16 digit"),
});

const EditProfileForm: React.FC<EditProfileFormProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const defaultImage = require("@/assets/images/Default_Avatar.png");

  const pickImage = async (
    setFieldValue: (field: string, value: any) => void
  ) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setFieldValue("image", result.assets[0].uri);
      setFieldValue("imageData", {
        filename: result.assets[0].fileName!,
        image: result.assets[0].base64!,
      });
    }
  };

  const _handleUpdate = async (values: any) => {
    setIsLoading(true);

    const updatedProfile: UpdateProfileRequest = {
      fullName: values.name,
      phoneNumber: values.phone,
      gender: values.gender,
      dateOfBirth: dateToISO(values.birthDate),
      nik: values.NIK,
    };

    const initialProfile = {
      fullName: props.values.fullName,
      phoneNumber: props.values.phoneNumber,
      gender: props.values.gender,
      dateOfBirth: props.values.dateOfBirth,
      nik: props.values.nik,
    };

    const token = await getToken("token");
    if (props.isEditing) {
      setTimeout(() => {
        if (updatedProfile !== initialProfile) {
          updateProfile(token!, updatedProfile);
        }
        if (values.imageData) {
          updateProfilePicture(token!, values.imageData);
        }

        router.replace({ pathname: "profile" });
        setIsLoading(false);
      }, 200);
    } else {
      setIsLoading(false);
      removeToken("token");
      removeToken("date");
      router.replace("/");
    }
  };

  return (
    <View style={defaultStyles.pageContainer}>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          image: props.values.profilePicUrl || defaultImage,
          imageData: null,
          name: props.values.fullName,
          email: props.values.email,
          phone: props.values.phoneNumber,
          gender: props.values.gender,
          birthDate: new Date(props.values.dateOfBirth),
          NIK: props.values.nik,
        }}
        onSubmit={(values) => _handleUpdate(values)}
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
            <UserAvatar
              image={values.image}
              onPress={() => pickImage(setFieldValue)}
              isEditable={props.isEditing}
              style={{ marginVertical: 20 }}
            />

            <Text style={styles.text}>Nama Lengkap</Text>
            <InputField
              autocapitalize="words"
              type="text"
              onChangeText={handleChange("name")}
              editable={props.isEditing}
              value={values.name}
            />
            {errors.name && touched.name && (
              <Text style={styles.error}>{errors.name}</Text>
            )}

            <Text style={styles.text}>Email</Text>
            <InputField
              autocapitalize="none"
              type="email"
              onChangeText={handleChange("email")}
              editable={props.isEditing}
              value={values.email}
            />
            {errors.email && touched.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}

            <Text style={styles.text}>Nomor Telepon</Text>
            <InputField
              type="phone"
              onChangeText={handleChange("phone")}
              editable={props.isEditing}
              value={values.phone}
            />
            {errors.phone && touched.phone && (
              <Text style={styles.error}>{errors.phone}</Text>
            )}

            <Text style={styles.text}>Jenis Kelamin</Text>
            <Picker
              placeholder="Pilih Jenis Kelamin"
              data={genderList}
              labelField="label"
              valueField="value"
              isEditable={props.isEditing}
              value={values.gender}
              onChange={(value) => setFieldValue("gender", value)}
            />
            {errors.gender && touched.gender && (
              <Text style={styles.error}>{errors.gender}</Text>
            )}

            <Text style={styles.text}>Tanggal Lahir</Text>
            <InputField
              type="number"
              value={formatDate(
                values.birthDate || new Date(props.values.dateOfBirth)
              )}
              editable={false}
              calendar
              onPress={() => (props.isEditing ? setOpen(true) : null)}
            />
            {errors.birthDate && touched.birthDate && (
              <Text style={styles.error}>{String(errors.birthDate)}</Text>
            )}

            {open && (
              <DateTimePicker
                mode="date"
                display="default"
                maximumDate={new Date()}
                minimumDate={new Date(1900, 0, 1)}
                value={values.birthDate || new Date()}
                onChange={(_, selectedDate) => {
                  setOpen(false);
                  setFieldValue("birthDate", selectedDate!);
                }}
              />
            )}

            <Text style={styles.text}>NIK</Text>
            <InputField
              type="number"
              onChangeText={handleChange("NIK")}
              editable={props.isEditing}
              value={values.NIK}
            />
            {errors.NIK && touched.NIK && (
              <Text style={styles.error}>{errors.NIK}</Text>
            )}

            <Button
              title={props.isEditing ? "Update Profile" : "Log Out"}
              onPress={() => handleSubmit()}
              loading={isLoading}
              buttonStyle={styles.update}
              textStyle={styles.updateText}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    ...defaultStyles.textSubHeading,
    left: "7.5%",
    marginVertical: 12,
  },
  error: {
    ...defaultStyles.textBody,
    color: Colors.main,
    left: "7.5%",
    fontSize: 12,
    marginTop: 2,
  },
  update: {
    ...defaultStyles.button,
    backgroundColor: Colors.main,
    alignSelf: "center",
    marginTop: 40,
    marginBottom: 50,
  },
  updateText: {
    ...defaultStyles.textSubHeading,
    color: Colors.white,
    fontSize: 20,
  },
});

export default EditProfileForm;
