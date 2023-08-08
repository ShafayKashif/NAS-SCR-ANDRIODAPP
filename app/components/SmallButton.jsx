import React from "react";
import { Text } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const SmallButton = ({
  backgroundColor,
  textColor,
  redirectTo,
  textDisplay,
  props,
  onPressFunction, // Additional function to execute (optional)
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
  
    if (onPressFunction && typeof onPressFunction === "function") {
      onPressFunction(); // Execute the additional function if provided and it's a function
    }
    if (redirectTo && !props){
      navigation.navigate(redirectTo);
    }
    else if (redirectTo && props){
      navigation.navigate(redirectTo, props);
    }


}; 

  return (
    <Button
      mode="contained"
      onPress={handlePress}
      style={{
        backgroundColor,
        width: 220,
        marginTop: 20,
        height: 52,
        borderRadius: 12,
      }}
      contentStyle={{
        height: "100%",
      }}
      labelStyle={{ color: textColor }}
      theme={{
        roundness: 0,
        animation: {
          scale: 0.001,
        },
      }}
    >
      <Text style={{ fontSize: 20 }}>{textDisplay}</Text>
    </Button>
  );
};

export default SmallButton;
