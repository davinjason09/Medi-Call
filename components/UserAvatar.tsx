import { StyleSheet, TouchableOpacity, Image, View } from "react-native";
import React from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

interface UserAvatarProps {
  image: string | number;
  onPress: () => void;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ image, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={typeof image === "number" ? image : { uri: image }}
        style={styles.avatar}
      />
      <View style={styles.pencil}>
        <SimpleLineIcons
          name="pencil"
          size={16}
          color={Colors.white}
          style={{ transform: [{ rotateY: "180deg" }] }}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 108,
    height: 108,
    borderRadius: 54,
    alignSelf: "center",
    marginTop: 20,
  },
  pencil: {
    backgroundColor: Colors.main,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: 28,
    height: 28,
    borderRadius: 14,
    right: "36%",
    top: "75%",
  },
});

export default UserAvatar;
