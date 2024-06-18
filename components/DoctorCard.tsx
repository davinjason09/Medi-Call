import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import * as Location from "expo-location";

import Colors from "@/constants/Colors";

import { calculateDistance } from "@/utils/Utilites";
import { defaultStyles } from "@/constants/Styles";
import { DoctorList } from "@/constants/Interfaces";

const DoctorCard = (props: DoctorList) => {
  const formatBill = new Intl.NumberFormat("id-ID").format(props.pricePerHour);

  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        console.log(errorMsg);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const distance = calculateDistance(
    location?.coords.latitude!,
    location?.coords.longitude!,
    props.locLatitude,
    props.locLongitude
  ).toFixed(2);

  return (
    <View style={styles.container}>
      <Image source={{ uri: props.profilePic }} style={styles.image} />
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-around",
          marginLeft: 16,
        }}
      >
        <View>
          <Text style={styles.name}>{props.name}</Text>
          <Text style={styles.title}>{props.speciality}</Text>
          <Text style={styles.title}>{`${distance} km`}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.bill}>{`Rp ${formatBill}/Jam`}</Text>

          <TouchableOpacity style={styles.button}>
            <Text style={{ ...defaultStyles.textBody, color: Colors.white }}>
              Pesan
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DoctorCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 100,
    width: "85%",
    justifyContent: "flex-start",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 8,
  },
  image: {
    width: 69,
    height: 92,
    resizeMode: "contain",
  },
  name: {
    ...defaultStyles.textSubHeading,
  },
  title: {
    ...defaultStyles.textBody,
    fontSize: 8,
  },
  bill: {
    ...defaultStyles.textSubHeading,
    fontSize: 12,
  },
  button: {
    width: 64,
    height: 20,
    borderRadius: 4,
    backgroundColor: Colors.main,
    justifyContent: "center",
    alignItems: "center",
  },
});
