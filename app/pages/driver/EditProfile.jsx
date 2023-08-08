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

const EditProfile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      <TextField label="Email" />
      <TextField label="Full Name" />
      <TextField label="Phone Number" />
      <TextField label="CNIC" />
      <LargeButton
        textDisplay="Update Profile"
        backgroundColor="white"
        textColor="black"
        redirectTo="Notifications"
        props={{
          NotificationMessage: "Your profile has been updated",
          ButtonMessage: "Go to HomePage",
          ButtonRedirect: "Homepage",
        }}
      />
      <Text style={styles.footer}>Call our helpline:</Text>
    </View>
  );
};

export default EditProfile;
