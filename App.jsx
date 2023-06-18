import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LandingPage from './app/pages/LandingPage';
import Loading from './app/components/Loading';
import SignUpOption from './app/pages/SignUpOption';
import SignUp from './app/pages/SignUp';


const App = () => {
  const Stack = createNativeStackNavigator();
  
  const screenoptions={headerShown:false}
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Landing'>
        <Stack.Screen options={screenoptions} name="Landing" component={LandingPage} />
        <Stack.Screen options={screenoptions} name="Loading" component={Loading} />
        <Stack.Screen options={screenoptions} name="SignUpOption" component={SignUpOption} />
        <Stack.Screen options={screenoptions} name="SignUp" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;