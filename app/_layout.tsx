import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useMemo } from "react";
import { TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import Colors from "@/constants/Colors";

import { getToken, removeToken } from "@/utils/Utilites";
import { defaultStyles } from "../constants/Styles";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [loaded, error] = useFonts({
    Inter: require("../assets/fonts/Inter-Regular.ttf"),
  });

  const router = useRouter();

  const checkUser = async () => {
    const token = await getToken("token");
    const date = await getToken("date");

    console.log(token, date);

    let interval = 0;
    if (date && token) {
      interval = new Date().getTime() - new Date(date).getTime();
    }

    if (interval < 86400000 && interval > 0) {
      router.replace("/(tabs)/home");
    } else {
      removeToken("token");
      removeToken("date");
      router.replace("/");
    }
  };

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    checkUser();
  }, []);

  const content = useMemo(() => {
    if (!loaded) return null;

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
          name="otp"
          options={{
            headerShown: false,
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
  }, [loaded, router]);

  return content;
};

const RootLayoutNav = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <RootLayout />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayoutNav;
