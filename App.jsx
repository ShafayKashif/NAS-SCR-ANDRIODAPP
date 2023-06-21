import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LandingPage from './app/pages/LandingPage';
import Loading from './app/components/Loading';
import SignUpOption from './app/pages/SignUpOption';
import SignUp from './app/pages/SignUp';
import Notifications from './app/pages/Notifications';
import SignIn from './app/pages/SignIn';
import { Provider as PaperProvider } from 'react-native-paper';

const App = () => {
  const Stack = createNativeStackNavigator();
  
  const screenOptions={headerShown:false}
  return (

    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Landing'>
          <Stack.Screen options={screenOptions} name="Landing" component={LandingPage} />
          <Stack.Screen options={screenOptions} name="Loading" component={Loading} />
          <Stack.Screen options={screenOptions} name="SignUpOption" component={SignUpOption} />
          <Stack.Screen options={screenOptions} name="SignUp" component={SignUp} />
          <Stack.Screen options={screenOptions} name="Notifications" component={Notifications} />
          <Stack.Screen options={screenOptions} name="SignIn" component={SignIn} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>

  );
};

export default App;