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


const Format = ({ navigation }) => {
  const [error,setError] = useState('');
  const [test, setTest] = useState('');

  const route = useRoute();
  const dividertext = "Enter format text"

  const handleSubmit = async (event) => {

    try {
      // create record
      let newRecordData={
        "test":test,
        "test2":test,
      }
      
    //   Add record through changing collection name
      addRecord('collection', newRecordData);
     

      console.log('Submitted document!');

      // Reset the form inputs
      setTest('');
      

    } catch (err) {
      setError('Error '+ err.message);
    }
  };

  return (
    <View style={styles.container}>
      <DividerWithText textDisplay={dividertext} style={{ marginBottom: 20 }} />
      <TextField label="Enter Text" value={test} onChange={setTest}/>
      
      <LargeButton
        textDisplay="Send"
        backgroundColor="#58AA42"
        textColor="white"
        redirectTo="Notifications"
        props={{
          NotificationMessage: error||"Technical Support Report has been submitted",
          ButtonMessage: error?"Return back": "Go to Home",
          ButtonRedirect: error? "ScheduleMaintenance" : "StationDashboard",
        }}
        onPressFunction={handleSubmit}
      />

      <Text style={{color:'red'}}>{error}</Text>
    </View>
  );
};

export default Format;
