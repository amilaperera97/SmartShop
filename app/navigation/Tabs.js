import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import LandingScreen from '../screens/LandingScreen';

const Tab = createMaterialBottomTabNavigator();

export default function LandingScreenTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={LandingScreen} />
      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
}