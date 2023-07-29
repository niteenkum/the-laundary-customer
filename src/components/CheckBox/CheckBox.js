import React, {useContext, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';

import {scales, colors} from '../../res/appStyles';
const CheckBox = props => {
 
  return (
    <TouchableOpacity
      onPress={() => props.setCheck()}
      style={[
        {
          borderWidth: 1,
          width: scales(20),
          height: scales(20),
          borderColor: colors.primary,
          borderRadius: scales(10),
          justifyContent: 'center',
          alignItems: 'center',
        },
        {borderColor: props.check ? colors.primary : colors.grey},
      ]}>
      {props.check ? (
        <View style={{width: scales(14), height: scales(14),backgroundColor:colors.primary,borderRadius:scales(7),}} />
      ) : null}
    </TouchableOpacity>
  );
};
export default CheckBox;
