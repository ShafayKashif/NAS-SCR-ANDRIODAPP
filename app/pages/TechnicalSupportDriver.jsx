import { View, StyleSheet, Image, Text } from "react-native";
import LargeButton from "../components/LargeButton";
import { useRoute } from "@react-navigation/native";
import DividerWithText from "../components/DividerText";
import TextField from "../components/TextField";
import React, { useState } from "react";
import {addRecord} from '../global/firebaseFunctions';
import DropDown from "../components/DropDown";
import LargeTextField from "../components/LargeTextField";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E3648",
    justifyContent: "center",
    alignItems: "center",
  },
});


const TechnicalSupportDriver = ({ navigation }) => {
  const [error,setError] = useState('');
  const [selectedProblem, setSelectedProblem] = useState('');
  const [problemDetail, setProblemDetail]=useState('');

  const route = useRoute();
  const dividertext = "Report a Problem"

  const handleSubmit = async (event) => {

    try {
      // Create a new user with email and password using Firebase      
      let newRecordData={
        "Problem Type":selectedProblem,
        "Problem Detail":problemDetail,
      }
    
      addRecord('Technical Support BSS', newRecordData);
     

      console.log('Submitted document!');

      // Reset the form inputs
      setSelectedProblem('');
      setProblemDetail('');
      

    } catch (err) {
      setError('Error '+ err.message);
    }
  };

  

const options = [
  { label: 'Technical', value: 'Technical' },
  { label: 'Non Technical', value: 'Non Technical' },
  { label: 'Other', value: 'Other' },
];

const handleOptionChange = (newValue) => {
  setSelectedProblem(newValue);
};

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/img/Neubolt.png")}
        style={{
          width: 300,
          height: 80,
          marginBottom: 20,
        }}
      />
      <DividerWithText textDisplay={dividertext} style={{ marginBottom: 20 }} />
      <DropDown label="Report a Problem" value={selectedProblem} onChange={handleOptionChange} options={options} /> 
      <LargeTextField label="Type your Problem" value={problemDetail} onChange={setProblemDetail} />
    
      <LargeButton
        textDisplay="Report a Problem"
        backgroundColor="white"
        textColor="black"
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

export default TechnicalSupportDriver;
