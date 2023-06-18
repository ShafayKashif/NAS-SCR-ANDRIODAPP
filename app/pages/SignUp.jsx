import { View, StyleSheet, Image } from "react-native";
import LargeButton from "../components/LargeButton";
import { useRoute } from "@react-navigation/native";
import DividerWithText from "../components/DividerText";
import TextField from "../components/TextField";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E3648",
    justifyContent: "center",
    alignItems: "center",
  },
});

const SignUp = ({ navigation }) => {
  const route = useRoute();
  const propData = route.params;
  const dividertext = "Sign up as a " + propData.person;

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/img/Neubolt.png")}
        style={{
          width: 300,
          height: 80,
          marginBottom: 20,
        }}
      />
      <DividerWithText textDisplay={dividertext} style={{ marginBottom: 20 }} />
      <TextField label="Username" />
      <TextField label="Password" />
      <TextField label="Confirm Password" />
      <TextField label="Email Address" />
      <TextField label="Phone Number" />
      <TextField label="CNIC" />

      <LargeButton
        textDisplay="Sign Up"
        backgroundColor="white"
        textColor="black"
        redirectTo="Loading"
      />
    </View>
  );
};

export default SignUp;
