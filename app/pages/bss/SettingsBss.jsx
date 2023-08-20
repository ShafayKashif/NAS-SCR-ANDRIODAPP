import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import LargeButton from "../../components/LargeButton";
import SmallButton from "../../components/SmallButton";
import { useRoute } from "@react-navigation/native";
import DividerWithText from "../../components/DividerText";
import TextField from "../../components/TextField";
import { auth } from "../../config/firebase";
import NavigatorBar from "../../components/NavigatorBar";

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

const SettingsBss = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log("User logged out successfully!");
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSettingsPress = () => {
    navigation.navigate("SettingsBss");
  };

  return (
    <View style={styles.container}>
      <NavigatorBar
        onBackPress={handleBackPress}
        onSettingsPress={handleSettingsPress}
        showBackButton={true}
      />
      <DividerWithText textDisplay={"Settings"} style={{ marginBottom: 20 }} />
      <SmallButton
        textDisplay="Edit Profile Information"
        backgroundColor="white"
        textColor="black"
        redirectTo="EditProfile"
      />
      <SmallButton
        textDisplay="Change Password"
        backgroundColor="white"
        textColor="black"
        redirectTo="ChangePassword"
      />
      <LargeButton
        textDisplay="Log Out"
        backgroundColor="#58AA42"
        textColor="white"
        redirectTo="SignIn"
        onPressFunction={handleLogout}
      />
    </View>
  );
};

export default SettingsBss;
