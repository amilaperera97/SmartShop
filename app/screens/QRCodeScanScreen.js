/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button, TouchableHighlight, FlatList, ActivityIndicator,Alert   } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

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
import BackgroundImg from '../components/BackgroundImg';
import Navigator from '../components/Navigator';

export default function QRCodeScanScreen({ navigation })  {
  const dispatch = useDispatch();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [hiddenTag, setHiddenTag] = useState(false);
  const [text, setText] = useState('Not yet scanned')
  const [isLoading, setIsLoading] = useState(false);
  const cartTotalAmount = useSelector(state => state.cart.totalAmount);

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
    setIsLoading(true);
    await dispatch(orderActions.addOrder(cartItems, cartTotalAmount));
    setIsLoading(false);
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
    setText(data);
    // console.log('Type: ' + type + '\nData: ' + data);
    setScanned(true);
    
    const shopInfo = async () => {
      try {
        await AsyncStorage.setItem(
          'shopData',data
        );
      } catch (error) {
        // Error saving data
      }
    };

    // const selectedProduct = new Product(data,'amila','am','','dff',60,1);
    // dispatch(cartActions.addToCart(selectedProduct));
    navigation.navigate('BucketScreen');
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
    <BackgroundImg>
        <View style={styles.barcodebox}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ height: 400, width: 400 }} />
        </View>
        
        <Text style={styles.maintext}>OR</Text>

        <TouchableHighlight
          style={styles.submit}
          onPress={()=>{
              navigation.navigate('QRCodeScanScreen')
          }}
          underlayColor='#fff'>
            <Text style={styles.submitText}>    Find the Shop    </Text>
        </TouchableHighlight>
        <Text style={styles.maintext}></Text>
        
        {scanned && <Button title={'Scan Shop'} onPress={() => setScanned(false)} color="tomato"/>}
    </BackgroundImg>
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
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 20,
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
  submit: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#FF9100',
    borderRadius: 35,
    borderWidth: 1,
    borderColor: '#fff',
  },
  submitText: {
    color: '#2200FF',
    textAlign: 'center',
    fontFamily: 'Sitka Heading',
    fontSize: 20,
    fontWeight: "500"
  }
});