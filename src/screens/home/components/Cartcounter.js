import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {colors} from '../../../res/appStyles';
import {SvgIcon} from '../../../utils/Svgicons';
export const CartCounter = props => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginRight: 10,
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}>
      <TouchableOpacity style={{width: 20, height: 20}} onPress={props.onPress}>
        <SvgIcon type="Cart" color="#fff" />
        <View
          style={{
            backgroundColor: colors.orange,
            borderRadius: 10,
            borderWidth: 0.1,
            position: 'absolute',
            right: -10,
            backgroundColor: colors.orange,
            top: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{fontSize: 10, color: '#FFF'}}>{`  ${props.count}  `}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
