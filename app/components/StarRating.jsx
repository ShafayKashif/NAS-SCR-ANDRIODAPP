import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const StarRating = ({ label, onChange }) => {
  const [rating, setRating] = useState(0);

  const handleStarPress = (selectedRating) => {
    setRating(selectedRating);
    onChange(selectedRating);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.starContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => handleStarPress(star)}
            activeOpacity={0.7}
          >
            <FontAwesome
              name={star <= rating ? 'star' : 'star-o'}
              size={30}
              color={star <= rating ? 'gold' : 'gray'}
              style={styles.starIcon}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: 'row',
    borderWidth: 2,             // Add border width
    borderColor: 'white',      // Set border color to white
    borderRadius: 10,          // Add border radius
    padding:4,
    paddingVertical:8
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
    backgroundColor: '#1E3648',
    marginRight: 50,
    paddingHorizontal: 10,   // Add padding for better appearance
    borderTopLeftRadius: 10,  // Match border radius with the container
    borderBottomLeftRadius: 10,
  },
  starContainer: {
    flexDirection: 'row',
  },
  starIcon: {
    marginHorizontal: 5,
  },
});


export default StarRating;
