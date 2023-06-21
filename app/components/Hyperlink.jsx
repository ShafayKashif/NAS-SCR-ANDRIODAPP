import React from 'react';
import { Linking } from 'react-native';
import { Text } from 'react-native-paper';

const Link = ({ url, text, color }) => {
  const handlePress = async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    }
  };

  return (
    <Text style={[{ color: {color}, textDecorationLine: 'underline' } ]} onPress={handlePress}>
      {text}
    </Text>
  );
};

export default Link;