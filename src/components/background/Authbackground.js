import React, {Component, Fragment} from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
} from 'react-native';
 
const isIos = Platform.OS == 'ios';

const AuthBackground = props => {
 
  return (
   <SafeAreaView style={[{flex: 1} ]}>
        <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            style={[{flex: 1,},props.style]}
            behavior={isIos ? 'padding' : null}>
             
              {props.children}
             
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
  )
};
export default AuthBackground;
