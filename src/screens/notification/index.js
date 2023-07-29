import React  from 'react';
import { View} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
 
import Notifications from './notification';
import Orderdetilss from '../allorders/orderDetail'
import { defaultHeaderStyles } from '../../navigation/headerStyle';
 
 

 const NotisStack = createStackNavigator(
	{
		Notifications,
		Orderdetilss
	},
	{
		 
		defaultNavigationOptions: {
		...defaultHeaderStyles,
            headerTitle: 'Notification',
			headerRight: <View/>
		},
	}
);

export default NotisStack