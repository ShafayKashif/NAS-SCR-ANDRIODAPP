import { View, StyleSheet, Image, Text, Linking, TouchableOpacity } from "react-native";
import LargeButton from "../../components/LargeButton";
import { useRoute } from "@react-navigation/native";
import DividerWithText from "../../components/DividerText";
import TextField from "../../components/TextField";
import React, { useState, useEffect } from "react";
import {addRecord} from '../../global/firebaseFunctions';
import {auth} from '../../config/firebase';
import {getRecord} from '../../global/firebaseFunctions';
import DisabledTextField from "../../components/DisabledTextField";
import {where} from 'firebase/firestore';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E3648",
    justifyContent: "center",
    alignItems: "center",
  },
  phoneNumber: {
  fontSize: 12,
  fontWeight: "bold",
  color: "#58AA42", // Blue color for hyperlink
},  
});


const ScheduleMaintenance = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [name, setName]=useState('');
  const [phone, setPhone]=useState('');
  const [cnic, setCnic]=useState('');
  const [date, setDate]=useState('');
  const [time, setTime]=useState('');


  const [error,setError] = useState('');

  const route = useRoute();
  const propData = route.params;
  const dividertext = "Schedule Maintenance";

  const [stationInfo, setStationInfo] = useState(null);

  const fetchObtainedState = async () => {
    try {
      const obtainedOfficer = await getRecord("Bss Officer", [
        where("email", "==", auth.currentUser.email),
      ]);
      console.log(obtainedOfficer)
      setStationInfo(obtainedOfficer);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchObtainedState();
  },[]);

  const handleSubmit = async (event) => {

    try {
      // Create a new user with email and password using Firebase      
      let newRecordData={
        email:auth.currentUser.email,
        name: name,
        phone: phone,
        cnic: cnic,
        date: date,
        time: time,
        resolved: false,
        station: stationInfo?stationInfo.station:'',
      }
    
      addRecord('Schedule Maintenance', newRecordData);
     
      // User registration successful
      console.log('Maintenance has been scheduled!');

      // Reset the form inputs
      setEmail('');
      setName('');
      setPhone('');
      setCnic('');
      setDate('');
      setTime('');
      setError('');

    } catch (err) {
      // Error occurred during user registration
      console.error('Error submitting maintenance:', err.message);
      setError('Error '+ err.message);
    }
  };

  const phoneNumber = process.env.PHONE;
  const handlePhonePress = () => {
    const phoneUrl = `tel:${phoneNumber}`;
    Linking.openURL(phoneUrl);
  };

  return (
    <View style={styles.container}>
      <DividerWithText textDisplay={dividertext} style={{ marginBottom: 20 }} />
      <TextField label="Name" value={name} onChange={setName} />
      <DisabledTextField label="Email Address" value={auth.currentUser.email} onChange={setEmail}/>
      <TextField label="Phone Number" value={phone} onChange={setPhone}/>
      <TextField label="CNIC" value={cnic} onChange={setCnic}/>
      <TextField label="Date" value={date} onChange={setDate}/>
      <TextField label="Time" value={time} onChange={setTime}/>


      <LargeButton
        textDisplay="Schedule Maintenance"
        backgroundColor="#58AA42"
        textColor="white"
        redirectTo="Notifications"
        props={{
          NotificationMessage: error||"Maintenance has been scheduled",
          ButtonMessage: error?"Return back": "Go to Home",
          ButtonRedirect: error? "ScheduleMaintenance" : "StationDashboard",
        }}
        onPressFunction={handleSubmit}
      />

      <Text style={{color:'red'}}>{error}</Text>

      <Text style={{color: 'white'}}>Call us on our helpline:</Text>
      <TouchableOpacity onPress={handlePhonePress}>
        <Text style={styles.phoneNumber}>{phoneNumber}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ScheduleMaintenance;
