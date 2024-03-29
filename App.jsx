import * as React from "react";
import { Suspense } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Shared screens
import LandingPage from "./app/pages/LandingPage";
import Loading from "./app/components/Loading";
import SignUpOption from "./app/pages/SignUpOption";
import SignUp from "./app/pages/SignUp";

import Notifications from "./app/pages/Notifications";
import SignIn from "./app/pages/SignIn";

import ChangePassword from "./app/pages/ChangePassword";
import EditProfile from "./app/pages/EditProfile";

// BSS only screens
import StationDashboard from "./app/pages/bss/StationDashboard";
import StationPerformance from "./app/pages/bss/StationPerformance";
import TechnicalSupportBss from "./app/pages/bss/TechnicalSupportBss";
import ScheduleMaintenance from "./app/pages/bss/ScheduleMaintenance";
import BatteryInformationStation from "./app/pages/bss/BatteryInformationStation";
import SettingsBss from './app/pages/bss/SettingsBss';

// Driver only screens
import DriverDashboard from "./app/pages/driver/DriverDashboard";
import TechnicalSupportDriver from "./app/pages/driver/TechnicalSupportDriver";
import BatteryInformationDriver from "./app/pages/driver/BatteryInformationDriver";
import PackagePage from './app/pages/driver/PackagePage';
import SettingsDriver from './app/pages/driver/SettingsDriver';
import EfficiencyReport from './app/pages/driver/EfficiencyReport';
import FeedbackForm from "./app/pages/driver/FeedbackForm";

// Testing screens
import TestFunctions from "./app/pages/test/TestFunctions";
import TestCarousel from "./app/pages/test/TestScreen";

import { Provider as PaperProvider } from "react-native-paper";

const App = () => {
  const Stack = createNativeStackNavigator();

  const screenOptions = { headerShown: false };
  return (
    <PaperProvider>
      <Suspense fallback={<Loading />}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            {/* Shared */}
            <Stack.Screen options={screenOptions} name="Landing" component={LandingPage}/>
            <Stack.Screen options={screenOptions} name="Loading" component={Loading}/>
            <Stack.Screen options={screenOptions} name="SignUpOption" component={SignUpOption}/>
            <Stack.Screen options={screenOptions} name="SignUp" component={SignUp}/>
            <Stack.Screen options={screenOptions} name="Notifications" component={Notifications}/>
            <Stack.Screen options={screenOptions} name="SignIn" component={SignIn}/>

            {/* Auth */}
            <Stack.Screen options={screenOptions} name="ChangePassword" component={ChangePassword}/>
            <Stack.Screen options={screenOptions} name="EditProfile" component={EditProfile}/>

            {/* Station screens */}
            <Stack.Screen options={screenOptions} name="StationDashboard" component={StationDashboard}/>
            <Stack.Screen options={screenOptions} name="StationPerformance" component={StationPerformance}/>
            <Stack.Screen options={screenOptions} name="TechnicalSupportBss" component={TechnicalSupportBss}/>
            <Stack.Screen options={screenOptions} name="ScheduleMaintenance" component={ScheduleMaintenance}/>
            <Stack.Screen options={screenOptions} name="BatteryInformationStation" component={BatteryInformationStation}/>
            <Stack.Screen options={screenOptions} name="SettingsBss" component={SettingsBss}/>

            {/* Driver screens */}
            <Stack.Screen options={screenOptions} name="DriverDashboard" component={DriverDashboard}/>
            <Stack.Screen options={screenOptions} name="TechnicalSupportDriver" component={TechnicalSupportDriver}/>
            <Stack.Screen options={screenOptions} name="BatteryInformationDriver" component={BatteryInformationDriver}/>
            <Stack.Screen options={screenOptions} name="PackagePage" component={PackagePage}/>
            <Stack.Screen options={screenOptions} name="SettingsDriver" component={SettingsDriver}/>
            <Stack.Screen options={screenOptions} name="EfficiencyReport" component={EfficiencyReport}/>
            <Stack.Screen options={screenOptions} name="FeedbackForm" component={FeedbackForm}/>

            {/* Testing */}
            <Stack.Screen options={screenOptions} name="TestFuncs" component={TestFunctions}/>
            <Stack.Screen options={screenOptions} name="TestScreen" component={TestCarousel}/>
          </Stack.Navigator>
        </NavigationContainer>
      </Suspense>
    </PaperProvider>
  );
};

export default App;
