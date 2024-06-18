import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import BackButton from "@/components/BackButton";
import Colors from "@/constants/Colors";

import { getToken, removeToken } from "@/utils/Utilites";
import { defaultStyles } from "../constants/Styles";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

const RootLayout = () => {
  const [isUserChecked, setIsUserChecked] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [fontsLoaded, fontsError] = useFonts({
    Inter: require("@/assets/fonts/Inter-Regular.ttf"),
  });

  const router = useRouter();

  const checkUser = async () => {
    const token = await getToken("token");
    const date = await getToken("date");

    console.log("🚀 ~ checkUser ~ token:", token);
    console.log("🚀 ~ checkUser ~ date:", date);

    let interval = 0;
    if (date && token) {
      interval = new Date().getTime() - new Date(date).getTime();
    }

    console.log("🚀 ~ RootLayout ~ checkUser ~ interval", interval);
    if (interval < 86400000 && interval > 0) {
      router.replace("/(tabs)/home");
    } else {
      await removeToken("token");
      await removeToken("date");
      router.replace("/");
    }

    setIsUserChecked(true);
  };

  useEffect(() => {
    if (fontsError) {
      throw fontsError;
    }
  }, [fontsError]);

  useEffect(() => {
    if (fontsLoaded) {
      setIsMounted(true);
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (isMounted) {
      checkUser();
    }
  }, [isMounted]);

  useEffect(() => {
    if (fontsLoaded && isUserChecked) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isUserChecked]);

  if (!isMounted) return;

  return (
    <Stack
      screenOptions={{
        headerTitleStyle: {
          ...defaultStyles.textHeading1,
          color: Colors.main,
        },
        headerTitleAlign: "center",
        headerShadowVisible: false,
        headerLeft: () => <BackButton />,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerTitle: "Log In" }} />
      <Stack.Screen name="signup" options={{ headerTitle: "Sign Up" }} />
      <Stack.Screen name="otp" options={{ headerShown: false }} />
      <Stack.Screen
        name="forgetpass"
        options={{ headerTitle: "Reset Password" }}
      />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

const RootLayoutNav = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <RootLayout />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
};

export default RootLayoutNav;
