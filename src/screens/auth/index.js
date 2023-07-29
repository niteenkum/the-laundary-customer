import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import webscreen from '../settings/webpage'
import Login from './login';
import Register from './register';
  import Otp from './otp';
  import Welcome from './welcome';
  import ForgetPassword from './forgetpassword'
export const AuthNavigation = createStackNavigator(
    {ForgetPassword,
      Welcome,
      Login,
      Register,
       Otp,
       webscreen:{
         screen:webscreen,
         navigationOptions:{
           headerShown:true
         }
       }
    },
    {
      initialRouteName: 'Welcome',
      defaultNavigationOptions: {
		    headerShown: false
		},
    }
  );


