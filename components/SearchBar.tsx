import {
  View,
  StyleSheet,
  TextInput,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";

import Colors from "@/constants/Colors";

import { defaultStyles } from "@/constants/Styles";

interface SearchBarProps {
  style?: ViewStyle;
  isEditable?: boolean;
  onPress?: () => void;
}

const SearchBar = (props: SearchBarProps) => {
  const { style, onPress } = props;

  return (
    <View style={[styles.container, style]}>
      <FontAwesome6 name="magnifying-glass" size={20} color={Colors.main} />
      <TextInput
        style={styles.textInput}
        placeholder="Cari dokter, perawat, layanan lainnya"
        selectionColor={Colors.main}
        editable={props.isEditable}
      />
      <TouchableOpacity
        style={styles.filter}
        onPress={onPress}
        activeOpacity={0.5}
      >
        <FontAwesome6 name="sliders" size={16} color={Colors.main} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "85%",
    height: 36,
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: Colors.accent,
    marginTop: 10,
    paddingHorizontal: 15,
  },
  textInput: {
    ...defaultStyles.textExtraLight,
    flex: 1,
    paddingHorizontal: 10,
    color: Colors.black,
  },
  filter: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SearchBar;
