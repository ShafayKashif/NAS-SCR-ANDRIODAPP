import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import GreenBorderCase from "../../components/GreenBorderCase";
import { getRecord, getRecordById } from "../../global/firebaseFunctions";
import Loading from "../../components/Loading";
import { where } from "firebase/firestore";
import { auth } from "../../config/firebase";
import DividerWithText from "../../components/DividerText";
import NavigatorBar from "../../components/NavigatorBar";

import {
  DailyPackageImages,
  WeeklyPackageImages,
  MonthlyPackageImages,
} from "../../utils/obtainPackages";

const mergedImages = {
  ...DailyPackageImages,
  ...WeeklyPackageImages,
  ...MonthlyPackageImages,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E3648",
    justifyContent: "center",
    alignItems: "center",
  },
});

const PackagePage = ({navigation}) => {
  const [myPackage, setMyPackage] = useState("");
    const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSettingsPress = () => {
    navigation.navigate("SettingsDriver"); //
  };
  const fetchObtainedState = async () => {
    try {
      const obtainedRickshaw = await getRecord("Rickshaw Driver", [
        where("email", "==", auth.currentUser.email),
      ]);

      setMyPackage(obtainedRickshaw.package);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchObtainedState();
  }, []);

  return (
    <View style={styles.container}>
       <NavigatorBar
        onBackPress={handleBackPress}
        onSettingsPress={handleSettingsPress}
        showBackButton={true}
      />
      <DividerWithText textDisplay={"Package"} style={{ marginBottom: 40 }} />
      <View style={{marginBottom:20}}/>
      {myPackage ? (
        <> 
          <GreenBorderCase initialWidth={300} initialHeight={320} thickness={7}>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}
            >
              <Image source={mergedImages[myPackage]}  style={{ width: 280, height: 300 }}/>
            </View>
          </GreenBorderCase>
        </>
      ) : (
        <GreenBorderCase initialWidth={300} initialHeight={320} thickness={7}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
          >
            <Text style={{ fontSize: 18, textAlign: "center" }}>
              You don't have any Package Installed
            </Text>
          </View>
        </GreenBorderCase>
      )}
    </View>
  );
};

export default PackagePage;
