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
import NavigatorBar from "../../components/NavigatorBar";
import NavBss from "../temporary/NavBss";
import LightGreenCase from "../../components/LightGreenCase";
import CircleButton from "../../components/CircleButton";

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
    marginTop:20,
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

  const handleSettingsPress = () => {
    navigation.navigate("SettingsBss"); //
  };

  return (
    <View style={styles.container}>
      {stationInfo ? (
        <ScrollView>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{marginTop:15}}/>
            <NavigatorBar
            onSettingsPress={handleSettingsPress}
            showBackButton={false}
          />
            {/* Temporary */}
            {/* <NavBss /> */}

            <LightGreenCase initialHeight={170} initialWidth={270}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    // alignItems: "center",
                    // justifyContent: "left"
                  }}
                >
                  <Text style={{  color: "#1e3686", fontSize: 20}}>
                    Day Fare
                  </Text>
                  <View style={{display:"flex", flexDirection:"row"}}>

                  <Text style={{  color: "#1e3686", fontSize: 38 }}>
                    {rate} 
                  </Text>

                  <Text style={{  color: "#1e3686", fontSize: 20, marginTop:18 }}>
                    PKR
                  </Text>

                  </View>

                  <View style={{display:'flex', flexDirection:'row', alignItems:'space-between', marginLeft:0}}>
                  <View>
                    <Text style={{fontSize: 7, color:"#000", marginHorizontal:10, marginBottom:5}}>Station Performance</Text>
                    <CircleButton icon="charging-station" size={40} redirectTo="StationPerformance" />

                  </View>

                  <View>
                    <Text style={{fontSize: 7, color:"#000", marginHorizontal:10, marginBottom:5}}>Maintenance</Text>
                    <CircleButton icon="hard-hat" size={40} redirectTo="ScheduleMaintenance" />

                  </View>

                  <View>
                    <Text style={{fontSize: 7, color:"#000", marginHorizontal:20, marginBottom:5}}>Report Issues</Text>
                    <CircleButton icon="exclamation" size={40} redirectTo="TechnicalSupportBss" />

                  </View>

                  </View>
                 
                
                  <View>

                 
                 

                  </View>
                </View>

                
             
              </View>
            </LightGreenCase>
            
  
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
                                        .TimeToFullCharge.hours
                                    }
                                    timeMinutesLeft={
                                      stationInfo.batterySlots[slotKey]
                                        .TimeToFullCharge.remainingMinutes
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
                                        .TimeToFullCharge.hours
                                    }
                                    timeMinutesLeft={
                                      stationInfo.batterySlots[slotKey]
                                        .TimeToFullCharge.remainingMinutes
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
