import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text } from "react-native-paper";
import LightGreenCase from "../../components/LightGreenCase";
import Chart from "../../components/Chart";

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
   
  });
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 50, marginBottom: 30 }}>
        <LightGreenCase initialHeight={100} initialWidth={320}>
          <View>

          </View>
        </LightGreenCase>
      </View>
      <Text style={{color:"#58AA42", display:'flex', justifyContent:'center', alignItems:'center'}}>Monthly Analytics</Text>
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
