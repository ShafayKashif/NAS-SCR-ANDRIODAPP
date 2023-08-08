import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import BatteryWithCharge from "./BatteryWithCharge";
import GreenBorderCase from "./GreenBorderCase";

const BatteryInformationCard = ({
  id,
  charge,
  temperature,
  health,
  lastLabel,
  timeHours,
  timeMin,
}) => {
  return (
    <GreenBorderCase initialHeight={320} initialWidth={320} thickness={10}>
      <View>
        <BatteryWithCharge charge={charge} />
        <View style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
          <Text style={{ marginTop: 5, fontSize: 16, fontWeight: "bold" }}>
            ID:{" "}
          </Text>
          <Text style={{ marginTop: 5, fontSize: 16 }}>{id}</Text>
        </View>

        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={{ marginTop: 5, fontSize: 16, fontWeight: "bold" }}>
            Charge:{" "}
          </Text>
          <Text style={{ marginTop: 5, fontSize: 16 }}>{charge} %</Text>

          {charge > 70 ? (
            <Text style={{ marginTop: 5, fontSize: 16 }}>  {"    "} Good ✔️</Text>
          ) : charge >= 30 ? (
            <Text style={{ marginTop: 5, fontSize: 16 }}>  {"    "} Needs Charge </Text>
          ) : (
            <Text style={{ marginTop: 5, fontSize: 16 }}>  {"    "} Out of Charge</Text>
          )}
        </View>

        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={{ marginTop: 5, fontSize: 16, fontWeight: "bold" }}>
            Temp:{" "}
          </Text>
          <Text style={{ marginTop: 5, fontSize: 16 }}>{temperature} °C</Text>
          {temperature > 40 ? (
            <Text style={{ marginTop: 5, fontSize: 16 }}>  {"    "}Too Hot </Text>
          ) : temperature < 19 ? (
            <Text style={{ marginTop: 5, fontSize: 16 }}>  {"    "}Too Cold </Text>
          ) : (
            <Text style={{ marginTop: 5, fontSize: 16 }}>  {"    "}Good ✔️</Text>
          )}
        </View>

        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={{ marginTop: 5, fontSize: 16, fontWeight: "bold" }}>
            Health:{" "}
          </Text>
          <Text style={{ marginTop: 5, fontSize: 16 }}>{health} %</Text>
          {health > 50 ? (
            <Text style={{ marginTop: 5, fontSize: 16 }}>  {"    "}Good ✔️</Text>
          ) : (
            <Text style={{ marginTop: 5, fontSize: 16 }}>
              {"    "}
               Needs Maintenance ⚠
            </Text>
          )}
        </View>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={{ marginTop: 5, fontSize: 16, fontWeight: "bold" }}>
            {lastLabel}:{" "}
          </Text>
          <Text style={{ marginTop: 5, fontSize: 16 }}>
            {timeHours} h {timeMin} m
          </Text>
        </View>
      </View>
    </GreenBorderCase>
  );
};

export default BatteryInformationCard;
