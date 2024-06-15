import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Slot, useFocusEffect, useRouter } from "expo-router";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import * as Location from "expo-location";

import ServiceButton from "@/components/ServiceButton";
import DoctorCard from "@/components/DoctorCard";
import UserAvatar from "@/components/UserAvatar";
import SearchBar from "@/components/SearchBar";
import Colors from "@/constants/Colors";

import { getDoctorData, getProfile } from "@/api/Services";
import { defaultStyles } from "@/constants/Styles";
import { DoctorList } from "@/constants/Interfaces";
import { getToken } from "@/utils/Utilites";

const HomePage = () => {
  const defaultImage = require("@/assets/images/Default_Avatar.png");
  const router = useRouter();

  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [image, setImage] = useState(defaultImage);
  const [name, setName] = useState("");
  const [doctors, setDoctors] = useState<DoctorList[]>([]);

  useFocusEffect(() => {
    const fetchProfile = async () => {
      const token = await getToken("token");
      const response = await getProfile(token!);

      if (response) {
        setName(response.fullName);
        if (response.profilePicUrl) setImage(response.profilePicUrl);
      }
    };

    fetchProfile();
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    const fetchDoctorData = async () => {
      if (!location) return <Slot />;

      const token = await getToken("token");
      const body = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        speciality: "Spesialis Kulit dan Kelamin",
        harga: "LEBIHDARI50KKURANGDARI100K",
        jarak: "KURANGDARI10KM",
      };

      const response = await getDoctorData(token!, body);

      if (response) {
        setDoctors(response.doctors);
      }
    };

    fetchDoctorData();
  }, [location]);

  return (
    <View style={defaultStyles.pageContainer}>
      <View style={styles.row}>
        <UserAvatar
          image={image}
          onPress={() => undefined}
          style={styles.avatar}
        />
        <View style={{ flex: 1 }}>
          <Text style={[defaultStyles.textLight, { fontSize: 14 }]}>
            Halo,{" "}
            <Text style={[defaultStyles.textBodyBold, { fontSize: 14 }]}>
              {name}!
            </Text>
          </Text>
        </View>

        <View style={styles.iconRow}>
          <View style={styles.icon}>
            <FontAwesome6 name="bell" size={14} color={Colors.black} />
          </View>
          <View style={styles.icon}>
            <Ionicons name="settings-outline" size={18} color={Colors.black} />
          </View>
        </View>
      </View>
      <View style={[styles.separator, { width: "100%" }]} />

      <SearchBar />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleRow}>
          <Text style={[defaultStyles.textSubHeading, { fontSize: 12 }]}>
            Layanan Kami
          </Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => router.replace("(tabs)/services")}
          >
            <Text style={styles.seeAll}>Lihat Semua</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "column" }}>
          <View style={styles.serviceRow}>
            <ServiceButton service="doctor" />
            <ServiceButton service="nurse" />
            <ServiceButton service="midwife" />
          </View>
          <View style={styles.serviceRow}>
            <ServiceButton service="physiotheraphy" />
            <ServiceButton service="homecare" />
            <ServiceButton service="caregiver" />
          </View>
        </View>

        <View style={styles.splitter} />

        <View style={styles.titleRow}>
          <Text style={[defaultStyles.textSubHeading, { fontSize: 12 }]}>
            Rekomendasi Dokter Terdekat
          </Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() =>
              router.replace({
                pathname: "(tabs)/services",
                params: { query: "doctor" },
              })
            }
          >
            <Text style={styles.seeAll}>Lihat Semua</Text>
          </TouchableOpacity>
        </View>

        <FlashList
          data={doctors.slice(0, 5)}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => <DoctorCard {...item} />}
          estimatedItemSize={5}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 32,
    width: "85%",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  icon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.accent,
    justifyContent: "center",
    alignItems: "center",
  },
  titleRow: {
    width: "85%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 16,
  },
  seeAll: {
    ...defaultStyles.textBody,
    fontSize: 10,
    color: Colors.main,
  },
  serviceRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 48,
    marginTop: 16,
  },
  splitter: {
    height: 10,
    marginTop: 16,
    backgroundColor: Colors.accent,
  },
  separator: {
    borderWidth: 0.5,
    borderColor: "rgba(134, 132, 132, 0.2)",
    width: "85%",
    alignSelf: "center",
  },
});

export default HomePage;
