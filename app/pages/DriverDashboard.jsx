import React, { useState, useEffect } from "react";
import { getRecord, getRecordById } from '../global/firebaseFunctions';
import { Text, StyleSheet, View } from 'react-native';
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

const DriverDashboard = ({ navigation }) => {
  const [driverInfo, setDriverInfo] = useState(null);
  const [rate, setRate]=useState("");

  const fetchObtainedState = async () => {
    try{
      const obtainedRickshaw = await getRecord('Rickshaw Driver', [where("email", "==", auth.currentUser.email)]);
      const obtainedState= await getRecordById('Rickshaw', obtainedRickshaw.assigned);
      setStationInfo(obtainedState);
  }catch(err){
      console.log(err)
  }

  };



  useEffect(() => {
    const timeout = setTimeout(() => {
      // Use an IIFE to make the useEffect function asynchronous
      fetchObtainedState();
     
    }, 5000); // 5 seconds in milliseconds
  });

  

  return (
    <View style={styles.container}>
    {driverInfo? (
      <View>
        {/* Temporary */}
        <Link
          to="/TechnicalSupportDriver"
          style={{ color: "#58AA42", fontWeight: "bold" }}
        >
          Tec
        </Link>

        <Link
          to="/SignUpOption"
          style={{ color: "#58AA42", fontWeight: "bold" }}
        >
          Efficiency Report
        </Link>

        <Link
          to="/SignUpOption"
          style={{ color: "#58AA42", fontWeight: "bold" }}
        >
          Feedback Form
        </Link>

        <Link
          to="/TechnicalSupportDriver"
          style={{ color: "#58AA42", fontWeight: "bold" }}
        >Technical Support</Link>

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
        
      <Text style={{ color: "#FFFFFF" }}>Rickshaw Driver Dashboard</Text>
      <Text>Rickshaw Plate: {driverInfo.RickshawPlate}</Text>
      <Text>Distance Travelled: {driverInfo.distanceTravelled}</Text>
      <Text>Trees Saved: {driverInfo.treesSaved}</Text>

      {Object.keys(driverInfo.batterySlots).map((slotKey) => (
        <View style={{margin:10}} key={slotKey}>
          <Text style={{color: 'white'}}>Battery Slot: {slotKey}</Text>
          <Text style={{color: 'white'}}>Time Left: {driverInfo.batterySlots[slotKey].Time_Left}</Text>
          <Text style={{color: 'white'}}>Battery ID: {driverInfo.batterySlots[slotKey].batteryID}</Text>
          <Text style={{color: 'white'}}>Charge: {driverInfo.batterySlots[slotKey].charge}</Text>
          <Text style={{color: 'white'}}>State of Health: {driverInfo.batterySlots[slotKey].stateOfHealth}</Text>
          <Text style={{color: 'white'}}>Temperature: {driverInfo.batterySlots[slotKey].temperature}</Text>
        </View>
      ))}
    </View>
    ) : (
      <Loading/>
    )}
    </View>
  );
};

export default DriverDashboard;
