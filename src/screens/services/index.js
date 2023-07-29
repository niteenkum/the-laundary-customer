import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';

import Features from "./features"
import {defaultHeaderStyles} from '../../navigation/headerStyle';

const ServiceslistStack = createStackNavigator(
  {
    Features,
  },
  {
    defaultNavigationOptions: {
      ...defaultHeaderStyles,
      headerTitle: 'Features',
      headerRight: <View />,
    },
  },
);

export default ServiceslistStack ;
