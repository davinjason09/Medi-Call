import React from "react";
import { FontAwesome5, FontAwesome6, Fontisto } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";

const TabLayout = () => {
  return (
    <Tabs
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
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
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
        name="doctor"
        options={{
          title: "Dokter",
          tabBarIcon: ({ color }) => (
            <Fontisto name="doctor" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="user" color={color} size={22} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
