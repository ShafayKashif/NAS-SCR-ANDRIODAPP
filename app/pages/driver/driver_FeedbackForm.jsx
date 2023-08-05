import React from "react";
import { View, StyleSheet, Text } from "react-native";
import LargeButton from "../components/LargeButton";
import TextField from "../components/TextField";
import Dropdown from "../components/Dropdown";
import StarRating from "../components/StarRating";

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

const driver_FeedbackForm = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>BSS Feedback Form</Text>
      <Dropdown
        label="BSS Station"
        options={["Station 1", "Station 2", "Station 3"]}
      />
      <Dropdown
        label="Date/Time of visit"
        options={["Date/Time 1", "Date/Time 2", "Date/Time 3"]}
      />
      <StarRating />
      <TextField label="Comments" />
      <LargeButton
        textDisplay="Submit Feedback"
        backgroundColor="white"
        textColor="black"
        redirectTo="Notifications"
        navigationParams={{
          NotificationMessage: "Your feedback has been submitted",
          ButtonMessage: "Go to HomePage",
          ButtonRedirect: "driver_Homepage",
        }}
      />
      <Text style={styles.footer}>Call our helpline:</Text>
    </View>
  );
};

export default driver_FeedbackForm;
