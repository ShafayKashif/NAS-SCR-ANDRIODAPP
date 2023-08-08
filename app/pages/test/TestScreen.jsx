import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Assuming you have FontAwesome or a similar icon library
import GreenBorderCase from '../../components/GreenBorderCase';

const TestCarousel = () => {
  const [showFirst, setShowFirst] = useState(true);

  const handlePrev = () => {
    setShowFirst(true);
  };

  const handleNext = () => {
    setShowFirst(false);
  };

  return (
    <View style={stylecontainer.container}>
      <View style={stylecontainer.carouselContainer}>
        <TouchableOpacity onPress={handlePrev} style={stylecontainer.arrowButton}>
          <FontAwesome name="chevron-left" size={24} color="#58AA42" />
        </TouchableOpacity>
        {showFirst ? (
          <GreenBorderCase
            initialWidth={270}
            initialHeight={500}
            thickness={10}
          >
            <View style={stylecontainer.carouselItem}>
              {/* Your content for the first GreenBorderCase */}
              <Text>Pg 1</Text>
            </View>
          </GreenBorderCase>
        ) : (
          <GreenBorderCase
            initialWidth={270}
            initialHeight={500}
            thickness={10}
          >
            <View style={stylecontainer.carouselItem}>
              {/* Your content for the second GreenBorderCase */}
              <Text>Pg 2</Text>
            </View>
          </GreenBorderCase>
        )}
        <TouchableOpacity onPress={handleNext} style={stylecontainer.arrowButton}>
          <FontAwesome name="chevron-right" size={24} color="#58AA42" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const stylecontainer = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowButton: {
    padding: 10,
  },
  carouselItem: {
    borderRadius: 8,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TestCarousel;
