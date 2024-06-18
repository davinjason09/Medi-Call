import { FontAwesome5, FontAwesome6, Fontisto } from "@expo/vector-icons";
import { Tabs } from "expo-router";

import Colors from "@/constants/Colors";

import { defaultStyles } from "@/constants/Styles";

const TabLayout = () => {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: Colors.main,
        tabBarInactiveTintColor: Colors.inactive,
        tabBarStyle: {
          height: 80,
        },
        tabBarLabelStyle: {
          ...defaultStyles.textExtraLight,
          marginBottom: 15,
          marginTop: -15,
        },
        headerTitleAlign: "center",
        headerTitleStyle: {
          ...defaultStyles.textHeading1,
          color: Colors.main,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="home" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "Riwayat",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="clock" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="service"
        options={{
          title: "Layanan",
          headerTransparent: true,
          tabBarIcon: ({ color }) => (
            <Fontisto name="doctor" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerTitle: "My Profile",
          headerShadowVisible: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="user" color={color} size={22} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
