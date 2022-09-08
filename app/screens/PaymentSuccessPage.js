/* eslint-disable prettier/prettier */
import React from 'react';
import { PaymentIcon } from 'react-native-payment-icons';
import { Image, StyleSheet,View, TouchableOpacity,Button,Alert,Text,ImageBackground  } from 'react-native';

export default function PaymentSuccessPage({navigation}) {
    const Separator = () => (
        <View style={styles.separator} />
    );

    const that = this;
    setTimeout(() => {
        navigation.navigate('LandingScreen')
    },100);
    
    const bgImage = require('../assets/images/background-image.png');
    return(
        <View style={styles.container}>
            <ImageBackground source={bgImage} resizeMode="cover" style={styles.backgroundImage}>
                <Image source={require('../assets/images/qr-code.png')} style={styles.image} />
                <Separator/>
                <Text style={styles.mainText}> Mark your exit when leaving the store</Text>
                <Separator/>
                <Image source={require('../assets/images/thumbs-up.png')} style={styles.imageCircle} />
                <Text style={styles.mainText}> Thank you for shopping with us!</Text>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   alignItems: 'center',
    //   justifyContent: 'center',
    },
    separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    image:{
        width: 200,
        height: 200,
        resizeMode: 'contain',
        justifyContent:'center',
        marginLeft: 90
    },
    imageCircle:{
        width: 200,
        height: 200,
        borderRadius: 200 / 2,
        marginLeft: 90
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
        color: '#2200FF'
    },
    backgroundImage:{
        flex: 1,
        justifyContent: "center",
    }
  });