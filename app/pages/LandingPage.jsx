import {
  View,
  StyleSheet,
  Image,
} from "react-native";
import LargeButton from "../components/LargeButton";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E3648",
    justifyContent: "center",
    alignItems: "center",
  },
});

const LandingPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/img/Neubolt.png")}
        style={{
          alignItems: "center",
          width: 300,
          height: 80,
          marginBottom:150,
        }}
      />

      <LargeButton
        textDisplay="Login"
        backgroundColor="#58AA42"
        textColor="#FFFFFF"
        redirectTo="SignIn"
      />

      <LargeButton
        textDisplay="Sign Up"
        backgroundColor="#F6F4F4"
        textColor="#000000"
        redirectTo="SignUpOption"
      />

      <LargeButton
        textDisplay="Test Button"
        backgroundColor="#F6F4F4"
        textColor="#000000"
        redirectTo="DriverDashboard"
      />

    </View>
  );
};

export default LandingPage;
