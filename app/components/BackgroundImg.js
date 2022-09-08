/* eslint-disable prettier/prettier */
import React from 'react';
import { Platform, ScrollView } from 'react-native';
import {ImageBackground, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {theme} from '../core/theme';

export default function BackgroundImg({children}) {
  const bgImage = require('../assets/images/background-image.png');
  return (
    <ImageBackground
      source={bgImage}
      resizeMode="cover"
      style={styles.backgroundImage}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS == "ios" ? "padding" : "height"} 
  keyboardVerticalOffset={150}
  enabled>
         {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.surface,
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
});
