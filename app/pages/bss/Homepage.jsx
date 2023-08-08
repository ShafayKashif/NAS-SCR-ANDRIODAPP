import React from "react";
import { View, StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E3648",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  footer: {
    fontSize: 20,
    color: "white",
    marginTop: 20,
  },
});

const Homepage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Neubolt</Text>
      <Text style={styles.title}>Homepage</Text>
      <Text style={styles.footer}>Call our helpline:</Text>
    </View>
  );
};

export default Homepage;
