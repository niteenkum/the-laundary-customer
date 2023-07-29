import React, {Component} from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import AllOrders from './allOrders';
import OrderDetail from './orderDetail';
import DriverDetils from './driverDetails';
import {defaultHeaderStyles} from '../../navigation/headerStyle';

const Orderstack = createStackNavigator(
  {DriverDetils, AllOrders, OrderDetail},
  {
    initialRouteName: 'AllOrders',
    defaultNavigationOptions: {
      ...defaultHeaderStyles,
      headerTitle: 'Orders',
    },
  },
);

export default Orderstack;
