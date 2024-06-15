import { DimensionValue, StyleSheet } from "react-native";
import React from "react";
import { Dropdown } from "react-native-element-dropdown";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";

interface PickerProps {
  value: any;
  data: any[];
  isEditable?: boolean;
  placeholder?: string;
  labelField: string;
  valueField: string;
  containerWidth?: DimensionValue;
  onChange: (item: any) => void;
}

const Picker: React.FC<PickerProps> = ({
  value,
  data,
  isEditable,
  placeholder,
  labelField,
  valueField,
  containerWidth = "85%",
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
      disable={!isEditable}
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
