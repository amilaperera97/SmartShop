/* eslint-disable prettier/prettier */
import * as React from 'react';
import { Text } from 'react-native';
import { TouchableHighlight,Alert } from 'react-native';
import {
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  View
} from 'react-native';
import CreditCard from 'react-native-credit-card-form-ui';
import { ActivityIndicator } from "react-native";


export default function CardPaymentScreen({navigation}) {
  const creditCardRef = React.useRef() as any;
  const Separator = () => (
    <View style={styles.separator} />
  );

  const handleSubmit = React.useCallback(() => {
    if (creditCardRef.current) {
      const { error, data } = creditCardRef.current.submit();
      console.log('ERROR: ', error);
      console.log('CARD DATA: ', data);

    }
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={20}
      style={styles.container}
    >
      <CreditCard ref={creditCardRef} />
      <Separator/>
      <TouchableHighlight
          style={styles.submit}
          onPress={()=> {
              Alert.alert('Payment Success');
              navigation.navigate('PaymentSuccessPage')
          }}
          underlayColor='#fff'>
            <Text style={styles.submitText}>    Pay Now    </Text>
        </TouchableHighlight>
        
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
    mainText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
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