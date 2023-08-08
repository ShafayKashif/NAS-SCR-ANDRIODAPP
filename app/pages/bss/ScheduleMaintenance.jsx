import React from "react";
import { View, StyleSheet, Text } from "react-native";
import LargeButton from "../components/LargeButton";
import TextField from "../components/TextField";

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

const Maintenance = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>BSS Maintenance</Text>
      <TextField label="Email Address" />
      <TextField label="Phone Number" />
      <TextField label="CNIC" />
      <TextField label="Date" />
      <TextField label="Time" />
      <LargeButton
        textDisplay="Schedule Maintenance"
        backgroundColor="white"
        textColor="black"
        redirectTo="Notifications"
        props={{
          NotificationMessage: "Maintenance has been scheduled",
          ButtonMessage: "Go to HomePage",
          ButtonRedirect: "Homepage",
        }}
      />
      <Text style={styles.footer}>Call our helpline:</Text>
    </View>
  );
};

export default Maintenance;
