import { View, StyleSheet, Image, Text } from "react-native";
import LargeButton from "../components/LargeButton";
import { useRoute } from "@react-navigation/native";
import DividerWithText from "../components/DividerText";
import TextField from "../components/TextField";
import React, { useState, useEffect } from "react";
import {addRecord} from '../global/firebaseFunctions';
import DropDown from "../components/DropDown";
import LargeTextField from "../components/LargeTextField";
import DisabledTextField from "../components/DisabledTextField";
import { auth } from "../config/firebase";
import {getRecord, updateRecord} from '../global/firebaseFunctions';
import {where} from 'firebase/firestore';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E3648",
    justifyContent: "center",
    alignItems: "center",
  },
});


const UpdateProfileBss = ({ navigation }) => {
  const [error,setError] = useState('');

  const [name, setName] = useState('');
  const [phone, setPhone]=useState('');
  const [cnic, setCnic]=useState('');

  const route = useRoute();
  const dividertext = "Update Profile"

  useEffect(()=>{
    const obtainDetails=async()=>{

            try{
              const obtainedUser = await getRecord('Details User', [where("email", "==", auth.currentUser.email)]);
              
              setName(obtainedUser.name);
              setPhone(obtainedUser.phone);
              setCnic(obtainedUser.cnic);
          }catch(err){
              console.log(err)
          }
          
  }
  obtainDetails();
},[])

  const handleSubmit = async (event) => {

    try {
      // Create a new user with email and password using Firebase    
      const obtainedUser = await getRecord('Details User', [where("email", "==", auth.currentUser.email)]);

      let newRecordData = {
        ...obtainedUser,
        name: name,
        phone: phone,
        cnic: cnic
      };
      console.log(newRecordData)
      console.log(obtainedUser.id)
      updateRecord('Details User', obtainedUser.id, newRecordData);
     

      console.log('Submitted document!');

      // Reset the form inputs
      setName('');
      setPhone('');
      setCnic('');
      setError('');
      

    } catch (err) {
      setError('Error '+ err.message);
    }
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
      <DisabledTextField label="Email address" value={auth.currentUser.email}/>
      <TextField label="Full Name" value={name} onChange={setName}/>
      <TextField label="Phone Number" value={phone} onChange={setPhone}/>
      <DisabledTextField label="CNIC" value={cnic} />

      <LargeButton
        textDisplay="Report a Problem"
        backgroundColor="white"
        textColor="black"
        redirectTo="Notifications"
        props={{
          NotificationMessage: error||"Profile has been updated",
          ButtonMessage: error?"Return back": "Go to Home",
          ButtonRedirect: error? "UpdateProfileBss" : "StationDashboard",
        }}
        onPressFunction={handleSubmit}
      />

      <Text style={{color:'red'}}>{error}</Text>
    </View>
  );
};

export default UpdateProfileBss;
