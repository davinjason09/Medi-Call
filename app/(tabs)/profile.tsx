import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { defaultStyles } from "@/constants/Styles";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";

const ProfilePage = () => {
  return (
    <View
      style={[
        defaultStyles.pageContainer,
        { justifyContent: "center", alignItems: "center" },
      ]}
    >
      <Link
        push
        href={{ pathname: "editprofile" }}
        style={[defaultStyles.button, styles.edit]}
        asChild
      >
        <TouchableOpacity>
          <Text style={[defaultStyles.textSubHeading, styles.editText]}>
            Edit Profile
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  edit: {
    backgroundColor: Colors.main,
    alignSelf: "center",
    marginTop: 25,
  },
  editText: {
    color: Colors.white,
    fontSize: 20,
  },
});

export default ProfilePage;
