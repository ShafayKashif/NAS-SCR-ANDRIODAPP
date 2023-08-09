import React, { useState, useEffect } from "react";
import { getRecordById, getRecord } from "../../global/firebaseFunctions";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { where } from "firebase/firestore";
import { auth } from "../../config/firebase";
import Loading from "../../components/Loading";
import { Link } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons"; // Assuming you have FontAwesome or a similar icon library
import GreenBorderCase from "../../components/GreenBorderCase";
import BatteryComponent from "../../components/BatteryComponent";

import NavBss from '../temporary/NavBss';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E3648",
    justifyContent: "center",
    alignItems: "center",
  },
});

const stylecontainer = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  carouselContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  arrowButton: {
    padding: 10,
  },
  carouselItem: {
    borderRadius: 8,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

const StationDashboard = ({ navigation }) => {
  const [stationInfo, setStationInfo] = useState(null);
  const [rate, setRate] = useState("");
  const [stationLocation, setStationLocation] = useState("");

  const [showFirst, setShowFirst] = useState(true);

  const handlePrev = () => {
    setShowFirst(true);
  };

  const handleNext = () => {
    setShowFirst(false);
  };

  const fetchObtainedState = async () => {
    try {
      const obtainedOfficer = await getRecord("Bss Officer", [
        where("email", "==", auth.currentUser.email),
      ]);
      const obtainedState = await getRecordById(
        "Station",
        obtainedOfficer.station
      );
      setStationInfo(obtainedState);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchObtainedRate = async () => {
    try {
      const obtainedRate = await getRecordById("Day Fare", "Fare");
      setRate(obtainedRate.fare);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchObtainedState();
    fetchObtainedRate();
  },[]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Use an IIFE to make the useEffect function asynchronous
      fetchObtainedState();
      fetchObtainedRate();
    }, 5000); // 5 seconds in milliseconds
  });

  return (
    <View style={styles.container}>

      {stationInfo ? (
        <ScrollView>
        
          <View style={{display:'flex',justifyContent:'center', alignItems:'center'}}>
            {/* Temporary */}
            <NavBss />
           

            <Text style={{color: 'white'}}>Day Fare: {rate} PKR</Text>
            <View style={stylecontainer.container}>
              <View style={stylecontainer.carouselContainer}>
                <TouchableOpacity
                  onPress={handlePrev}
                  style={stylecontainer.arrowButton}
                >
                  <FontAwesome name="chevron-left" size={24} color="#58AA42" />
                </TouchableOpacity>
                {showFirst ? (
                  <GreenBorderCase
                    initialWidth={270}
                    initialHeight={550}
                    thickness={10}
                  >
                    <View style={stylecontainer.carouselItem}>
                      {/* Your content for the first GreenBorderCase */}

                      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                        {Object.keys(stationInfo.batterySlots).map(
                          (slotKey, index) => {
                            if (index < 8) {
                              return (
                                <View
                                  style={{ width: "50%", padding: 10 }}
                                  key={slotKey}
                                >
                                  <BatteryComponent
                                    charge={
                                      stationInfo.batterySlots[slotKey].charge
                                    }
                                    batteryNumber={slotKey}
                                    timeHoursLeft={
                                      stationInfo.batterySlots[slotKey]
                                        .TimeToFullCharge
                                    }
                                  />
                                </View>
                              );
                            }
                            return null;
                          }
                        )}
                      </View>
                      <Link
                        to="/BatteryInformationStation"
                        style={{
                          color: "#58AA42",
                          fontWeight: "bold",
                          fontSize: 16,
                          textDecorationLine: "underline",
                        }}
                      >
                        View Details
                      </Link>
                      <Text>Pg 1</Text>
                    </View>
                  </GreenBorderCase>
                ) : (
                  <GreenBorderCase
                    initialWidth={270}
                    initialHeight={550}
                    thickness={10}
                  >
                    <View style={stylecontainer.carouselItem}>
                      {/* Your content for the second GreenBorderCase */}
                      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                        {Object.keys(stationInfo.batterySlots).map(
                          (slotKey, index) => {
                            if (index >= 8) {
                              return (
                                <View
                                  style={{ width: "50%", padding: 10 }}
                                  key={slotKey}
                                >
                                  <BatteryComponent
                                    charge={
                                      stationInfo.batterySlots[slotKey].charge
                                    }
                                    batteryNumber={slotKey}
                                    timeHoursLeft={
                                      stationInfo.batterySlots[slotKey]
                                        .TimeToFullCharge
                                    }
                                  />
                                </View>
                              );
                            }
                            return null;
                          }
                        )}
                      </View>
                      <Link
                        to="/BatteryInformationStation"
                        style={{
                          color: "#58AA42",
                          fontWeight: "bold",
                          fontSize: 16,
                          textDecorationLine: "underline",
                        }}
                      >
                        View Details
                      </Link>
                      <Text>Pg 2</Text>
                    </View>
                  </GreenBorderCase>
                )}
                <TouchableOpacity
                  onPress={handleNext}
                  style={stylecontainer.arrowButton}
                >
                  <FontAwesome name="chevron-right" size={24} color="#58AA42" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      ) : (
        <Loading />
      )}
    </View>
  );
};

export default StationDashboard;
