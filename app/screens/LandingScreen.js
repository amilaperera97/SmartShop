/* eslint-disable prettier/prettier */
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text, View, StyleSheet, Button, FlatList, ActivityIndicator,Alert   } from 'react-native';

import React from 'react';
import BucketScreen from './BucketScreen';
import ReceiptsScreen from './ReceiptsScreen';
import HelpScreen from './HelpScreen';
import QRCodeScanScreen from '../screens/QRCodeScanScreen';

const Tab = createMaterialBottomTabNavigator();

export default function LandingScreen({ navigation }) {
  return (
    <Tab.Navigator
      initialRouteName="QRCodeScanScreen"
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      barStyle={{ backgroundColor: '#694fad' }}>
      <Tab.Screen
        name="Receipts"
        component={ReceiptsScreen}
        options={{
          tabBarLabel: 'Receipts',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="view-list" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Bucket"
        component={BucketScreen}
        options={{
          tabBarLabel: 'Bucket',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="shopping" color={color} size={26} />
          )
        }}
      />
      <Tab.Screen
        name="Help"
        component={HelpScreen}
        options={{
          tabBarLabel: 'Help',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="help" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
