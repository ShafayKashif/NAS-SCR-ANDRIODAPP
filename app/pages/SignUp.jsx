import { createUserWithEmailAndPassword } from "firebase/auth";
import { View, StyleSheet, Image, Text } from "react-native";
import LargeButton from "../components/LargeButton";
import { useRoute } from "@react-navigation/native";
import DividerWithText from "../components/DividerText";
import TextField from "../components/TextField";
import React, { useState } from "react";
import {addRecord} from '../global/firebaseFunctions';
import {auth} from '../config/firebase'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E3648",
    justifyContent: "center",
    alignItems: "center",
  },
});


const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword]=useState('');
  const [name, setName]=useState('');
  const [phone, setPhone]=useState('');
  const [cnic, setCnic]=useState('');
  const [error,setError] = useState('');

  const route = useRoute();
  const propData = route.params;
  const dividertext = "Sign up as a " + propData.person;

  const handleSubmit = async (event) => {
    try {
      // Create a new user with email and password using Firebase
  
      await createUserWithEmailAndPassword(auth, email, password);

      let newRecordData={
        email:email,
        name: name,
        phone: phone,
        cnic: cnic,
        designation: propData.person
      }
    
      addRecord('Details User', newRecordData);

      if (propData.person=="BSS Officer"){
        let officerRecord={
          email: email,
          station: "",
          photo:""
        }
        addRecord('Bss Officer', officerRecord)
      } else if (propData.person=="Rickshaw Driver"){
        let rickshawRecord={
          email: email,
          rickshawNumber: "",
          package: "",
          photo:"",
          assigned:""
        }
        addRecord("Rickshaw Driver", rickshawRecord)
      }
     
      // User registration successful
      console.log('User registered successfully!');

      // Reset the form inputs
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setName('');
      setPhone('');
      setCnic('');
      setError('');

    } catch (err) {
      // Error occurred during user registration
      console.log('Error registering user:', err.message);
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
      <TextField label="Name" value={name} onChange={setName} />
      <TextField label="Password" value={password} onChange={setPassword}/>
      <TextField label="Confirm Password" value={confirmPassword} onChange={setConfirmPassword}/>
      <TextField label="Email Address" value={email} onChange={setEmail}/>
      <TextField label="Phone Number" value={phone} onChange={setPhone}/>
      <TextField label="CNIC" value={cnic} onChange={setCnic}/>


      <LargeButton
        textDisplay="Sign Up"
        backgroundColor="white"
        textColor="black"
        redirectTo="Notifications"
        props={{
          NotificationMessage: error||"Your Sign Up Credentials have been submitted. Please wait for the admin to approve your account. Try again in 24 hours",
          ButtonMessage: error?"Return back": "Go to Login",
          ButtonRedirect: error? "Landing" : "SignIn",
        }}
        onPressFunction={handleSubmit}
      />

      <Text style={{color:'red'}}>{error}</Text>
    </View>
  );
};

export default SignUp;
