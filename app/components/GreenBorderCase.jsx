import React from 'react';
import { View, Text } from 'react-native';

const GreenBorderCase = ({ initialWidth, initialHeight, thickness, children }) => {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <View
        style={{
          justifyContent:'center',
          alignItems:'center',
          height: initialHeight,
          width: initialWidth,
          backgroundColor: '#F6F4F4',
          borderRadius: 16,
          borderColor: "#58aa42",
          borderWidth: thickness, // Use the 'thickness' prop to set the border width
        }}
      >
        {children}
      </View>
    </View>
  );
};

export default GreenBorderCase;
