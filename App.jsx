import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import Pg from './app/components/pg';
import Loading from './app/components/loading';


const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Loading'>
        <Stack.Screen name="Loading" component={Loading} />
        <Stack.Screen name="Pg" component={Pg} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;