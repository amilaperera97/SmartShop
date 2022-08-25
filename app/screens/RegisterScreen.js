/* eslint-disable prettier/prettier */
import {useState} from 'react';
import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import {theme} from '../core/theme';
import {emailValidator} from '../helpers/emailValidator';
import {passwordValidator} from '../helpers/passwordValidator';
import {nameValidator} from '../helpers/nameValidator';
import {SocialIcon} from 'react-native-elements';

import * as authAction from '../redux/actions/auth';
import { useDispatch } from 'react-redux';

export default function RegisterScreen({navigation}) {
  const [isLoading, setIsLoading] = useState(false);
  const [fname, setFname] = useState({value: '', error: ''});
  const [lname, setLname] = useState({value: '', error: ''});
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [confirmPassword, setConfirmPassword] = useState({value: '', error: ''});
  const [mobileNo, setMobileNo] = useState({value: '', error: ''});
  const dispatch = useDispatch();

  // fname.value = 'Amila';
  // lname.value = 'Amila';
  // email.value = 'amila@gmail.com';
  // mobileNo.value = '0779742564';
  // password.value = 'Amila123';
  // confirmPassword.value = 'Amila123';

  const onSignUpPressed = () => {
    const fNameError = nameValidator(fname.value);
    const lNameError = nameValidator(lname.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value, confirmPassword.value);
    // const mobileNumberError = passwordValidator(mobileNo.value);

    if (emailError || passwordError || fNameError || lNameError) {
      setFname({...fname, error: fNameError});
      setLname({...lname, error: lNameError});
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      return;
    } else {
      let action = authAction.signup(fname,lname,email,mobileNo,password);

      setIsLoading(true);
      try {
        dispatch(action);
        // props.navigation.navigate("Home");
      } catch (error) {
        // setError(error.message);
      }
      setIsLoading(false);
        if (action){
          navigation.reset({
          index: 0,
          routes: [{name: 'LoginScreen'}],
        });
      }
    }
  };

  return (
    <Background>
      <Logo />
      <Header color="#1000FF">Create Account</Header>
      {/* <Icon name="ios-search" size={20} color="#000"/> */}
      <TextInput
        label="First Name"
        returnKeyType="next"
        value={fname.value}
        onChangeText={text => setFname({value: text, error: ''})}
        error={!!fname.error}
        errorText={fname.error}
      />
      <TextInput
        label="Last Name"
        returnKeyType="next"
        value={lname.value}
        onChangeText={text => setLname({value: text, error: ''})}
        error={!!lname.error}
        errorText={lname.error}
      />
      <TextInput
        label="Mobile Number"
        returnKeyType="next"
        value={mobileNo.value}
        onChangeText={text => setMobileNo({value: text, error: ''})}
        error={!!mobileNo.error}
        errorText={mobileNo.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({value: text, error: ''})}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({value: text, error: ''})}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <TextInput
        label="Confirm Password"
        returnKeyType="done"
        value={confirmPassword.value}
        onChangeText={text => setConfirmPassword({value: text, error: ''})}
        error={!!confirmPassword.error}
        errorText={confirmPassword.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{marginTop: 24}}
        color="#1000FF">
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>or continue with </Text>
      </View>
      <View style={styles.row}>
        <SocialIcon
          type="facebook"
          onPress={() => {
            alert('facebook');
          }}
        />
        <SocialIcon
          type="google"
          onPress={() => {
            alert('google');
          }}
        />
        <SocialIcon
          type="twitter"
          onPress={() => {
            alert('twitter');
          }}
        />
      </View>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});
