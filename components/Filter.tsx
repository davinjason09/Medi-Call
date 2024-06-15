import { StyleSheet, Image, View } from "react-native";
import { useFocusEffect } from "expo-router";
import { useState } from "react";
import { Chip } from "react-native-paper";

import Colors from "@/constants/Colors";

import { defaultStyles } from "@/constants/Styles";

interface FilterProps {
  query: string[];
  name: string;
  image?: any;
  value?: string;
  onQueryChange: (updatedQuery: string[]) => void;
  multi?: boolean;
}

const Filter = (props: FilterProps) => {
  const [selected, setSelected] = useState(false);

  const textColor = selected ? Colors.accent : Colors.main;
  const bgColor = selected ? Colors.main : Colors.accent;

  useFocusEffect(() => {
    if (props.multi) {
      setSelected(props.query.includes(props.name));
    } else {
      setSelected(props.query.join("") === props.value);
    }
  });

  const handlePress = () => {
    if (props.multi) {
      const updatedQuery = [...props.query];
      if (selected) {
        const index = updatedQuery.indexOf(props.name);
        if (index !== -1) {
          updatedQuery.splice(index, 1);
        }
      } else {
        updatedQuery.push(props.name);
      }
      setSelected(!selected);
      props.onQueryChange(updatedQuery);
    } else {
      props.onQueryChange([props.value!]);
    }
  };

  return (
    <Chip
      style={[styles.container, { backgroundColor: bgColor }]}
      textStyle={[styles.text, { color: textColor }]}
      selected={selected}
      showSelectedCheck={false}
      avatar={
        props.image && (
          <View style={styles.avatarContainer}>
            <Image source={props.image} style={styles.avatar} />
          </View>
        )
      }
      onPress={handlePress}
    >
      {props.name}
    </Chip>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    height: 30,
    borderRadius: 15,
    paddingLeft: 5,
    paddingRight: 2,
  },
  text: {
    ...defaultStyles.textHeading2,
    fontSize: 12,
    textAlign: "center",
  },
  avatarContainer: {
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.accent,
  },
  avatar: {
    width: 13,
    height: 13,
    resizeMode: "contain",
  },
});
