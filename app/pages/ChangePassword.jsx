//TODO Was having problem in backend

import { View, StyleSheet, Image, Text } from "react-native";
import LargeButton from "../components/LargeButton";
import { useRoute } from "@react-navigation/native";
import DividerWithText from "../components/DividerText";
import TextField from "../components/TextField";
import React, { useState} from "react";
import { auth } from "../config/firebase";
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "firebase/auth";

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

  const route = useRoute();
  const dividertext = "Change Password"


  const handleSubmit = async () => {
    try {
      // Check if the user is currently signed in
      const user = auth.currentUser;
      console.log(user)
      if (!user) {
        setError('User not logged in.');
        return;
      }
  
      // Create the credential object
      const credential = EmailAuthProvider.credential(user.email, previousPassword);
  
      // Reauthenticate the user
      await reauthenticateWithCredential(credential);
  
      // Check if the new password and confirm new password match
      if (newPassword !== confirmNewPassword) {
        setError('New password and confirm new password do not match.');
        return;
      }
  
      // Update the password in Firebase
      await updatePassword(auth.currentUser, newPassword);
  
      setError(''); // Clear any previous error message
      console.log('Password updated successfully!');
    } catch (error) {
      console.log('Error updating password:', error.message);
      setError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <DividerWithText textDisplay={dividertext} style={{ marginBottom: 20 }} />

      <TextField label="Previous Password" value={previousPassword} onChange={setPreviousPassword}/>
      <TextField label="New Password" value={newPassword} onChange={setNewPassword}/>
      <TextField label="Confirm New Password" value={confirmNewPassword} onChange={setConfirmPassword}/>


      <LargeButton
        textDisplay="Report a Problem"
        backgroundColor="#58AA42"
        textColor="white"
        redirectTo="Notifications"
        props={{
          NotificationMessage: error||"Password has been updated",
          ButtonMessage: error?"Return back": "Go to Home",
        //   TODO: FIX THIS
          ButtonRedirect: error? "ChangePassword" : "StationDashboard",
        }}
        onPressFunction={handleSubmit}
      />

      <Text style={{color:'red'}}>{error}</Text>
    </View>
  );
};

export default ChangePassword;
