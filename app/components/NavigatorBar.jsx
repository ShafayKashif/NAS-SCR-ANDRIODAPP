import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const NavigatorBar = ({ onBackPress, onSettingsPress, showBackButton }) => {
  return (
    <View style={styles.container}>
      {showBackButton && (
        <TouchableOpacity onPress={onBackPress} style={styles.leftButton}>
          <Text style={styles.whiteText}>❮</Text>
        </TouchableOpacity>
      )}
      <View style={styles.titleContainer}>
        <Text style={styles.greenText}>NeuBolt</Text>
      </View>
      <TouchableOpacity onPress={onSettingsPress} style={styles.rightButton}>
        <Text style={styles.whiteText}>⋯</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#1E3647", // background color
  },
  leftButton: {
    padding: 10,
  },
  rightButton: {
    padding: 10,
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  whiteText: {
    color: "#FFFFFF", // white color
    fontSize: 20,
  },
  greenText: {
    color: "#58AA42", //  green color
  },
});

export default NavigatorBar;
