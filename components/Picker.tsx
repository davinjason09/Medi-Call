import { DimensionValue, StyleSheet } from "react-native";
import React from "react";
import { Dropdown } from "react-native-element-dropdown";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";

interface PickerProps {
  containerWidth?: DimensionValue;
  placeholder?: string;
  data: any[];
  labelField: string;
  valueField: string;
  value: any;
  onChange: (item: any) => void;
}

const Picker: React.FC<PickerProps> = ({
  containerWidth = "85%",
  placeholder,
  data,
  labelField,
  valueField,
  value,
  onChange,
}) => {
  return (
    <Dropdown
      style={[styles.dropdown, { width: containerWidth }]}
      placeholder={placeholder}
      placeholderStyle={defaultStyles.textBody}
      selectedTextStyle={defaultStyles.textBody}
      containerStyle={styles.container}
      itemContainerStyle={{ borderRadius: 13 }}
      itemTextStyle={defaultStyles.textBody}
      data={data}
      labelField={labelField}
      valueField={valueField}
      value={value}
      onChange={(item) => onChange(item.value)}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  dropdown: {
    width: "85%",
    backgroundColor: Colors.accent,
    height: 45,
    borderRadius: 13,
    paddingHorizontal: 12,
    alignSelf: "center",
  },
  container: {
    backgroundColor: Colors.white,
    borderRadius: 13,
  },
});

export default Picker;
