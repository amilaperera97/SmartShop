/* eslint-disable prettier/prettier */
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import BucketScreen from './BucketScreen';
import ReceiptsScreen from './ReceiptsScreen';
import HelpScreen from './HelpScreen';

const Tab = createMaterialBottomTabNavigator();

export default function LandingScreen() {
  return (
    <Tab.Navigator
      initialRouteName="Bucket"
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      barStyle={{ backgroundColor: '#694fad' }}>
      <Tab.Screen name="Receipts" component={ReceiptsScreen} />
      <Tab.Screen name="Bucket" component={BucketScreen} />
      <Tab.Screen name="Help" component={HelpScreen} />
    </Tab.Navigator>
  );
}
