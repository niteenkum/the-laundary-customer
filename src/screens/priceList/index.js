import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';

import PriceList from './pricelist';
import {defaultHeaderStyles} from '../../navigation/headerStyle';

const PriceListStack = createStackNavigator(
  {
    PriceList,
  },
  {
    defaultNavigationOptions: {
      ...defaultHeaderStyles,
      headerTitle: 'PriceList',
      headerRight: <View />,
    },
  },
);

export default PriceListStack;
