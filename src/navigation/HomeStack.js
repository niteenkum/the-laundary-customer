import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import Drawer from '../components/Drawer';
import Logout from '../screens/Logout';

import HomeStack from '../screens/home';
import Orderstack from '../screens/allorders';
import NotiStack from '../screens/notification';
import ProfileStack from '../screens/Profile';
import SettingStack from '../screens/settings';
import PriceListStack from '../screens/priceList';
import ServiceslistStack from '../screens/services'

const HomeNavigation = createDrawerNavigator(
  {
    HomeStack,
    Orderstack,
    NotiStack,
    ProfileStack,
    SettingStack,
    PriceListStack,
    ServiceslistStack,
    // 	AboutUs,
    Logout,
  },
  {
    contentComponent: Drawer,
  },
);

export default createAppContainer(HomeNavigation);
