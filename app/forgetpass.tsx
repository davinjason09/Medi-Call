import { View, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { defaultStyles } from "@/constants/Styles";
import ResetPasswordForm from "@/components/ResetPasswordForm";

const ForgetPasswordPage = () => {
  const { type } = useLocalSearchParams<{ type: string }>();

  console.log(type);

  return (
    <View style={[defaultStyles.pageContainer, styles.container]}>
      <ResetPasswordForm type={type!} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
});

export default ForgetPasswordPage;
