import { View, StyleSheet, Image } from "react-native";
import DividerWithText from "../components/DividerText";
import ChoiceCards from "../components/ChoiceCards";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E3648",
    justifyContent: "center",
    alignItems: "center",
  },
});

const SignUpOption = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/img/Neubolt.png")}
        style={{
          // alignItems: "center",
          width: 300,
          height: 80,
          marginBottom: 30,
        }}
      />
      <DividerWithText
        textDisplay="What would you like to sign up as?"
        style={{ marginBottom: 20 }}
      />
        <ChoiceCards/>
    </View>
  );
};

export default SignUpOption;
