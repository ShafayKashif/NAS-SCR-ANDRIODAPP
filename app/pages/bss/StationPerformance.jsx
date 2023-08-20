import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import LightGreenCase from "../../components/LightGreenCase";
import Chart from "../../components/Chart";
import Loading from "../../components/Loading";
import NavigatorBar from "../../components/NavigatorBar";
import { getRecord, getRecordById } from "../../global/firebaseFunctions";
import { where } from "firebase/firestore";
import { auth } from "../../config/firebase";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E3648",
    justifyContent: "center",
    alignItems: "center",
  },
});

const StationPerformance = ({ navigation }) => {
  const [stationInfo, setStationInfo] = useState(null);
  const [valuesArray, setValuesArray] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSettingsPress = () => {
    navigation.navigate("SettingsBss");
  };

  const fetchObtainedState = async () => {
    try {
      const obtainedOfficer = await getRecord("Bss Officer", [
        where("email", "==", auth.currentUser.email),
      ]);
      const obtainedState = await getRecordById(
        "Station",
        obtainedOfficer.station
      );
      setStationInfo(obtainedState);
      const normalMonthOrder = Object.keys({
        January: 0,
        February: 1,
        March: 2,
        April: 3,
        May: 4,
        June: 5,
        July: 6,
        August: 7,
        September: 8,
        October: 9,
        November: 10,
        December: 11,
      })
        .map((month) => [month, obtainedState.pastSwaps[month]])
        .reduce((acc, [month, value]) => {
          acc[month] = value;
          return acc;
        }, {});

      setValuesArray(Object.values(normalMonthOrder));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchObtainedState();
  }, []);

  return (
    <View style={styles.container}>
     
      {stationInfo ? (
        <>
         <NavigatorBar
        onBackPress={handleBackPress}
        onSettingsPress={handleSettingsPress}
        showBackButton={true}
      />
          <View style={{ marginTop: 50, marginBottom: 30 }}>
            <LightGreenCase initialHeight={120} initialWidth={320}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontWeight: "bold", color: "#000" }}>
                    Number of Swaps This month:
                  </Text>
                  <Text style={{ color: "#000", marginLeft: 10 }}>
                    {stationInfo.swapsThisMonth}
                  </Text>
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginVertical: 10,
                  }}
                >
                  <Text style={{ fontWeight: "bold", color: "#000" }}>
                    Number of Swaps Today:
                  </Text>
                  <Text style={{ color: "#000", marginLeft: 10 }}>
                    {stationInfo.swapsToday}
                  </Text>
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontWeight: "bold", color: "#000" }}>
                    Number of Swaps In Total:
                  </Text>
                  <Text style={{ color: "#000", marginLeft: 10 }}>
                    {stationInfo.totalSwaps}
                  </Text>
                </View>
              </View>
            </LightGreenCase>
          </View>

          <Text
            style={{
              color: "#e1f0dc",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 18,
              marginBottom: 20,
            }}
          >
            Monthly Analytics
          </Text>

          <Chart
            data={{
              datasets: [
                {
                  data: valuesArray,
                },
              ],
            }}
          />
        </>
      ) : (
        <View>
          <Loading />
        </View>
      )}
    </View>
  );
};

export default StationPerformance;
