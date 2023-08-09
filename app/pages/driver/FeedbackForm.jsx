import React, {useState} from "react";
import { View, StyleSheet, Text } from "react-native";
import LargeButton from "../../components/LargeButton";
import TextField from "../../components/TextField";
import DropDown from "../../components/DropDown";
import StarRating from "../../components/StarRating";
import LargeTextField from "../../components/LargeTextField";

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
});


const FeedbackForm = () => {

  const [station, setStation]=useState('')
  const [date, setDate]=useState('')
  const [comments, setComments]=useState('')

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BSS Feedback Form</Text>

      <DropDown label="BSS Station" value={station} onChange={handleOptionChangeStation} options={optionsStations} /> 
      <DropDown label="Date/Time of Visit" value={date} onChange={handleOptionChangeDate} options={optionsDates} /> 

  
      <StarRating />

      <LargeTextField label="Comments " value={comments} onChange={setComments} />

      <LargeButton
        textDisplay="Submit Feedback"
        backgroundColor="white"
        textColor="black"
        redirectTo="Notifications"
        navigationParams={{
          NotificationMessage: "Your feedback has been submitted",
          ButtonMessage: "Go to HomePage",
          ButtonRedirect: "Homepage",
        }}
      />
      <Text style={styles.footer}>Call our helpline:</Text>
    </View>
  );
};

export default FeedbackForm;
