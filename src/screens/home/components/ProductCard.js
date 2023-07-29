import React from 'react';
import {View, Image, Dimensions} from 'react-native';
import TextBox from '../../../components/TextBox';
import {spacing, colors} from '../../../res/appStyles';
import Card from '../../../components/card';
import QtyButton from './qty';
import {SIGN} from '../../../res/ConstVariable';
const WidthWin = Dimensions.get('screen').width / 2 - spacing(10);
export const ProductCard = props => {
  const {item = {}} = props;
  return (
    <Card
      type="list"
      style={{
        elevation: 1,
        width: WidthWin,
        margin: spacing(5),
        alignItems: 'center',
      }}>
      <Image
        resizeMode="contain"
        source={item.image ? {uri: item.image} : null}
        style={{height: WidthWin - spacing(30), width: WidthWin - spacing(30)}}
      />
      <View style={{width: '100%', marginVertical: spacing(7)}}>
         <TextBox type="body4">{item.name}</TextBox>
        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
          <TextBox type="body3">
            {SIGN}
            {item.discount_price+ "  "}
          </TextBox>
          <TextBox
            type="body2"
            style={{
              textDecorationLine: 'line-through',
              textDecorationStyle: 'solid',
              color: colors.lightGrey2,
            }}>  
            {SIGN}
            {item.original_price}{' '}
           </TextBox>
        </View>
      </View>
      <QtyButton onAddPress={props.onAddPress} item={item} />
    </Card>
  );
};

 