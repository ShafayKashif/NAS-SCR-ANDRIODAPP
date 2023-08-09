import React from "react";
import { View, Text } from "react-native";
import NavigatorBar from "../../components/NavigatorBar";

const PackagePage = ({ navigation }) => {
  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSettingsPress = () => {
    navigation.navigate("SettingsDriver"); //
  };

  return (
    <View>
      <NavigatorBar
        onBackPress={handleBackPress}
        onSettingsPress={handleSettingsPress}
        showBackButton={true}
      />
      <Text>Package</Text>
    </View>
  );
};

export default PackagePage;
