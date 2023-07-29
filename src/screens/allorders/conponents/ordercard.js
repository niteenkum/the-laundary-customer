import React from 'react';
import {View, Image} from 'react-native';
import Card from '../../../components/card';
import TextBox from '../../../components/TextBox';
import {outstyle} from '../../styles';
import {SIGN} from '../../../res/ConstVariable';
import {colors} from '../../../res/appStyles';
import {onChangeDateFormate} from '../../../utils/funcations';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const OrderCard = props => {
  const {LngCode = {}} = props;
  return (
    <Card type="list" style={props.style}>
      <View style={outstyle.orderTitle}>
        <TextBox type="body3">
          {LngCode.LABEL_ORDER_ID} : #{props.id}
        </TextBox>
        {/* {props.total_price > 1 ? (
          <TextBox type="body4">
            {SIGN}
            {props.total_price}
          </TextBox>
        ) : null} */}
        {props.status === 6 ? (
          <TouchableOpacity>
            <Image
              resizeMode="cover"
              source={props.Image}
              style={{width: 30, height: 30, tintColor: colors.primary}}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      <TextBox type="body2">
        Estimated Clothes: {''}
        {props.estimated_clothes}
      </TextBox>
      <TextBox type="body2">
        Store: {''}
        {props.lname}
      </TextBox>

      <View style={{flexDirection: 'row'}}>
        <TextBox type="body2" color="tint" style={{flex: 1}}>
          {props.status_title}
        </TextBox>
        <TextBox type="body1" style={{color:colors.grey }}>
       { `Payment Type   ${props.payment_status}`}
        </TextBox>
      </View>
      <View style={{top:-10}}>{props.children}</View>
    </Card>
  );
};
