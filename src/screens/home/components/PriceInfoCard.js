import React from 'react';
import {View} from 'react-native';
import Card from '../../../components/card';
import TextBox from '../../../components/TextBox';
import {outstyle} from '../../styles';
import {SIGN} from '../../../res/ConstVariable';
import {colors, spacing, scales} from '../../../res/appStyles';
import { color } from 'react-native-reanimated';
export const PriceDetailCard = props => {
  const {
    LngCode = {},
    discount_value = '',
    tax_price = '',
    DiscountLessPrice = '',
    PromoCode = {},
    description = '',
    tax_percentage = '',
    min_cart_amount,
    Tprice = '',
    price=''
  } = props;
  return (
    <Card style={[outstyle.card, props.style]} type="list">
      <View style={outstyle.dateTimeRow}>
        {Tprice ? (
          <View style={{flexDirection: 'row'}}>
            <TextBox type="caption3" style={{flex: 1}}>
              {LngCode.PRICE_LABEL}
            </TextBox>
            <TextBox type="caption3"> {`${SIGN}${Tprice}`}</TextBox>
          </View>
        ) : null}
        {discount_value ? (
          <View style={{ flexDirection: 'row' }}>
            {PromoCode.promocode ?
            <TextBox type="caption3" style={{flex: 1,color:colors.tint}}>{`Promotion (${PromoCode.promocode})`}
            </TextBox>:null} 
          
            <TextBox type="caption3"> {`- ${SIGN}${discount_value}`}</TextBox>
          </View>
        ) : null}
        <View>
          <TextBox type="caption0" style={{flex: 1,color:colors.tint}}>
            {description}
          </TextBox>
        </View>

        {tax_price ? (
          <View style={{flexDirection: 'row'}}>
            <TextBox type="caption3" style={{flex: 1}}>{`Tax (GST)`}</TextBox>
            <TextBox type="caption3"> {`+ ${SIGN}${tax_price}`}</TextBox>
          </View>
        ) : null}
        {tax_price ? (
          <View
            style={{
              flexDirection: 'row',
              borderTopWidth: 1,
              borderTopColor: colors.borderGrey2,
              marginTop: spacing(5),
            }}>
            <TextBox type="body3" style={{flex: 1}}>
              {LngCode.TOTAL_PRICE}
            </TextBox>
            <TextBox type="body3">
              {' '}
              {`${SIGN}${price}`}
            </TextBox>
          </View>
        ) : null}
      </View>
    </Card>
  );
};
