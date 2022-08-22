import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import LoginScreen from './LoginScreen';
import React from 'react';
import BucketScreen from './BucketScreen';

const Tab = createMaterialBottomTabNavigator();

export default function LandingScreen() {
  return (
    <Tab.Navigator>
    <Tab.Screen name="Receipts" component={LoginScreen} />
    <Tab.Screen name="Bucket" component={BucketScreen} />
    <Tab.Screen name="Help" component={LoginScreen} />
  </Tab.Navigator>
  );
}
