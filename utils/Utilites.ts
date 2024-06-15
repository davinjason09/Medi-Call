import { getProfile } from "@/api/Services";
import * as SecureStore from "expo-secure-store";

export const formatDate = (date: Date | null) => {
  if (!date) return "";

  return `${String(date.getDate()).padStart(2, "0")}/${String(
    date.getMonth() + 1
  ).padStart(2, "0")}/${String(date.getFullYear())}`;
};

export const dateToISO = (date: Date | null) => {
  if (!date) return "";

  return date.toISOString();
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