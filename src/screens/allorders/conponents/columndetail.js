import React from 'react';
import {View} from 'react-native';
import Card from '../../../components/card';
import TextBox from '../../../components/TextBox';
import {outstyle} from '../../styles';
import {SIGN} from '../../../res/ConstVariable';

export const ColumnCard = props => {
  return (
    <View style={props.style}>
      <TextBox type="body3" style={{fontWeight: '500'}}>
        {props.title}
      </TextBox>
      <TextBox type="caption3" style={{fontSize: 13}}>
        {props.body}
      </TextBox>
      {props.children}
    </View>
  );
};
