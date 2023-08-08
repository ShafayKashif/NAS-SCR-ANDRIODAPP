import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const preFormat = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43, 20, 45, 28, 80, 99, 43],
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`, // Set bars' color to green
  barPercentage: 0.3, // Adjust the width of bars
  decimalPlaces: 0, // Reduce the decimal to be shown for y-axis labels
};

const barChartOptions = {
  marginVertical: 1,
  fillShadowGradientOpacity: 1,
  yAxisInterval: 5, // Set the interval between y-axis labels (Decrease this value to take less space):
};

const graphStyle = {
  borderRadius: 16,
  backgroundColor: "white",
  marginVertical: 1
};

const border = {
  backgroundColor: "#58AA42",
  borderRadius: 16,
  marginVertical: 1,
  padding: 10, // Add some padding to the border
};

const Chart = ({ data }) => {
  const [combinedData, setCombinedData] = useState({ ...preFormat, ...data });

  // Update the combinedData whenever the data prop changes
  useEffect(() => {
    setCombinedData({ ...preFormat, ...data });
  }, [data]);

  return (
    <View style={{ flex: 1}}>
      <View style={border}>
        <View style={graphStyle}>
          <BarChart
            style={{ marginVertical: 16, borderRadius: 8 }}
            data={combinedData}
            width={300}
            height={300} // Increase the height of the chart to show labels properly
            verticalLabelRotation={270}
            chartConfig={chartConfig}
            {...barChartOptions}
          />
          {/* Custom Y-axis label */}
          <View style={{ position: 'absolute', left: -42, top: 150, transform: [{ rotate: '-90deg' }] }}>
            <Text style={{ fontWeight: "bold" }}>Number of Swaps</Text>
          </View>
          {/* Custom X-axis label */}
          <View style={{ position: 'absolute', left: 140, top: 290, }}>
            <Text style={{ fontWeight: "bold" }}>Months</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Chart;
