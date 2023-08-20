import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CircleButton = ({ icon, text, redirectTo, size = 60 }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (redirectTo) {
      navigation.navigate(redirectTo);
    }
  };

  const buttonSize = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <View style={[styles.circle, buttonSize]}>
        {icon ? (
          <FontAwesome5 name={icon} size={size * 0.4} color="black" />
        ) : null}
      </View>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
  },
  circle: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    marginTop: 10,
  },
});

export default CircleButton;
