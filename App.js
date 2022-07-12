import React from 'react';
import type {Node} from 'react';
import {Provider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {theme} from './app/core/theme';
import RegisterScreen from './app/screens/RegisterScreen';
import {useColorScheme} from 'react-native';

const Stack = createStackNavigator();

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="RegisterScreen"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default App;
