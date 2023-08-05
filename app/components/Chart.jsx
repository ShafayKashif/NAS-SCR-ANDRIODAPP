import React from "react";
import { View, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";

const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`, // Orange color with opacity
      strokeWidth: 2, // Optional, set the width of the lines
    },
  ],
};

const Chart = (props) => {
  return (
    <View style={styles.container}>
      <LineChart
        data={data}
        width={300}
        height={220}
        yAxisSuffix="K"
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Chart;
