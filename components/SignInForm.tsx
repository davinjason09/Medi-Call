import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { Formik } from "formik";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Yup from "yup";

import { defaultStyles } from "@/constants/Styles";
import InputField from "./InputField";
import Picker from "./Picker";
import { genderList } from "@/constants/Options";
import { dateToISO, formatDate } from "@/utils/Utilites";
import Colors from "@/constants/Colors";
import { RegisterRequest } from "@/constants/Interfaces";

interface SignInFormProps {
  setFormData: (formData: RegisterRequest) => void;
}

const validationSchema = Yup.object().shape({
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
    .min(16, ({ min }) => `NIK harus ${min} digit`)
    .max(16, ({ max }) => `NIK maksimal ${max} digit`),
  password: Yup.string()
    .required("Password harus diisi")
    .min(8, ({ min }) => `Password minimal ${min} karakter`),
  confirmPassword: Yup.string()
    .required("Konfirmasi Password harus diisi")
    .oneOf([Yup.ref("password")], "Password tidak sama"),
});

const SignInForm = (props: SignInFormProps) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={defaultStyles.pageContainer}>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          name: "",
          email: "",
          phone: "",
          gender: "",
          birthDate: null,
          NIK: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={(values) => {
          const formData: RegisterRequest = {
            fullName: values.name,
            email: values.email,
            phoneNumber: values.phone,
            gender: values.gender,
            dateOfBirth: dateToISO(values.birthDate),
            nik: values.NIK,
            password: values.password,
          };

          props.setFormData(formData);
        }}
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
            <Text style={styles.text}>Nama Lengkap</Text>
            <InputField
              autocapitalize="words"
              type="text"
              onChangeText={handleChange("name")}
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
              value={values.email}
            />
            {errors.email && touched.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}

            <Text style={styles.text}>Nomor Telepon</Text>
            <InputField
              type="phone"
              onChangeText={handleChange("phone")}
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
              value={values.gender}
              onChange={handleChange("gender")}
              isEditable
            />
            {errors.gender && touched.gender && (
              <Text style={styles.error}>{errors.gender}</Text>
            )}

            <Text style={styles.text}>Tanggal Lahir</Text>
            <InputField
              type="number"
              value={formatDate(values.birthDate)}
              editable={false}
              calendar
              onPress={() => setOpen(true)}
            />
            {errors.birthDate && touched.birthDate && (
              <Text style={styles.error}>{errors.birthDate}</Text>
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
              value={values.NIK}
            />
            {errors.NIK && touched.NIK && (
              <Text style={styles.error}>{errors.NIK}</Text>
            )}

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
              style={styles.signUp}
              activeOpacity={0.5}
              onPress={() => handleSubmit()}
            >
              <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default SignInForm;

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
    ...defaultStyles.button,
    backgroundColor: Colors.main,
    alignSelf: "center",
    marginTop: 25,
  },
  signUpText: {
    ...defaultStyles.textSubHeading,
    color: Colors.white,
    fontSize: 20,
  },
});
