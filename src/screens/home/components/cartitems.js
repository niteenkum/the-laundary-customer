import React from 'react';
import {View, Image} from 'react-native';
import TextBox from '../../../components/TextBox';
import {SIGN} from '../../../res/ConstVariable';
import {colors, spacing, scales} from '../../../res/appStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const CartItem = props => {
  const {service, item} = props.data;
  
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        marginHorizontal: spacing(10),
        borderBottomColor: colors.lightGrey,
        padding: spacing(10),
      }}>
      <Image
        source={{uri: item.image}}
        style={{width: spacing(50), height: spacing(50)}}
      />
      <View style={{flex: 1, marginLeft: spacing(10)}}>
        <View style={{flexDirection: 'row'}}>
          <TextBox
            type="body3"
            style={{flex: 1, marginBottom: spacing(5), color: colors.darkGrey}}>
            {item.name} ( {item.category.name} )
          </TextBox>
          <Ionicons
            onPress={props.addToCart}
            size={scales(20)}
            color={colors.grey}
            name="md-trash"
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <TextBox
            type="body1"
            color="gery"
            style={{flex: 1, color: colors.darkGrey}}>
            {SIGN}
            {props.data.price} x {props.data.quantity} = {SIGN}
            {props.data.total_amount}
          </TextBox>
          <TextBox type="body3" color="tint">
            {service.name}
          </TextBox>
        </View>
      </View>
    </View>
  );
};
