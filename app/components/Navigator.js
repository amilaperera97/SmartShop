/* eslint-disable prettier/prettier */
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text, View, StyleSheet, Button, FlatList, ActivityIndicator,Alert   } from 'react-native';

import React from 'react';
import BucketScreen from '../screens/BucketScreen';
import ReceiptsScreen from '../screens/ReceiptsScreen';
import HelpScreen from '../screens/HelpScreen';
import StartShoppingScreen from '../screens/StartShoppingScreen';

const Tab = createMaterialBottomTabNavigator();

export default function Navigator({ navigation }) {
  return (
    <Tab.Navigator
      initialRouteName="StartShoppingScreen"
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
        name="StartShoppingScreen"
        component={StartShoppingScreen}
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
