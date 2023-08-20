import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";
import LargeButton from "../../components/LargeButton";
import { useRoute } from "@react-navigation/native";
import DividerWithText from "../../components/DividerText";
import TextField from "../../components/TextField";
import React, { useState, useEffect } from "react";
import {addRecord} from '../../global/firebaseFunctions';
import DropDown from "../../components/DropDown";
import LargeTextField from "../../components/LargeTextField";
import {auth} from '../../config/firebase';
import {getRecord} from '../../global/firebaseFunctions';
import {where} from 'firebase/firestore';
import NavigatorBar from "../../components/NavigatorBar";


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
    color: "#58AA42", // Green color for hyperlink
  },
});

const TechnicalSupportDriver = ({ navigation }) => {
  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSettingsPress = () => {
    navigation.navigate("SettingsDriver"); // Replace with the correct route name for the settings page
  };

  const [error, setError] = useState("");
  const [selectedProblem, setSelectedProblem] = useState("");
  const [problemDetail, setProblemDetail] = useState("");

  const route = useRoute();
  const dividertext = "Report a Problem";

  const [driverInfo, setDriverInfo] = useState(null);

  const fetchObtainedState = async () => {
    try {
      const obtainedRickshaw = await getRecord("Rickshaw Driver", [
        where("email", "==", auth.currentUser.email),
      ]);
    
      // console.log(obtainedState)
      setDriverInfo(obtainedRickshaw);
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
        "Problem Type":selectedProblem,
        "Problem Detail":problemDetail,
        "Resolved": false,
        "assigned": driverInfo?driverInfo.assigned:'',
        "email": auth.currentUser.email,
      }
    

      addRecord("Technical Support Driver", newRecordData);

      console.log("Submitted document!");

      // Reset the form inputs
      setSelectedProblem("");
      setProblemDetail("");
    } catch (err) {
      setError("Error " + err.message);
    }
  };

  const options = [
    { label: "Engine Trouble", value: "Engine Trouble" },
    { label: "GPS Navigation Issue", value: "GPS Navigation Issue" },
    { label: "App Crashes", value: "App Crashes" },
    { label: "Connection Problems", value: "Connection Problems" },
    { label: "Other Technical Issue", value: "Other Technical Issue" },
  ];

  const handleOptionChange = (newValue) => {
    setSelectedProblem(newValue);
  };

  const phoneNumber = process.env.PHONE;
  const handlePhonePress = () => {
    const phoneUrl = `tel:${phoneNumber}`;
    Linking.openURL(phoneUrl);
  };

  return (
    <View style={styles.container}>
      <NavigatorBar
        onBackPress={handleBackPress}
        onSettingsPress={handleSettingsPress}
        showBackButton={true}
      />
      <DividerWithText textDisplay={dividertext} style={{ marginBottom: 20 }} />
      <DropDown
        label="Report a Problem"
        value={selectedProblem}
        onChange={handleOptionChange}
        options={options}
      />
      <LargeTextField
        label="Type your problems here . . . "
        value={problemDetail}
        onChange={setProblemDetail}
      />

      <View style={{ marginTop: 80 }}></View>
      <LargeButton
        textDisplay="Report Problem"
        backgroundColor="#58AA42"
        textColor="white"
        redirectTo="Notifications"
        props={{
          NotificationMessage: error||"Technical Support Report has been submitted",
          ButtonMessage: error?"Return back": "Go to Home",
          ButtonRedirect: error? "TechnicalSupportDriver" : "DriverDashboard",
        }}
        onPressFunction={handleSubmit}
      />

      <Text style={{ color: "red" }}>{error}</Text>

      <Text style={{ color: "white" }}>Call us on our helpline:</Text>
      <TouchableOpacity onPress={handlePhonePress}>
        <Text style={styles.phoneNumber}>{phoneNumber}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TechnicalSupportDriver;
