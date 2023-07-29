import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {colors} from '../../res/appStyles';

const MenuItem = props => {
  return (
    <TouchableOpacity
      style={{width: '100%'}}
      activeOpacity={0.5}
      onPress={props.onPress}>
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 10,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: props.active ? colors.lightBlue : colors.white,
        }}>
        <View style={{marginLeft: 15}}>{props.icon}</View>
        <Text
          style={{
            flex: 1,
            marginLeft: 25,
            marginTop: 5,
            textAlign: 'left',
            textAlignVertical: 'center',
            fontSize: 15,
            color: colors.tint,
          }}>
          {props.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MenuItem;
