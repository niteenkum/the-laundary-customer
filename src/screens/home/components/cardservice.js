import React from 'react';
import {View, Image} from 'react-native';
import TextBox from '../../../components/TextBox';
import {SIGN} from '../../../res/ConstVariable';
import {colors, spacing, scales} from '../../../res/appStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const CartService = props => {
  const {service, product} = props.data;

  return (
    <View
      style={{
        flex: 1,
        borderBottomWidth: 0.5,
        marginHorizontal: spacing(10),
        borderBottomColor: colors.lightGrey,
        flexDirection: 'row',
        padding: spacing(10),
      }}>
      <Image
        source={{uri: product.image ? product.image : ''}}
        style={{width: spacing(50), height: spacing(50)}}
      />
      <View style={{padding: spacing(6), flex: 1, marginLeft: spacing(10)}}>
        <View style={{flexDirection: 'row'}}>
          <TextBox
            type="body3"
            style={{flex: 1, color: colors.darkGrey, marginBottom: spacing(5)}}>
            {product.name}
          </TextBox>
          <Ionicons
            onPress={props.addToCart}
            size={scales(20)}
            color={colors.grey}
            name="md-trash"
          />
        </View>
        <TextBox type="body1" color="darkGrey">
          {SIGN}
          {props.data.price} x {props.data.quantity} = {SIGN}
          {props.data.total_amount}
        </TextBox>
      </View>
    </View>
  );
};
