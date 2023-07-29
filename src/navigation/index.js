import React from 'react';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {AuthNavigation} from '../screens/auth';
import Onboarding from '../screens/onboarding';
import HomeNavigation from './HomeStack';
import AuthStatus from './AuthStatus';

const RootNavigation = createSwitchNavigator(
  {
    AuthStatus: AuthStatus,
    App: HomeNavigation,
    Auth: AuthNavigation,
    Onboarding,
  },
  {
    navigationOptions: {
      header: null,
    },
  },
);

export default createAppContainer(RootNavigation);
