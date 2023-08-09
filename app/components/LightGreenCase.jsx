import React from 'react';
import { View } from 'react-native';

const LightGreenCase = ({ initialWidth, initialHeight, children }) => {
  return (
      <View
        style={{
          paddingTop:20,
          justifyContent:'flex-start',
          paddingLeft: 20,
          // alignItems:'center',
          height: initialHeight,
          width: initialWidth,
          backgroundColor: '#e1f0dc',
          borderRadius: 16,
        }}
      >
        {children}
      </View>
  );
};

export default LightGreenCase;
