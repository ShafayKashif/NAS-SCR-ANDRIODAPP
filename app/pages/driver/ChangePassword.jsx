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
    margin: 20,
  },
});

const ChangePassword = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>
      <TextField label="Previous Password" />
      <TextField label="New Password" />
      <TextField label="Confirm New Password" />
      <LargeButton
        textDisplay="Change Password"
        backgroundColor="white"
        textColor="black"
        redirectTo="Notifications"
        props={{
          NotificationMessage: "Your password has been changed",
          ButtonMessage: "Go to HomePage",
          ButtonRedirect: "Homepage",
        }}
      />
      <Text style={styles.footer}>Call our helpline:</Text>
    </View>
  );
};

export default ChangePassword;
