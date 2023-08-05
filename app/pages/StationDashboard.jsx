import React, { useState, useEffect } from "react";
import { getRecordById, getRecord } from '../global/firebaseFunctions';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import {where} from 'firebase/firestore';
import {auth} from '../config/firebase'
import Loading from '../components/Loading'
import { Link } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E3648",
    justifyContent: "center",
    alignItems: "center",
  },
});

const StationDashboard = ({ navigation }) => {
  const [stationInfo, setStationInfo] = useState(null);
  const [rate, setRate]=useState("");
  const [stationLocation, setStationLocation]=useState("")

  const fetchObtainedState = async () => {
    try{
        const obtainedOfficer = await getRecord('Bss Officer', [where("email", "==", auth.currentUser.email)]);
        const obtainedState= await getRecordById('Station', obtainedOfficer.station);
        setStationInfo(obtainedState);
    }catch(err){
        console.log(err)
    }
  
  };

  const fetchObtainedRate = async () => {
    try{
      const obtainedRate= await getRecordById('Day Fare', 'Fare');
      setRate(obtainedRate.fare);
    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Use an IIFE to make the useEffect function asynchronous
      fetchObtainedState();
      fetchObtainedRate();
    }, 5000); // 5 seconds in milliseconds
  });

  return (

    <View style={styles.container}>
    {stationInfo? (
    <ScrollView>
      <View>
        {/* Temporary */}
      <Link
          to="/ScheduleMaintenance"
          style={{ color: "#58AA42", fontWeight: "bold", marginTop:40 }}
        >
          Schedule Maintenance
        </Link>

        <Link
          to="/TechnicalSupportBss"
          style={{ color: "#58AA42", fontWeight: "bold" }}
        >
          Technical Support BSS
        </Link>

        <Link
          to="/UpdateProfileBss"
          style={{ color: "#58AA42", fontWeight: "bold" }}
        >
          Update Profile
        </Link>

        <Link
          to="/ChangePassword"
          style={{ color: "#58AA42", fontWeight: "bold" }}
        >Change Password</Link>

        <Link
          to="/SignUpOption"
          style={{ color: "#58AA42", fontWeight: "bold" }}
        >Update Profile</Link>

        <Link
          to="/SignUpOption"
          style={{ color: "#58AA42", fontWeight: "bold" }}
        >Change Password</Link>

        <Link
          to="/SignUpOption"
          style={{ color: "#58AA42", fontWeight: "bold" }}
        >Package</Link>

      <Text>Day Fare: {rate} PKR</Text>
      {Object.keys(stationInfo.batterySlots).map((slotKey) => (
        <View style={{margin:10}} key={slotKey}>
          <Text style={{color: 'white'}}>Battery Slot: {slotKey}</Text>
          <Text style={{color: 'white'}}>Time Left: {stationInfo.batterySlots[slotKey].TimeToFullCharge}</Text>
          <Text style={{color: 'white'}}>Battery ID: {stationInfo.batterySlots[slotKey].batteryID}</Text>
          <Text style={{color: 'white'}}>Charge: {stationInfo.batterySlots[slotKey].charge}</Text>
          <Text style={{color: 'white'}}>State of Health: {stationInfo.batterySlots[slotKey].stateOfHealth}</Text>
          <Text style={{color: 'white'}}>Temperature: {stationInfo.batterySlots[slotKey].temperature}</Text>
        </View>
      ))}
    </View>
    </ScrollView>
    ) : (
      <Loading/>
    )}
    </View>
  );
};

export default StationDashboard;
