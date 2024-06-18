import * as SecureStore from "expo-secure-store";
import * as Location from "expo-location";

import { DoctorList } from "@/constants/Interfaces";
import { getProfile } from "@/api/Services";

export const formatDate = (date: Date | null) => {
  if (!date) return "";

  return `${String(date.getDate()).padStart(2, "0")}/${String(
    date.getMonth() + 1
  ).padStart(2, "0")}/${String(date.getFullYear())}`;
};

export const dateToISO = (date: Date | null) => {
  if (!date) return "";

  return date.toISOString().split("T")[0];
};

export const saveToken = async (key: string, value: string) => {
  try {
    return await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.log(error);
  }
}

export const getToken = async (key: string) => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log(error);
  }
}

export const removeToken = async (key: string) => {
  try {
    return await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log(error);
  }
}

export const fetchProfile = async (token: string) => {
  if (token) {
    getProfile(token)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const toRadians = (degrees: number) => degrees * (Math.PI / 180);

  const R = 6371;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
    Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

export const sortDoctors = (
  doctors: DoctorList[],
  location: Location.LocationObject | null
) => {
  if (location) {
    doctors.sort((a, b) => {
      const distanceA = calculateDistance(
        location.coords.latitude,
        location.coords.longitude,
        a.locLatitude,
        a.locLongitude
      );
      const distanceB = calculateDistance(
        location.coords.latitude,
        location.coords.longitude,
        b.locLatitude,
        b.locLongitude
      );

      return distanceA - distanceB;
    });
  }

  return doctors;
}