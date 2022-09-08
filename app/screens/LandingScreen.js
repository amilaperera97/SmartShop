/* eslint-disable prettier/prettier */
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text, View, StyleSheet, Button, FlatList, ActivityIndicator,Alert   } from 'react-native';

import React from 'react';
import Navigator from '../components/Navigator';

const Tab = createMaterialBottomTabNavigator();

export default function LandingScreen({ navigation }) {
  return (
    <Navigator/>
    
  );
}
