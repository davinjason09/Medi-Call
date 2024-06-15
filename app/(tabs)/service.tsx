import {
  View,
  StyleSheet,
  Text,
  ViewStyle,
  TouchableOpacity,
  useWindowDimensions,
  Keyboard,
} from "react-native";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useLocalSearchParams } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import * as Location from "expo-location";

import SearchBar from "@/components/SearchBar";
import DoctorCard from "@/components/DoctorCard";
import {
  filterByLocation,
  filterByPrice,
  filterBySpeciality,
  servicesList,
} from "@/constants/Options";
import Colors from "@/constants/Colors";
import Filter from "@/components/Filter";
import Picker from "@/components/Picker";

import { DoctorList, NearbyServicesRequest } from "@/constants/Interfaces";
import { defaultStyles } from "@/constants/Styles";
import { getDoctorData } from "@/api/Services";
import { getToken } from "@/utils/Utilites";

const ServicesPage = () => {
  const { width } = useWindowDimensions();
  const { query } = useLocalSearchParams<{ query: string }>();

  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [queryList, setQueryList] = useState<string[]>([]);
  const [filterLocation, setFilterLocation] = useState<string>();
  const [filterSpecialty, setFilterSpecialty] = useState<string>();
  const [filterPrice, setFilterPrice] = useState<string>();
  const [doctors, setDoctors] = useState<DoctorList[]>([]);

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const padding = useMemo(() => width * 0.075, [width]);
  const snapPoints = useMemo(() => ["75%"], []);

  useEffect(() => {
    setQueryList(query ? query.split(",") : ["Dokter"]);
    setFilterLocation("TERDEKAT");
    setFilterSpecialty("ALL");
    setFilterPrice("KURANGDARI50K");
  }, [query]);

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

  const handlePresentModalPress = useCallback(() => {
    Keyboard.dismiss();
    bottomSheetRef.current?.present();
    setIsOpen(true);
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleQueryChange = (updatedQuery: string[]) => {
    setQueryList(updatedQuery);
  };

  const fetchDoctorData = async () => {
    if (!location) return;

    const token = await getToken("token");
    const body = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      speciality: filterSpecialty,
      harga: filterPrice,
      jarak: filterLocation,
    } as NearbyServicesRequest;

    console.log(body);

    const response = await getDoctorData(token!, body);

    if (response) {
      setDoctors(response.doctors);
    }
  };

  useEffect(() => {
    if (!location) return;

    fetchDoctorData();
  }, [location]);

  const handleFilter = async () => {
    bottomSheetRef.current?.dismiss();
    fetchDoctorData();
  };

  const backDrop: ViewStyle = {
    backgroundColor: Colors.backdrop,
  };

  return (
    <View style={[defaultStyles.pageContainer, isOpen && backDrop]}>
      <SearchBar
        style={{ marginTop: 100, marginBottom: 12 }}
        onPress={handlePresentModalPress}
      />

      <FlashList
        data={servicesList}
        extraData={queryList}
        renderItem={({ item }) => (
          <Filter
            name={item.name}
            image={item.image}
            query={queryList}
            onQueryChange={handleQueryChange}
            multi
          />
        )}
        keyExtractor={(item) => item.name}
        horizontal
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={6}
        ItemSeparatorComponent={() => <View style={{ width: 5 }} />}
        snapToStart={true}
        bounces={false}
        scrollEventThrottle={100}
        snapToOffsets={[0, 0.5, 1]}
        ListHeaderComponent={() => <View style={{ width: padding }} />}
        ListFooterComponent={() => <View style={{ width: padding }} />}
      />

      <Text style={styles.nearest}>Daftar Dokter</Text>
      <FlashList
        data={doctors}
        renderItem={({ item }) => <DoctorCard {...item} />}
        keyExtractor={(item) => item.name}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        estimatedItemSize={50}
      />

      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={0}
        onChange={handleSheetChanges}
        onDismiss={() => setIsOpen(false)}
        backgroundStyle={{ borderRadius: 24 }}
        animationConfigs={{ duration: 250 }}
      >
        <BottomSheetView style={styles.contentContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AntDesign
              name="close"
              size={24}
              color={Colors.black}
              style={{ alignSelf: "flex-start", marginHorizontal: 16 }}
              onPress={() => bottomSheetRef.current?.dismiss()}
            />
            <Text style={defaultStyles.textHeading2}>Filter</Text>
          </View>

          <View style={{ gap: 16, marginTop: 32 }}>
            <View>
              <Text style={styles.section}>Lokasi</Text>
              <Picker
                isEditable
                data={filterByLocation}
                value={filterLocation}
                placeholder="Pilih Jarak Lokasi"
                labelField="name"
                valueField="value"
                onChange={setFilterLocation}
              />
            </View>

            <View>
              <Text style={styles.section}>Spesialis</Text>
              <Picker
                isEditable
                data={filterBySpeciality}
                value={filterSpecialty}
                placeholder="Pilih Spesialis"
                labelField="name"
                valueField="value"
                onChange={setFilterSpecialty}
              />
            </View>

            <View>
              <Text style={styles.section}>Harga/Jam</Text>
              <Picker
                isEditable
                data={filterByPrice}
                value={filterPrice}
                placeholder="Pilih Rentang Harga"
                labelField="name"
                valueField="value"
                onChange={setFilterSpecialty}
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.5}
            onPress={handleFilter}
          >
            <Text style={styles.apply}>Terapkan</Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
};

export default ServicesPage;

const styles = StyleSheet.create({
  nearest: {
    ...defaultStyles.textSubHeading,
    fontSize: 18,
    marginTop: 20,
    marginLeft: "7.5%",
  },
  separator: {
    borderWidth: 0.5,
    borderColor: "rgba(134, 132, 132, 0.2)",
    width: "85%",
    alignSelf: "center",
  },
  contentContainer: {
    flex: 1,
  },
  section: {
    ...defaultStyles.textHeading2,
    fontSize: 18,
    marginBottom: 16,
    left: "7.5%",
  },
  button: {
    ...defaultStyles.button,
    backgroundColor: Colors.main,
    marginTop: 32,
    alignSelf: "center",
  },
  apply: {
    ...defaultStyles.textSubHeading,
    color: Colors.white,
    fontSize: 20,
  },
});
