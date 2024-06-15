import { StyleSheet } from "react-native";
import Colors from "./Colors";

export const defaultStyles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  button: {
    width: "57.5%",
    height: 45,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 4,
  },
  textHeading1: {
    fontSize: 24,
    fontFamily: "Inter",
    fontWeight: "bold",
  },
  textHeading2: {
    fontSize: 20,
    fontFamily: "Inter",
    fontWeight: "semibold",
  },
  textSubHeading: {
    fontSize: 16,
    fontFamily: "Inter",
    fontWeight: "medium",
  },
  textBody: {
    fontSize: 14,
    fontFamily: "Inter",
    fontWeight: "regular",
  },
  textBodyBold: {
    fontSize: 14,
    fontFamily: "Inter",
    fontWeight: "bold",
  },
  textLight: {
    fontSize: 12,
    fontFamily: "Inter",
    fontWeight: "light",
  },
  textExtraLight: {
    fontSize: 12,
    fontFamily: "Inter",
    fontWeight: "ultralight",
  }
})