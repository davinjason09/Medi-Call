import {
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  ImageStyle,
} from "react-native";

import Colors from "@/constants/Colors";

interface UserAvatarProps {
  image: string | number;
  isEditable?: boolean;
  onPress: () => void;
  style?: ImageStyle;
}

const UserAvatar = ({ image, onPress, isEditable, style }: UserAvatarProps) => {
  const pencilIcon = require("@/assets/images/Edit-Avatar.png");

  return (
    <TouchableOpacity
      onPress={isEditable ? onPress : undefined}
      activeOpacity={isEditable ? 0.5 : 1}
    >
      <Image
        source={typeof image === "number" ? image : { uri: image }}
        style={[styles.avatar, style]}
      />
      <View style={[styles.pencil, { display: isEditable ? "flex" : "none" }]}>
        <Image source={pencilIcon} style={{ width: 14, height: 20 }} />
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
    top: "67.5%",
  },
});

export default UserAvatar;
