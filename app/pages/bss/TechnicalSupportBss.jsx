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

const TechnicalSupportBss = ({ navigation }) => {
  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSettingsPress = () => {
    navigation.navigate("SettingsBss"); //
  };

  const [error, setError] = useState("");
  const [selectedProblem, setSelectedProblem] = useState("");
  const [problemDetail, setProblemDetail] = useState("");

  const route = useRoute();
  const dividertext = "Report a Problem";

  const phoneNumber = process.env.PHONE;
  const handlePhonePress = () => {
    const phoneUrl = `tel:${phoneNumber}`;
    Linking.openURL(phoneUrl);
  };

  const [stationInfo, setStationInfo] = useState(null);

  const fetchObtainedState = async () => {
    try {
      const obtainedOfficer = await getRecord("Bss Officer", [
        where("email", "==", auth.currentUser.email),
      ]);
   
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
        "Problem Type":selectedProblem,
        "Problem Detail":problemDetail,
        "Resolved": false,
        "station": stationInfo?stationInfo.station:'',
        "email": auth.currentUser.email,
      }
    
      addRecord('Technical Support BSS', newRecordData);

      console.log("Submitted document!");

      setSelectedProblem("");
      setProblemDetail("");
    } catch (err) {
      setError("Error " + err.message);
    }
  };

  const options = [
    {
      label: "Charging Cable Malfunction",
      value: "Charging Cable Malfunction",
    },
    {
      label: "Charging Station Communication Error",
      value: "Charging Station Communication Error",
    },
    {
      label: "Slow Charging or No Charging",
      value: "Slow Charging or No Charging",
    },
    { label: "Charging Station Offline", value: "Charging Station Offline" },
    {
      label: "Incompatible Connector Type",
      value: "Incompatible Connector Type",
    },
    { label: "Payment or Billing Issues", value: "Payment or Billing Issues" },
    { label: "Other Technical Issue", value: "Other Technical Issue" },
  ];

  const handleOptionChange = (newValue) => {
    setSelectedProblem(newValue);
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
        label="Type your Problem"
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
          NotificationMessage:
            error || "Technical Support Report has been submitted",
          ButtonMessage: error ? "Return back" : "Go to Home",
          ButtonRedirect: error ? "TechnicalSupportBss" : "StationDashboard",
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

export default TechnicalSupportBss;
