import React from "react";
import { Text } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const LargeButton = ({
  backgroundColor,
  textColor,
  redirectTo,
  textDisplay,
  props,
  onPressFunction, // Additional function to execute
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
        width: '85%',
        marginTop: 20,
        height: 52,
        borderRadius: 9,
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

export default LargeButton;

// <LargeButton
// backgroundColor="#007AFF"
// textColor="#FFFFFF"
// redirectTo="ScreenToNavigateTo"
// textDisplay="Click Me!"
// props={/* Your additional props for the screen to navigate to */}
// onPressFunction={myAdditionalFunction} // Pass the additional function
// /> 