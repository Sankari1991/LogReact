import * as React from 'react';
import {Button, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  TransitionPresets,
} from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import OtpScreen from '../screens/OtpScreen';
import HomeScreen from '../screens/HomeScreen';
import BranchScreen from '../screens/BranchScreen';
import AddScreen from '../screens/AddScreen';

const AppStack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator>
        <AppStack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{title: 'LogFace'}}
        />
        <AppStack.Screen
          name="OtpScreen"
          component={OtpScreen}
          options={{headerBackVisible: false, title: 'OTP Screen'}}
        />
        <AppStack.Screen
          name="CompanyScreen"
          component={HomeScreen}
          options={{headerBackVisible: false, title: 'Company Screen'}}
        />
        <AppStack.Screen
          name="BranchScreen"
          component={BranchScreen}
          options={{headerBackVisible: false, title: 'Branch Screen'}}
        />
        <AppStack.Screen
          name="AddScreen"
          component={AddScreen}
          options={{headerBackVisible: false, title: 'Add Screen'}}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
