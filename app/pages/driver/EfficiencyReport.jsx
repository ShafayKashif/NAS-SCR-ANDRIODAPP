import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import GreenBorderCase from '../../components/GreenBorderCase'
import { getRecord, getRecordById } from '../../global/firebaseFunctions'
import Loading from '../../components/Loading'
import { where } from "firebase/firestore";
import { auth } from '../../config/firebase'
import DividerWithText from '../../components/DividerText'
import NavigatorBar from "../../components/NavigatorBar";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1E3648",
        justifyContent: "center",
        alignItems: "center",
    },
});

const EfficiencyReport = ({navigation}) => {
  
    const [rickshawPerson, setRickshawPerson] = useState(null);
    const [rickshaw, setRickshaw] = useState(null);

    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options);
  
    const handleBackPress = () => {
    navigation.goBack();
  };
    const handleSettingsPress = () => {
    navigation.navigate("SettingsDriver");
  };
    const fetchObtainedState = async () => {
        try {
            const obtainedRickshaw = await getRecord("Rickshaw Driver", [
                where("email", "==", auth.currentUser.email),
            ]);
            const obtainedState = await getRecordById(
                "Rickshaw",
                obtainedRickshaw.assigned
            );
            setRickshawPerson(obtainedRickshaw)
            setRickshaw(obtainedState);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchObtainedState();
    }, []);

    return (
        <View style={styles.container}>
            {rickshaw ? (
                <>  
                    <NavigatorBar
                      onBackPress={handleBackPress}
                      onSettingsPress={handleSettingsPress}
                      showBackButton={true}
                    />
                    <DividerWithText textDisplay={"Efficiency Report"} style={{ marginBottom: 20 }} />
                    <GreenBorderCase initialWidth={300} initialHeight={320} thickness={7}>

                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{formattedDate}</Text>


                        <View style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", paddingHorizontal: 20, paddingVertical: 10 }}>

                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                                <Text style={{ fontWeight: "bold", color: "#000", fontSize: 16 }}>
                                    Rickshaw ID:
                                </Text>
                                <Text style={{ color: "#000", marginLeft: 10, fontSize: 16 }}>
                                    {rickshawPerson.assigned}
                                </Text>
                            </View>

                            <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}>
                                <Text style={{ fontWeight: "bold", color: "#000", fontSize: 16 }}>
                                    Energy Consumed:
                                </Text>
                                <Text style={{ color: "#000", marginLeft: 10, fontSize: 16 }}>
                                    {Math.ceil(parseFloat(rickshaw.distanceTravelled) * 100)} Wh/Km
                                </Text>
                            </View>

                            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                                <Text style={{ fontWeight: "bold", color: "#000", fontSize: 16 }}>
                                    Distance Travelled:
                                </Text>
                                <Text style={{ color: "#000", marginLeft: 10, fontSize: 16 }}>
                                    {Math.ceil(rickshaw.distanceTravelled)} km
                                </Text>
                            </View>

                            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                                <Text style={{ fontWeight: "bold", color: "#000", fontSize: 16 }}>
                                    Number of swaps today:
                                </Text>
                                <Text style={{ color: "#000", marginLeft: 10, fontSize: 16 }}>
                                    {rickshaw.swapsToday}
                                </Text>
                            </View>

                            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                                <Text style={{ fontWeight: "bold", color: "#000", fontSize: 16 }}>
                                    Number of swaps this Month:
                                </Text>
                                <Text style={{ color: "#000", marginLeft: 10, fontSize: 16 }}>
                                    {rickshaw.swapsThisMonth}
                                </Text>
                            </View>

                            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                                <Text style={{ fontWeight: "bold", color: "#000", fontSize: 16 }}>
                                    Total swaps (all time)
                                </Text>
                                <Text style={{ color: "#000", marginLeft: 10, fontSize: 16 }}>
                                    {rickshaw.totalSwaps}
                                </Text>
                            </View>

                            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                                <Text style={{ fontWeight: "bold", color: "#000", fontSize: 16 }}>
                                    You saved a total of:
                                </Text>
                                <Text style={{ color: "#000", marginLeft: 10, fontSize: 16 }}>
                                    {Math.ceil(rickshaw.treesSaved)} trees
                                </Text>

                            </View>
                        </View>

                    </GreenBorderCase>

                    <View style={{ marginTop: 100 }} />

                    <View style={{ position: 'absolute', bottom: 0, alignItems: 'center', paddingVertical: 16, marginTop: 400 }}>
                        <Text style={{ color: 'white', fontSize: 14 }}>These Metrics are for the current Month</Text>
                    </View>
                </>)
                : (<Loading />)}

        </View>
    );
};

export default EfficiencyReport;
