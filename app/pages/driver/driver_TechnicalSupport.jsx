import React from "react";
import { View, StyleSheet, Text } from "react-native";
import LargeButton from "../components/LargeButton";
import TextField from "../components/TextField";
import Dropdown from "../components/Dropdown";

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
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  footer: {
    fontSize: 20,
    color: "white",
    margin: 20,
  },
});

const driver_TechnicalSupport = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Technical Support</Text>
      <Dropdown
        label="Problem Type"
        options={["Problem 1", "Problem 2", "Problem 3"]}
      />
      <TextField label="Type your problems here . . . " />
      <LargeButton
        textDisplay="Report Problem"
        backgroundColor="white"
        textColor="black"
        redirectTo="Notifications"
        props={{
          NotificationMessage: "Your problem has been reported",
          ButtonMessage: "Go to HomePage",
          ButtonRedirect: "driver_Homepage",
        }}
      />
      <Text style={styles.footer}>Call our helpline:</Text>
    </View>
  );
};

export default driver_TechnicalSupport;
