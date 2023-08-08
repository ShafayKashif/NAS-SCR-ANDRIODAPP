// TODO: Complete formatting in center and with 
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView, Image } from "react-native";
import DividerWithText from "../../components/DividerText";
import BatteryInformationCard from "../../components/BatteryInformationCard";
import { auth } from "../../config/firebase";
import { getRecordById, getRecord } from "../../global/firebaseFunctions";
import Loading from "../../components/Loading";
import { where } from "firebase/firestore";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E3648",
    justifyContent: "center",
    alignItems: "center",
  },
});

const BatteryInformationStation = () => {
  const [error, setError] = useState("");
  const [info, setInfo] = useState(null);

  const fetchObtainedState = async () => {
    try {
      console.log(auth)
      const obtained = await getRecord("Bss Officer", [
        where("email", "==", auth.currentUser.email),
      ]);
      const obtainedState = await getRecordById("Station", obtained.station);
      setInfo(obtainedState);
    } catch (err) {
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchObtainedState();
    }, 2000); // 5 seconds in milliseconds

  });

  const dividertext = "Battery Information";

  return info ? (
    <View style={styles.container}>
          <Image
        source={require("../assets/img/Neubolt.png")}
        style={{
          width: 300,
          height: 80,
          marginBottom: 20,
          marginTop:40,
          justifyContent: 'center',
          alignItems:'center',
        }}
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
              lastLabel={"Time till complete charged"}
              timeHours={info.batterySlots[slotKey].timeToFullCharge}
              timeMin={0}
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

export default BatteryInformationStation;

