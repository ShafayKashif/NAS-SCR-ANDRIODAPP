import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView, Image } from "react-native";
import DividerWithText from "../../components/DividerText";
import BatteryInformationCard from "../../components/BatteryInformationCard";
import { auth } from "../../config/firebase";
import { getRecordById, getRecord } from "../../global/firebaseFunctions";
import Loading from "../../components/Loading";
import { where } from "firebase/firestore";
import NavigatorBar from "../../components/NavigatorBar";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E3648",
    justifyContent: "center",
    alignItems: "center",
  },
});

const BatteryInformationDriver = ({ navigation }) => {
  const [error, setError] = useState("");
  const [info, setInfo] = useState(null);

  const fetchObtainedState = async () => {
    try {
      const obtained = await getRecord("Rickshaw Driver", [
        where("email", "==", auth.currentUser.email),
      ]);
      const obtainedState = await getRecordById("Rickshaw", obtained.assigned);
      setInfo(obtainedState);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchObtainedState();
  },[]);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchObtainedState();
    }, 30000); // 5 seconds in milliseconds
  });

  const dividertext = "Battery Information";

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSettingsPress = () => {
    navigation.navigate("SettingsDriver");
  };


  return info ? (
    <View style={styles.container}>
      <NavigatorBar
        onBackPress={handleBackPress}
        onSettingsPress={handleSettingsPress}
        showBackButton={true}
      />
      <DividerWithText textDisplay={dividertext} style={{ marginBottom: 20 }} />
      <ScrollView>
        <View>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {Object.keys(info.batterySlots).map((slotKey, index) => (
          <View style={{ marginTop: 20, marginLeft: 20, display: 'flex', justifyContent:'center', alignItems:'center' }} key={slotKey}>
            <BatteryInformationCard
              id={info.batterySlots[slotKey].batteryID}
              charge={info.batterySlots[slotKey].charge}
              health={info.batterySlots[slotKey].stateOfHealth} 
              temperature={info.batterySlots[slotKey].temperature}
              lastLabel={"Time Remaining: "}
              timeHours={info.batterySlots[slotKey].Time_Left.hours}
              timeMin={info.batterySlots[slotKey].Time_Left.remainingMinutes}
            />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  ) : (
    <Loading />
  );
};

export default BatteryInformationDriver;
