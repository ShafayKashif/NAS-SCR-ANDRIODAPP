import React from "react";
import { View, Text } from "react-native";

const StarRating = ({ label, rating }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Text>{label}: </Text>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <Text
            key={i}
            style={{ color: ratingValue <= rating ? "#FFD700" : "#808080" }}
          >
            ★
          </Text>
        );
      })}
    </View>
  );
};

export default StarRating;
