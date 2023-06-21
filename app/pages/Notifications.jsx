import {
    View,
    StyleSheet,
    Image,
    Text
  } from "react-native";
  import LargeButton from "../components/LargeButton";
  import { useRoute } from "@react-navigation/native";
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#1E3648",
      justifyContent: "center",
      alignItems: "center",
    },
  });
  
  const Notifications = () => {
    const route = useRoute();
    const propData = route.params;

    return (
      <View style={styles.container}>
        <Image
          source={require("../assets/img/Neubolt.png")}
          style={{
            alignItems: "center",
            width: 300,
            height: 80,
            marginBottom:30,
          }}
        />
        <Text style={{color: "#FFFFFF", marginHorizontal:25}}>{propData.NotificationMessage}</Text>
        <LargeButton
            backgroundColor="#58AA42"
            textColor="#FFFFFF"
            redirectTo={propData.ButtonRedirect}
            textDisplay={propData.ButtonMessage}
        />
  
      </View>
    );
  };
  
  export default Notifications;
  