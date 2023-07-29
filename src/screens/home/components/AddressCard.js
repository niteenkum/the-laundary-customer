import React from 'react';
import {View} from 'react-native';
import TextBox from '../../../components/TextBox';
import Card from '../../../components/card';
import CheckBox from '../../../components/CheckBox/CheckBox';
import {colors, spacing} from '../../../res/appStyles';

export const AddressCard = props => {
  const {selectAddressIndex, index, item = {}} = props;
  const {
    address1 = '',
    address2 = '',
    city = '',
    landmark = '',
    // zipcode = '',
    phone,
  } = item;
  const checked = selectAddressIndex === index;
  
  return (
    <Card
      onPress={props.onChnageIndex}
      type="list"
      style={{width: '100%', flexDirection: 'row', marginBottom: spacing(2)}}>
      <TextBox
        type="body2"
        style={{
          flex: 1,
          marginRight: spacing(10),
          color: colors.darkGrey
        }}>
        {address1 ? `${address1}, ` : null}
        {address2 ? `${address2}, ` : null}
        {city ? `${city}, ` : null}
        {landmark ? `${landmark}, ` : null}
        {/* {zipcode ? `${zipcode}, ` : null} */}
        {phone ? `${phone}` : null}
      </TextBox>
      <CheckBox setCheck={props.onChnageIndex} check={checked} />
    </Card>
  );
};
