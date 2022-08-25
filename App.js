import React from 'react';
import type {Node} from 'react';
// import {Provider} from 'react-native-paper';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {theme} from './app/core/theme';
import RegisterScreen from './app/screens/RegisterScreen';
import {useColorScheme} from 'react-native';
import LoginScreen from './app/screens/LoginScreen';
import ResetPasswordScreen from './app/screens/ResetPasswordScreen';
import LandingScreen from './app/screens/LandingScreen';
import BucketScreen from './app/screens/BucketScreen';
import CartScreen from './app/screens/CartScreen';
import PaymentScreen from './app/screens/PaymentScreen';
import QRCodeScanScreen from './app/screens/QRCodeScanScreen';

import {
  Text,
  View,
  StyleSheet,
  Button,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';

import cartReducer from './app/redux/reducers/cart';
import ordersReducer from './app/redux/reducers/orders';
import ReduxThunk from 'redux-thunk';
import {createStore, combineReducers, applyMiddleware} from 'redux';

const Stack = createStackNavigator();

const rootReducer = combineReducers({
  cart: cartReducer,
  orders: ordersReducer,
});

// const store = createStore(rootReducer, composeWithDevTools());
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App: () => Node = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="BucketScreen"
          screenOptions={{
            headerShown: true,
          }}>
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
          <Stack.Screen
            name="LandingScreen"
            component={LandingScreen}
            options={({navigation}) => ({
              headerTitle: () => <Text>My Bucket</Text>,
              headerRight: () => (
                <Button
                  title="Logout"
                  onPress={() => navigation.navigate('LoginScreen')}
                />
              ),
              headerLeft: () => (
                <Button
                  title="back home"
                  onPress={() => navigation.navigate('LoginScreen')}
                />
              ),
            })}
          />
          <Stack.Screen name="BucketScreen" component={BucketScreen} />
          <Stack.Screen name="CartScreen" component={CartScreen} />
          <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
          <Stack.Screen name="QRCodeScanScreen" component={QRCodeScanScreen} />
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
