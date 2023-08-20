//TODO Was having problem in backend

import { View, StyleSheet, Image, Text } from "react-native";
import LargeButton from "../components/LargeButton";
import { useRoute } from "@react-navigation/native";
import DividerWithText from "../components/DividerText";
import TextField from "../components/TextField";
import React, { useState, useEffect} from "react";
import { auth } from "../config/firebase";
import { updatePassword } from "firebase/auth";
import { where } from "firebase/firestore";

import { EmailAuthProvider } from "firebase/auth";
import { reauthenticateWithCredential } from "firebase/auth";
import {getRecord} from '../global/firebaseFunctions';
import StationDashboard from "./bss/StationDashboard";
import NavigatorBar from "../components/NavigatorBar";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E3648",
    justifyContent: "center",
    alignItems: "center",
  },
});


const ChangePassword = ({ navigation }) => {
  const [error,setError] = useState('');

  const [previousPassword, setPreviousPassword] = useState('');
  const [newPassword, setNewPassword]=useState('');
  const [confirmNewPassword, setConfirmPassword]=useState('');
  const [designation, setDesignation]=useState('')

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSettingsPress = () => {
    if (designation === "Rickshaw Driver"){
      navigation.navigate("SettingsDriver"); 
    }
    else {
      navigation.navigate("SettingsBss")
    }
  };

  const route = useRoute();
  const dividertext = "Change Password"

  const obtainUser =async ()=>{
    const obtainedPerson = await getRecord("Details User", [
      where("email", "==", auth.currentUser.email),
    ]);

    setDesignation(obtainedPerson.designation)
  }

  useEffect(()=>{
    obtainUser();
  },[])



  const handleSubmit = async () => {
    try {
      const user = auth.currentUser;
      const passwordEnteredByUser = previousPassword; //get password from user using a form
      const credential = EmailAuthProvider.credential(user.email, passwordEnteredByUser);
  
      try {
        await reauthenticateWithCredential(user, credential);
        console.log('Reauthentication successful.');
  
        // Check if the new password and confirm new password match
        if (newPassword !== confirmNewPassword) {
          setError('New password and confirm new password do not match.');
          throw new Error('New password and confirm new password do not match.');
        }
  
        // Update the password in Firebase
        await updatePassword(auth.currentUser, newPassword);
  
        setError(''); // Clear any previous error message
        console.log('Password updated successfully!');
      } catch (reauthError) {
        console.log('Error reauthenticating:', reauthError.message);
        setError(reauthError.message);
      }
    } catch (error) {
      console.log('Error updating password:', error.message);
      setError(error.message);
    }
  };
  

  return (
    <View style={styles.container}>
      <NavigatorBar
        onBackPress={handleBackPress}
        onSettingsPress={handleSettingsPress}
        showBackButton={true}
      />
      <DividerWithText textDisplay={dividertext} style={{ marginBottom: 20 }} />

      <TextField label="Previous Password" value={previousPassword} onChange={setPreviousPassword}/>
      <TextField label="New Password" value={newPassword} onChange={setNewPassword}/>
      <TextField label="Confirm New Password" value={confirmNewPassword} onChange={setConfirmPassword}/>


      <LargeButton
        textDisplay="Change Password"
        backgroundColor="#58AA42"
        textColor="white"
        redirectTo="Notifications"
        props={{
          NotificationMessage: error?error:"Password has been updated",
          ButtonMessage: error?"Return back": "Go to Home",
          ButtonRedirect: error? "ChangePassword" : (designation==="Rickshaw Driver"?"DriverDashboard": "StationDashboard")
        }}
        onPressFunction={handleSubmit}
      />

      <Text style={{color:'red'}}>{error}</Text>
    </View>
  );
};

export default ChangePassword;
