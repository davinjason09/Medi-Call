import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  View,
  Image,
} from "react-native";
import {
  Tabs,
  useFocusEffect,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";

import EditProfileForm from "@/components/EditProfileForm";
import BackButton from "@/components/BackButton";

import { getToken } from "@/utils/Utilites";
import { getProfile } from "@/api/Services";
import { defaultStyles } from "@/constants/Styles";
import { UserProfile } from "@/constants/Interfaces";

const ProfilePage = () => {
  const { type } = useLocalSearchParams<{ type: string }>();

  const pencilIcon = require("@/assets/images/Edit-Profile.png");
  const isEditing = type === "edit";
  const scrollRef = useRef<ScrollView>(null);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<UserProfile>();

  useFocusEffect(
    useCallback(() => {
      const fetchProfile = async () => {
        const token = await getToken("token");
        const response = await getProfile(token!);

        if (response) {
          setData(response);
          setLoading(false);
        }
      };

      fetchProfile();
    }, [])
  );

  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  }, [type]);

  const _editProfile = () => {
    router.setParams({ type: "edit" });
  };

  if (loading) {
    return <View style={defaultStyles.pageContainer} />;
  }

  return (
    <View style={defaultStyles.pageContainer}>
      <Tabs.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity
              style={[styles.edit, { display: isEditing ? "none" : "flex" }]}
              onPress={_editProfile}
            >
              <Image source={pencilIcon} style={styles.editIcon} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <BackButton
              setParams={{ type: undefined }}
              style={{
                marginLeft: "10%",
                display: isEditing ? "flex" : "none",
              }}
            />
          ),
          tabBarStyle: {
            height: 80,
            display: isEditing ? "none" : "flex",
          },
        }}
      />

      <KeyboardAvoidingView
        behavior="padding"
        style={defaultStyles.pageContainer}
      >
        <ScrollView
          ref={scrollRef}
          style={defaultStyles.pageContainer}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
        >
          <EditProfileForm values={data!} isEditing={isEditing} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  edit: {
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    right: "10%",
  },
  editIcon: {
    width: 14,
    height: 20,
    resizeMode: "contain",
  },
});

export default ProfilePage;
