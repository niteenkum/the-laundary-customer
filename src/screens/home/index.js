import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import Home from './home';
import WashFold from './washfold';
import ServiceDetails from './serviceDetails';
import YourBag from './yourBag';
import ScheduleLocation from './schedule/location';
import ScheduleDateTime from './schedule/dateTime';
import Payment from './schedule/payment';
import PromoCodeScreen from './schedule/promocodes';
import ConfirmOrder from './schedule/confirm';
import Profile from '../Profile/profile';
import Offers from './offers';
import AddressList from './schedule/addresslist';
import ProductList from './Product';
import PriceList from '../priceList/pricelist';

import {defaultHeaderStyles} from '../../navigation/headerStyle';

export const HomeStack = createStackNavigator(
  {
    Home,
    WashFold,
    YourBag,
    PriceList,
    AddressList,
    ScheduleLocation,
    ServiceDetails,
    ScheduleDateTime,
    Payment,
    ConfirmOrder,
    Profile,
    PromoCodeScreen,
    Offers,
    Products: {
      screen: ProductList,
    },
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      ...defaultHeaderStyles,
      headerTitle: 'Home',
      headerRight: <View />,
    },
  },
);
export default HomeStack;
// const HomeNavigation = createDrawerNavigator({
// 	HomeStack,
// 	AllOrdersNavigation
//     },{
// 		contentComponent:Drawer
// 	  });

//   export default  createAppContainer(HomeNavigation)
