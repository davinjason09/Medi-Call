import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import Colors from "@/constants/Colors";

interface BackButtonProps {
  path?: string;
  params?: any;
  style?: ViewStyle;
  type?: "push" | "replace";
  setParams?: any;
}

const BackButton = (props: BackButtonProps) => {
  const router = useRouter();

  const _handlePress = () => {
    if (props.path) {
      if (props.type === "replace") {
        router.replace({
          pathname: props.path,
          params: props.params,
        });
      } else {
        router.push({
          pathname: props.path,
          params: props.params,
        });
      }
    } else if (props.setParams) {
      router.setParams(props.setParams);
    } else {
      router.back();
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.backButton, props.style]}
      onPress={_handlePress}
    >
      <FontAwesome name="angle-left" size={30} color={Colors.main} />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  backButton: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
