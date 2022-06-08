import React, {Component} from 'react';

import Onboarding from '../screens/Onboard';
import Product from '../screens/Product';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function Entry() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode="screen"
        screenOptions={{
          headerStatusBarHeight: 0,
          headerShown: true,
        }}
        initialRouteName={'Onboarding'}>
        <Stack.Group screenOptions={{}}>
          <Stack.Screen
            name="Onboarding"
            component={Onboarding}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Product"
            component={Product}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Entry;
