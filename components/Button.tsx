import {
  StyleSheet,
  Image,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
} from "react-native";
import { forwardRef } from "react";

import Colors from "@/constants/Colors";

import { defaultStyles } from "@/constants/Styles";

type ButtonProps = {
  onPress?: TouchableOpacityProps["onPress"];
  buttonStyle?: TouchableOpacityProps["style"];
  textStyle?: TextStyle;
  image?: any;
  icon?: React.JSX.Element;
  title?: string;
  loading?: boolean;
} & TouchableOpacityProps;

const Button = forwardRef<TouchableOpacity, ButtonProps>(
  ({ onPress, title, image, icon, buttonStyle, textStyle, loading }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        style={[defaultStyles.button, buttonStyle]}
        activeOpacity={loading ? 1 : 0.7}
        onPress={loading ? undefined : onPress}
      >
        {loading && (
          <ActivityIndicator
            size="large"
            color={Colors.accent}
            style={styles.loading}
          />
        )}
        {image && <Image source={image} style={styles.icon} />}
        {icon}
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      </TouchableOpacity>
    );
  }
);

export default Button;

const styles = StyleSheet.create({
  buttonText: {
    ...defaultStyles.textHeading2,
    color: Colors.white,
    textAlign: "center",
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 10,
    alignSelf: "center",
    resizeMode: "contain",
  },
  loading: {
    position: "absolute",
    alignSelf: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    width: "100%",
    height: 45,
    borderRadius: 30,
    zIndex: 1,
  },
});
