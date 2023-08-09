import React, {useState} from 'react'
import {View, Text} from 'react-native'
import {GreenBorderCase} from '../../components/GreenBorderCase'
import {getRecord, getRecordById} from '../../global/firebaseFunctions'

const EfficiencyReport=()=>{
    const [rickshaw, setRickshawInfo] = useState(null);
  
    const fetchObtainedState = async () => {
      try {
        const obtainedOfficer = await getRecord("Rickshaw Driver", [
          where("email", "==", auth.currentUser.email),
        ]);
        const obtainedState = await getRecordById(
          "Rickshaw",
          obtainedOfficer.station
        );
        setStationInfo(obtainedState);
      } catch (err) {
        console.log(err);
      }
    };

    return (
        <View>
            <Text>
                Efficiency Report
            </Text>
        </View>
    );

}

export default EfficiencyReport;