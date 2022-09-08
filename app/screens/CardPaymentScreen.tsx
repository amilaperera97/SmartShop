/* eslint-disable prettier/prettier */
import * as React from 'react';
import {
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  View
} from 'react-native';
import CreditCard from 'react-native-credit-card-form-ui';

export default function CardPaymentScreen() {
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
      <Button title="Pay Now" onPress={handleSubmit} />
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
});