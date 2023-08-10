import React, { useState, useEffect } from "react";
import { getRecord, getRecordById } from "../../global/firebaseFunctions";
import { Text, StyleSheet, View } from "react-native";
import { where } from "firebase/firestore";
import { auth } from "../../config/firebase";
import Loading from "../../components/Loading";
import { Link } from "@react-navigation/native";
import BatteryComponent from "../../components/BatteryComponent";
import GreenBorderCase from "../../components/GreenBorderCase";
import NavigatorBar from "../../components/NavigatorBar";
import NavDriver from "../temporary/NavDriver";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E3648",
    justifyContent: "center",
    alignItems: "center",
  },
});

const DriverDashboard = ({ navigation }) => {
  const [driverInfo, setDriverInfo] = useState(null);
  const [rate, setRate] = useState("");

  const handleSettingsPress = () => {
    navigation.navigate("SettingsDriver");
  };

  const fetchObtainedState = async () => {
    try {
      const obtainedRickshaw = await getRecord("Rickshaw Driver", [
        where("email", "==", auth.currentUser.email),
      ]);
      const obtainedState = await getRecordById(
        "Rickshaw",
        obtainedRickshaw.assigned
      );
      setDriverInfo(obtainedState);
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

  return (
    <View style={styles.container}>
      <NavigatorBar
        onSettingsPress={handleSettingsPress}
        showBackButton={false}
      />
      {driverInfo ? (
        <View>
          <NavDriver/>
          <Text style={{ color: "#FFFFFF" }}>Rickshaw Driver Dashboard</Text>
        
          <GreenBorderCase
                    initialWidth={270}
                    initialHeight={270}
                    thickness={7}
                  >
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {Object.keys(driverInfo.batterySlots).map((slotKey, index) => {
              return (
            
                <View style={{ width: "50%", padding: 10 }} key={slotKey}>

                  <BatteryComponent
                    charge={driverInfo.batterySlots[slotKey].charge}
                    batteryNumber={slotKey}
                    timeHoursLeft={
                      driverInfo.batterySlots[slotKey].Time_Left.hours??0
                    }
                    timeMinutesLeft={
                      driverInfo.batterySlots[slotKey].Time_Left.remainingMinutes??0
                    }
                  />
                </View>
               
              );
            })}
          </View>
          <Link
          to="/BatteryInformationDriver"
          style={{ color: "#58AA42", fontWeight: "bold", fontSize:16, textDecorationLine:'underline' }}
        >
          View Details
        </Link>

          </GreenBorderCase>
        </View>
      ) : (
        <Loading />
      )}
    </View>
  );
};

export default DriverDashboard;
