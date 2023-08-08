import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text } from "react-native-paper";
import LargeButton from "../components/LargeButton";
import TextField from "../components/TextField";
import Checkbox from "../components/Checkbox";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { where } from "firebase/firestore";
import { getRecord} from "../global/firebaseFunctions";
import { Link } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E3648",
    justifyContent: "center",
    alignItems: "center",
  },
});



const SignIn = ({ navigation }) => {
  const navigate = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");


  const handleSubmit = async () => {
    try {
      // Create a new user with email and password using Firebase
      await signInWithEmailAndPassword(auth, email, password);
  
      const querypassed = [where("email", "==", email)];

      // Use await here to get the result from the getRecord function
      const result = await getRecord("Details User", querypassed);

      console.log(result);
      if (result) {
        if (result.designation === "BSS Officer") {
          // Use navigation instead of navigate here
          navigate.navigate("StationDashboard");
        } else if (result.designation === "Rickshaw Driver") {
          // Use navigation instead of navigate here
          navigate.navigate("DriverDashboard");
        } else {
          throw new Error("User not found");
        }

        // User login successful
        console.log("User logged in successfully!");
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      // Error occurred during user login
      console.log("Error logging in", error.message);
      setErrorMsg("Error " + error.message);
    }
  };

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

      <TextField label="Email" value={email} onChange={setEmail} />
      <TextField label="Password" value={password} onChange={setPassword} />

      <LargeButton
        textDisplay="Sign In"
        backgroundColor="white"
        textColor="black"
        onPressFunction={handleSubmit}
      />

      <Text style={{ color: "red" }}>{errorMsg}</Text>

      <View style={{ marginStart: 0, width: "100%" }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            margin: 20,
            alignContent: "flex-start",
          }}
        >
          <Checkbox />
          <Text style={{ color: "#FFFFFF" }}>Remember Me</Text>
        </View>
      </View>

      <Text style={{ color: "#FFFFFF" }}>
        Don't have an account?{" "}
        <Link
          to="/SignUpOption"
          style={{ color: "#58AA42", fontWeight: "bold" }}
        >
          Sign Up
        </Link>
      </Text>
    </View>
  );
};

export default SignIn;
