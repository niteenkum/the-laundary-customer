import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Platform, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { colors } from '../../res/appStyles';
import AboutUs from './aboutus';
import { defaultHeaderStyles } from '../../navigation/headerStyle';

const isIos = Platform.OS === 'ios';
const imgHgt = isIos ? 30 : 40;

export  const AboutUsNavigation = createStackNavigator(
	{
	    	AboutUs,
	},
	{
		initialRouteName: 'AboutUs',
		defaultNavigationOptions: {
		...defaultHeaderStyles,
            headerTitle: 'About Us',
			headerRight: <View/>
		},
	}
);