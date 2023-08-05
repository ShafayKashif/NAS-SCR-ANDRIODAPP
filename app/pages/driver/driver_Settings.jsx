import React from "react";
import { View, StyleSheet, Text } from "react-native";
import LargeButton from "../components/LargeButton";
import SmallButton from "../components/SmallButton";

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

const driver_Settings = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <SmallButton
        textDisplay="Edit Profile Information"
        backgroundColor="white"
        textColor="black"
        redirectTo="driver_EditProfile"
      />
      <SmallButton
        textDisplay="Change Password"
        backgroundColor="white"
        textColor="black"
        redirectTo="driver_ChangePassword" //
      />
      <SmallButton
        textDisplay="Package"
        backgroundColor="white"
        textColor="black"
        redirectTo="Package" //
      />
      <LargeButton
        textDisplay="Log Out"
        backgroundColor="white"
        textColor="black"
        redirectTo="SignIn"
      />
      <Text style={styles.footer}>Call our helpline:</Text>
    </View>
  );
};

export default driver_Settings;
