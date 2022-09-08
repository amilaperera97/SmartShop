/* eslint-disable prettier/prettier */
import React from 'react';
import {Image, Text, StyleSheet,TouchableHighlight} from 'react-native';
import BackgroundImg from '../components/BackgroundImg';
import Header from '../components/Header';
import {Separator} from '../components/Separator';

export default function StartShoppingScreen({navigation}) {
  return (
    <BackgroundImg>
      <Header />
      <Text style={styles.mainText}> Hello, User</Text>
      <Separator />
      <Text style={styles.mainText}>
        To start Shopping, head to nearest Smartshop!
      </Text>
      <TouchableHighlight
        style={styles.submit}
        onPress={()=>{
            navigation.navigate('QRCodeScanScreen')
        }}
        underlayColor='#fff'>
            <Text style={styles.submitText}>    Start Shopping    </Text>
        </TouchableHighlight>
    </BackgroundImg>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    marginTop: 0,
    width: 300,
    // backgroundColor: 'yellow',
    textShadowColor: '#2200FF',
    marginLeft: 45,
    color: '#2200FF',
    fontFamily: 'Sitka Heading',
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
