import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';

import Profile from './profile';
import {defaultHeaderStyles} from '../../navigation/headerStyle';

const ProfileStack = createStackNavigator(
  {
    Profile,
  },
  {
    defaultNavigationOptions: {
      ...defaultHeaderStyles,
      headerTitle: 'Profile',
      headerRight: <View />,
    },
  },
);

export default ProfileStack;
