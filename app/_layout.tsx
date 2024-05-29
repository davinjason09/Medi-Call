import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { defaultStyles } from "../constants/Styles";
import Colors from "@/constants/Colors";
import { TouchableOpacity } from "react-native";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Inter: require("../assets/fonts/Inter-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
};

const RootLayoutNav = () => {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="login"
        options={{
          headerTitle: "Log In",
          headerTitleStyle: {
            ...defaultStyles.textHeading1,
            color: Colors.main,
          },
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 20, height: 30, width: 50 }}
              onPress={() => router.back()}
            >
              <FontAwesome name="angle-left" size={30} color={Colors.main} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          headerTitle: "Sign Up",
          headerTitleStyle: {
            ...defaultStyles.textHeading1,
            color: Colors.main,
          },
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 20, height: 30, width: 50 }}
              onPress={() => router.back()}
            >
              <FontAwesome name="angle-left" size={30} color={Colors.main} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="forgetpass"
        options={{
          headerTitle: "Set Password",
          headerTitleStyle: {
            ...defaultStyles.textHeading1,
            color: Colors.main,
          },
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 20, height: 30, width: 50 }}
              onPress={() => router.back()}
            >
              <FontAwesome name="angle-left" size={30} color={Colors.main} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;
