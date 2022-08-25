/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import {theme} from '../core/theme';
import {emailValidator} from '../helpers/emailValidator';
import {passwordValidator} from '../helpers/passwordValidator';
import * as authAction from '../redux/actions/auth';
import { useDispatch } from 'react-redux';

export default function LoginScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' });
  const dispatch = useDispatch();

  // email.value = 'amilaperera98@gmail.com';
  // password.value ='apass';

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value,password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError });
      return;
    }
    let action = authAction.login(email.value, password.value);
    setIsLoading(true);
    try {
      dispatch(action);
      // props.navigation.navigate("Home");
    } catch (error) {
      // setError(error.message);
    }
    setIsLoading(false);
    if (action) {
      navigation.reset({
      index: 0,
      routes: [{name: 'LandingScreen'}],
    });
    }
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: 'LandingScreen' }],
    // });
  };

  return (
    <Background>
      <Logo />
      <Header>Welcome back.</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
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
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed} color="#1000FF">
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});
