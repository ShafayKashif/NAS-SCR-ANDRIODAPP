import {
  View,
  StyleSheet,
  Image,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E3648",
    justifyContent: "center",
    alignItems: "center",
  },
});

const Loading = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/img/Neubolt.png")}
        style={{
          alignItems: "center",
          width: 300,
          height: 80,
          marginBottom: 30,
        }}
      />
      <ActivityIndicator animating={true} color="#58AA42" size="large" />
    </View>
  );
};

export default Loading;
