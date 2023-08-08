import React from 'react';
import { View, Text } from 'react-native';
import BatteryDisplay from './BatteryDisplay';

const BatteryWithCharge = ({ charge }) => {
  return (
    <View style={{ display: 'flex', alignItems: 'center' }}>
      <BatteryDisplay charge={charge}/>
      <Text style={{marginTop:5, fontSize:16, fontWeight: 'bold'}}>{charge}%</Text>
    </View>
  );
};

export default BatteryWithCharge;
