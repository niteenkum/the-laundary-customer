import React from 'react';
import {View, Platform} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {colors} from '../../res/appStyles';
import Setting from './setting';
import ChangePassword from './ChangePassword';
import WebPage from './webpage';
import {defaultHeaderStyles} from '../../navigation/headerStyle';

 

  const SettingStack = createStackNavigator(
	{
		Setting,
		ChangePassword,
		WebPage
	},
	{
		initialRouteName: 'Setting',
		defaultNavigationOptions: {
			...defaultHeaderStyles,
            headerTitle: 'Setting',
			headerRight: <View/>
		},
	}
);

export default SettingStack