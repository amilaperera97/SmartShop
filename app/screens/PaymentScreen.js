/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types';
import React from 'react';
import { PaymentIcon } from 'react-native-payment-icons';
import { Image, StyleSheet,View, TouchableOpacity,Button,Alert } from 'react-native';
import { Text } from 'react-native-paper';

export default function PaymentSreen(){
    return(
        // <View >
        //     {/* <Visa style={{ margin: 10, width: 100 }} /> */}
        //     {/* <PaymentIcon type='visa'/> */}
        //     {/* <PaymentIcon type='master' height='40%'/> */}
        //     <PaymentIcon type='paypal' height='40%' style={styles.container} />
        // </View>
        <View style={styles.container}>
            <View style={styles.item}>
                <PaymentIcon type='card' height='15%'/>
            </View>
            <View style={styles.item}>
                <PaymentIcon type='paypal' height='15%'/>
            </View>
            <View style={styles.item}>
                <PaymentIcon type='master' height='15%'/>
            </View>
            <View style={styles.item}>
                <PaymentIcon type='visa' height='15%'/>
            </View>
            <View style={styles.item}>
                <PaymentIcon type='amex' height='15%'/>
            </View>
            <View style={styles.payButton}>
              <Button title="Pay Now" onPress={() => Alert.alert('Payment Success')}/>
            </View>
        </View>

    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start' // if you want to fill rows left to right
  },
  item: {
    width: '50%' // is 50% of container width
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    // color: theme.colors.primary,
  },
  payButton: {
    right: 10,
    left: 10,
    position: 'absolute',
    bottom: 10,
    }
})