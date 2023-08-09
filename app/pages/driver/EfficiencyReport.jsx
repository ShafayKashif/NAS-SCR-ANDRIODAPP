import React, { useState } from "react";
import { View, Text } from "react-native";
import NavigatorBar from "../../components/NavigatorBar";
import { GreenBorderCase } from "../../components/GreenBorderCase";
import { getRecord, getRecordById } from "../../global/firebaseFunctions";

const EfficiencyReport = () => {
  const [rickshaw, setRickshawInfo] = useState(null);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSettingsPress = () => {
    navigation.navigate("SettingsDriver");
  };

  const fetchObtainedState = async () => {
    try {
      const obtainedOfficer = await getRecord("Rickshaw Driver", [
        where("email", "==", auth.currentUser.email),
      ]);
      const obtainedState = await getRecordById(
        "Rickshaw",
        obtainedOfficer.station
      );
      setStationInfo(obtainedState);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      <NavigatorBar
        onBackPress={handleBackPress}
        onSettingsPress={handleSettingsPress}
        showBackButton={true}
      />
      <Text>Efficiency Report</Text>
    </View>
  );
};

export default EfficiencyReport;
