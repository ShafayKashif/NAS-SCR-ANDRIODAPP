import React, { useState } from "react";
import { View, StyleSheet, Image} from "react-native";
import { Text } from "react-native-paper";
import LargeButton from "../components/LargeButton";
import { useRoute } from "@react-navigation/native";
import DividerWithText from "../components/DividerText";
import TextField from "../components/TextField";
import Checkbox from "../components/Checkbox"
import Link from "../components/Hyperlink";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E3648",
    justifyContent: "center",
    alignItems: "center",
  },
});

const SignIn = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/img/Neubolt.png")}
        style={{
          width: 300,
          height: 80,
          marginBottom: 50,
        }}
      />

      <TextField label="Username" />
      <TextField label="Password" />

      <LargeButton
        textDisplay="Sign In"
        backgroundColor="white"
        textColor="black"
        redirectTo="Loading"
      />
      
      <View style={{marginStart:0, width: '100%'}}>
        <View style={{ display: 'flex', flexDirection: "row", margin:20, alignContent:'flex-start' }}>
          <Checkbox/>
          <Text style={{ color: "#FFFFFF"}}>Remember Me</Text>
        </View>
      </View>

      <Text style={{color:"#FFFFFF"}}>Don't have an account? Sign Up</Text>
    </View>
  );
};

export default SignIn;
