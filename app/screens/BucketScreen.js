/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button, FlatList, ActivityIndicator,Alert,TouchableHighlight   } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { useSelector, useDispatch } from 'react-redux';
import Colors from '../constants/Colors';
import CartItem from '../components/shop/CartItem';
import { removeFromCart } from '../redux/actions/cart';
import * as orderActions from '../redux/actions/orders';
import Card from '../components/UI/Card';
import * as cartActions from '../redux/actions/cart';
import PRODUCTS from '../data/dummy-data';
import Product from '../models/product';

import { AsyncStorage } from '@react-native-async-storage/async-storage';

export default function BucketScreen({ navigation })  {
  const dispatch = useDispatch();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned')
  const [isLoading, setIsLoading] = useState(false);
  const cartTotalAmount = useSelector(state => state.cart.totalAmount);

  const Separator = () => (
    <View style={styles.separator} />
  );

  const retrieveShopData = async () => {
    try {
      const value = await AsyncStorage.getItem('shopData');
      if (value !== null) {
        // We have data!!
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const cartItems = useSelector(state => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });

  const sendOrderHandler = async () => {
    // setIsLoading(true);
    // await dispatch(orderActions.addOrder(cartItems, cartTotalAmount));
    // setIsLoading(false);
    navigation.navigate('PaymentScreen');
  };

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })()
  }

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    setText(data)
    console.log('Type: ' + type + '\nData: ' + data);
    setScanned(true);
    const selectedProduct = new Product(data,'amila','Semi Milked Powder','','dff',60,1);
    dispatch(cartActions.addToCart(selectedProduct));
  };

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>)
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
      </View>)
  }
  
  // Return the View
  return (
    <View style={styles.container}>
       {/* <HeaderButtons HeaderButtonComponent={LoginScreen}>
              <Item
                title="menu"
                iconName="bars"
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>  */}
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 480, width: 450 }} />      
      </View>
      <Separator />
      {scanned && 
      <TouchableHighlight
          style={styles.submit}
          onPress={() => setScanned(false)}
          underlayColor='#fff'>
          <Text style={styles.submitText}>    Scan Again    </Text>
      </TouchableHighlight> }
      <Separator />

      <FlatList
        data={cartItems}
        keyExtractor={item => item.productId}
        renderItem={itemData => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            onRemove={() => {
              dispatch(removeFromCart(itemData.item.productId));
            }}
          />
        )}
      />
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Outstanding : 
          <Text style={styles.amount}>
            £{Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.primary} />
        ) : (
          <Button
            color={Colors.accent}
            title="Pay Now"
            disabled={cartItems.length === 0}
            onPress={sendOrderHandler}
          />
        )}
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'column', 
    justifyContent: 'space-between'
  },
  maintext: {
    fontSize: 16,
    margin: 20,
    alignItems: 'center',
    flexDirection: 'column', 
    justifyContent: 'space-between',
    flex: 1
  },
  barcodebox: {
    alignItems: 'center',
    flexDirection: 'column', 
    justifyContent: 'space-between',
    height: 130,
    width: 350,
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: 'tomato'
  },
  screen: { margin: 20 },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    right: 10,
    left: 10,
    position: 'absolute',
    bottom: 0,
  },
  summaryText: {
    fontFamily: 'OpenSans_Bold',
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  submit: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  submitText: {
    color: '#fff',
    textAlign: 'center',
  }
});