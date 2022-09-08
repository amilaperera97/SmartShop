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
import CardPaymentScreen from './app/screens/CardPaymentScreen';
import PaymentSuccessPage from './app/screens/PaymentSuccessPage';
import StartShoppingScreen from './app/screens/StartShoppingScreen';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Text,
  View,
  StyleSheet,
  Button,
  FlatList,
  ActivityIndicator,
  Alert,
  Icon,
  Image,
} from 'react-native';

import cartReducer from './app/redux/reducers/cart';
import ordersReducer from './app/redux/reducers/orders';
import ReduxThunk from 'redux-thunk';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {TouchableOpacity} from 'react-native';
import Logo from './app/components/Logo';

const Stack = createStackNavigator();

const rootReducer = combineReducers({
  cart: cartReducer,
  orders: ordersReducer,
});

// const store = createStore(rootReducer, composeWithDevTools());
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App: () => Node = () => {
  const navigationOptions = () => ({
    headerStyle: {
      backgroundColor: '#A4A2D3',
    },
    headerTitle: () => (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}>
        <Image
          source={require('./app/assets/images/logo.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    ),
    headerRight: () => (
      <TouchableOpacity onPress={() => console.log('test')}>
        <View style={styles.menuContainer}>
          <MaterialCommunityIcons name="cog" color="black" size={60} />
        </View>
      </TouchableOpacity>
    ),
    headerLeft: () => (
      <TouchableOpacity onPress={() => console.log('test')}>
        <View style={styles.menuContainer}>
          <MaterialCommunityIcons
            name="account-circle"
            color="black"
            size={60}
          />
        </View>
      </TouchableOpacity>
    ),
  });

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="LoginScreen"
          screenOptions={{
            headerShown: true,
          }}>
          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{headerShown: false}}
          />
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
            options={navigationOptions}
          />
          <Stack.Screen
            name="BucketScreen"
            component={BucketScreen}
            options={navigationOptions}
          />
          <Stack.Screen
            name="CartScreen"
            component={CartScreen}
            options={navigationOptions}
          />
          <Stack.Screen
            name="PaymentScreen"
            component={PaymentScreen}
            options={navigationOptions}
          />
          <Stack.Screen
            name="QRCodeScanScreen"
            component={QRCodeScanScreen}
            options={navigationOptions}
          />
          <Stack.Screen
            name="CardPaymentScreen"
            component={CardPaymentScreen}
            options={navigationOptions}
          />
          <Stack.Screen
            name="PaymentSuccessPage"
            component={PaymentSuccessPage}
            options={navigationOptions}
          />
          <Stack.Screen
            name="StartShoppingScreen"
            component={StartShoppingScreen}
            options={navigationOptions}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  headerContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 15,
    fontFamily: 'CinzelDecorative_400Regular',
  },
  menu: {
    // color: colors.primary,
    alignSelf: 'center',
    // marginLeft: height * -0.13,
  },
  image: {
    // width: 170,
    // height: 110,
    // marginBottom: 6,
    justifyContent: 'center',
    alignItems: 'center',
    width: 98,
    marginLeft: 50,
  },
});

export default App;
