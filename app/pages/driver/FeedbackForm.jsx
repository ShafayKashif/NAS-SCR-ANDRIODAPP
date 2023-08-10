import React, {useState} from "react";
import { View, StyleSheet, Text, TouchableOpacity, Linking } from "react-native";
import LargeButton from "../../components/LargeButton";
import TextField from "../../components/TextField";
import DropDown from "../../components/DropDown";
import StarRating from "../../components/StarRating";
import LargeTextField from "../../components/LargeTextField";
import DividerWithText from "../../components/DividerText";
import {addRecord} from "../../global/firebaseFunctions";
import {auth} from "../../config/firebase";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E3648",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  footer: {
    fontSize: 20,
    color: "white",
    margin: 20,
  },
  phoneNumber: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#58AA42", // Green color for hyperlink
  }
});


const FeedbackForm = () => {

  const [station, setStation]=useState('')
  const [date, setDate]=useState('')
  const [comments, setComments]=useState('')
  const [selectedRating, setSelectedRating] = useState(0);
  const [error,setError] = useState('');

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
    
  };

  const optionsStations = [
    { label: 'Station 1', value: 'Station 1' },
    { label: 'Station 2', value: 'Station 2' },
    { label: 'Station 3', value: 'Sttaion 3' },
  ];
  
  const optionsDates = [
    { label: 'Date/Time 1', value: 'Date/Time 1' },
    { label: 'Date/Time 2', value: 'Date/Time 2' },
    { label: 'Date/Time 3', value: 'Date/Time 3' },
  ];
  const handleOptionChangeStation = (newValue) => {
    setStation(newValue);
  };

  const handleOptionChangeDate = (newValue) => {
    setDate(newValue);
  };

  const phoneNumber = process.env.PHONE;
  const handlePhonePress = () => {
    const phoneUrl = `tel:${phoneNumber}`;
    Linking.openURL(phoneUrl);
  };

  const handleSubmit = async (event) => {

    try {
      // Create a new user with email and password using Firebase      
      let newRecordData={
        "email":auth.currentUser.email,
        "Date": date,
        "comments":comments,
        "rating": selectedRating,
        "station": station,
      }
    
      addRecord('Feedback Report', newRecordData);
     

      console.log('Submitted document!');

      // Reset the form inputs
      setDate('');
      setSelectedRating('');
      setComments('')
      setError('');
      setStation('');
      

    } catch (err) {
      setError('Error '+ err.message);
    }
  };

  return (
    <View style={styles.container}>
      <DividerWithText textDisplay={"BSS Feedback Form"} style={{ marginBottom: 20 }} />

      <DropDown label="BSS Station" value={station} onChange={handleOptionChangeStation} options={optionsStations} /> 
      <DropDown label="Date/Time of Visit" value={date} onChange={handleOptionChangeDate} options={optionsDates} /> 

      <StarRating label={"Rate"} onChange={handleRatingChange}/>

      <LargeTextField label="Comments " value={comments} onChange={setComments} />

      <LargeButton
        textDisplay="Submit Feedback"
        backgroundColor="#58AA42"
        textColor="white"
        redirectTo="Notifications"
        props={{
          NotificationMessage: error||"Your feedback has been Submitted",
          ButtonMessage: error?"Return back": "Go to Home",
          ButtonRedirect: error? "FeedbackForm" : "DriverDashboard",
        }}
        onPressFunction={handleSubmit}
      />

      <View style={{marginBottom:20}}/>
       <Text style={{color: 'white'}}>Call us on our helpline:</Text>
      <TouchableOpacity onPress={handlePhonePress}>
        <Text style={styles.phoneNumber}>{phoneNumber}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FeedbackForm;
