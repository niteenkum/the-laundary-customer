import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import { colors } from '../res/appStyles';
export const Loader = props => {
  const {
    size = 'small',
    title = '',
    loader = true,
    textStyle = {},
    style = {flex: 1},
  } = props; //size =props.size=='large'?'large':'small'

  return (
    <View
      style={[
        {padding: 5, alignItems: 'center', justifyContent: 'center'},
        style,
      ]}>
      {loader ? <ActivityIndicator color={colors.darkGrey} size={size} /> : null}
      {!loader ? <Text style={textStyle}>{title}</Text> : null}
    </View>
  );
};
