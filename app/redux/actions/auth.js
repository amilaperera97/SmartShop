/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
// import endPoints from '../../api/constants';

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

let timer;

const base64 = require('base-64');

export const authenticate = (userId, token, expiryTime) => {
  return dispatch => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({
      type: AUTHENTICATE,
      userId,
      token,
    });
  };
};

export const signup = (firstName,lastName,username,mobileNumber,password) => {
  return async dispatch => {
    // const register_uri = endPoints.auth_server_host + endPoints.signup;
    const response = await fetch(
      'http://192.168.166.191:9191/auth-service/api/v1/public/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'firstName':firstName.value,
          'lastName':lastName.value,
          'username':username.value,
          'mobileNumber':mobileNumber.value,
          'password':password.value,
          // returnSecureToken: true,
        }),
      }
    );

    if (!response.status) {
      const errorResData = await response.json();
      const message = errorResData.message;
      throw new Error(message);
    } else {
      return true;
    }
    // const resData = await response.json();
    // dispatch(
    //   authenticate(
    //     resData.localId,
    //     resData.idToken,
    //     parseInt(resData.expiresIn) * 1000
    //   )
    // );
    // const expirationDate = new Date(
    //   new Date().getTime() + parseInt(resData.expiresIn) * 1000
    // );
    // saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'http://192.168.166.191:9191/auth-service/oauth/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + base64.encode('mobile' + ':' + 'pin'),
        },
        body: new URLSearchParams({
          'grant_type': 'password',
          'username': email,
          'password': password,
        }).toString(),
      }
    );

    if (!response.status) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'This email could not found!';
      } else if (errorId === 'INVALID_EMAIL') {
        message = 'Enter an valid Email!';
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'This password is not Valid!';
      }
      throw new Error(message);
    }
    const resData = await response.json();
    dispatch(
      authenticate(
        resData.access_token,
        resData.refresh_token,
        parseInt(resData.expires_in) * 1000
      )
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expires_in) * 1000
    );
    saveDataToStorage(resData.access_token, resData.refresh_token, expirationDate);
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token,
      userId,
      expiryDate: expirationDate.toISOString(),
    })
  );
};
