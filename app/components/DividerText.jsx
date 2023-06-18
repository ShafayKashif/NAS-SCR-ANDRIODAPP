import React from "react";
import { View } from "react-native";
import { Divider, Text } from "react-native-paper";

const DividerWithText = ({ textDisplay }) => {
  return (
    <View
      style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}
    >
      <Divider style={{ flex: 1 , height: 3, backgroundColor:"#D9D9D9"}} />
      <Text style={{ marginHorizontal: 10, fontWeight: "bold", color:  "#D9D9D9", fontSize:18}}>
        {textDisplay}
      </Text>
      <Divider style={{ flex: 1 , height: 3, backgroundColor:"#D9D9D9"}} />
    </View>
  );
};

export default DividerWithText;
