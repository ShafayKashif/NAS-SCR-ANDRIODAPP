import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import SmallButton from "./SmallButton";

const ChoiceCards = () => {
  const [isCard1Selected, setIsCard1Selected] = useState(false);
  const [isCard2Selected, setIsCard2Selected] = useState(false);
  const [redirectTo, setRedirectTo] = useState("SignUpOption");
  const [person, setPerson] = useState({});

  const handleSubmit =()=>{
    
  }

  const handleCard1Press = () => {
    setIsCard1Selected(true);
    setIsCard2Selected(false);
    setRedirectTo("SignUp");
    setPerson({person: "Rickshaw Driver"});
  };

  const handleCard2Press = () => {
    setIsCard1Selected(false);
    setIsCard2Selected(true);
    setRedirectTo("SignUp");
    setPerson({person: "BSS Officer"});
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.card, isCard1Selected && styles.cardSelected]}
        onPress={handleCard1Press}
      >
        <Image
          source={isCard1Selected ? require("../assets/img/RickshawGreen.png") : require("../assets/img/Rickshaw.png")}
          style={{
            width: 80,
            height: 80,
            marginBottom: 15,
          }}
         />
        <Text
          style={[styles.cardText, isCard1Selected && styles.cardTextSelected]}
        >
          Rickshaw Driver
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.card, isCard2Selected && styles.cardSelected]}
        onPress={handleCard2Press}
      >
         <Image
          source={isCard2Selected ? require("../assets/img/BoltGreen.png") : require("../assets/img/Bolt.png")}
          style={{
            width: 80,
            height: 80,
            marginBottom: 15,
          }}
         />
        <Text
          style={[styles.cardText, isCard2Selected && styles.cardTextSelected]}
        >
          BSS Officer
        </Text>
      </TouchableOpacity>

      <SmallButton
        textDisplay="Get Started"
        backgroundColor="#58AA42"
        textColor="#FFFFFF"
        redirectTo={redirectTo}
        props={person}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 0,
    margin: 20,
  },
  card: {
    backgroundColor: "#F6F4F4",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 0,
    margin: 10,
    width: 220,
    height: 170,
  },
  cardSelected: {
    borderWidth: 8,
    borderColor: "#58AA42",
    borderRadius: 8,
  },
  cardText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  cardTextSelected: {
    color: "#58AA42",
  },
});

export default ChoiceCards;
