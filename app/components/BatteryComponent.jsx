import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import BatteryDisplay from './BatteryDisplay';

const BatteryComponent = ({ batteryNumber, charge, timeHoursLeft, timeMinutesLeft }) => {
  return (
    <View style={{ display: 'flex', alignItems: 'center' }}>
      <Text style={{marginRight:1}}>{batteryNumber}</Text>
      <BatteryDisplay charge={charge}/>
      <Text style={{marginTop:1, fontSize:16}}>{charge}%</Text>
      <Text style={{marginRight:3, fontSize:12}}>{timeHoursLeft}h {timeMinutesLeft}m</Text>
    </View>
  );
};

export default BatteryComponent;
