import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text } from "react-native-paper";
import LightGreenCase from "../../components/LightGreenCase";
import Chart from "../../components/Chart";
import BatteryInformationCard from "../../components/BatteryInformationCard";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E3648",
    justifyContent: "center",
    alignItems: "center",
  },
});

const StationPerformance = ({ navigation }) => {
  const [charge, setCharge] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCharge(charge + 1);
    }, 1000);
  });
  return (
    <View style={styles.container}>
        <View>
            <BatteryInformationCard id={1} charge={charge} health={50} temperature={50} timeToFullCharge={43} lastLabel={'Time to Full Charge'}  timeHours={3} timeMin={3}/>
        </View>
       
      <View style={{ marginTop: 50, marginBottom: 30 }}>
        <LightGreenCase initialHeight={100} initialWidth={320}>
          <Text>Hi</Text>
        </LightGreenCase>
      </View>
      <Chart
        data={{
          datasets: [
            {
              data: [100, 45, 28, 80, 99, 43, 20, 45, 28, 80, 99, 43],
            },
          ],
        }}
      />
    </View>
  );
};

export default StationPerformance;
