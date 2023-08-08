import { View, StyleSheet, Image, Text } from "react-native";
import LargeButton from "../../components/LargeButton";
import { useRoute } from "@react-navigation/native";
import DividerWithText from "../../components/DividerText";
import TextField from "../../components/TextField";
import React, { useState } from "react";
import {addRecord} from '../../global/firebaseFunctions';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E3648",
    justifyContent: "center",
    alignItems: "center",
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

  const handleSubmit = async (event) => {

    try {
      // Create a new user with email and password using Firebase      
      let newRecordData={
        email:email,
        name: name,
        phone: phone,
        cnic: cnic,
        date: date,
        time: time
      }
    
      addRecord('Schedule Maintenance', newRecordData);
     
      // User registration successful
      console.log('User registered successfully!');

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
      console.error('Error registering user:', err.message);
      setError('Error '+ err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/img/Neubolt.png")}
        style={{
          width: 300,
          height: 80,
          marginBottom: 20,
        }}
      />
      <DividerWithText textDisplay={dividertext} style={{ marginBottom: 20 }} />
      <TextField label="Name" value={name} onChange={setName} />
      <TextField label="Email Address" value={email} onChange={setEmail}/>
      <TextField label="Phone Number" value={phone} onChange={setPhone}/>
      <TextField label="CNIC" value={cnic} onChange={setCnic}/>
      <TextField label="Date" value={date} onChange={setDate}/>
      <TextField label="Time" value={time} onChange={setTime}/>


      <LargeButton
        textDisplay="Schedule Maintenance"
        backgroundColor="white"
        textColor="black"
        redirectTo="Notifications"
        props={{
          NotificationMessage: error||"Your report has been submitted",
          ButtonMessage: error?"Return back": "Go to Home",
          ButtonRedirect: error? "ScheduleMaintenance" : "StationDashboard",
        }}
        onPressFunction={handleSubmit}
      />

      <Text style={{color:'red'}}>{error}</Text>
    </View>
  );
};

export default ScheduleMaintenance;
