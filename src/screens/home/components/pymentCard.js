import React from 'react';
import {TouchableOpacity} from 'react-native';
import {outstyle} from '../../styles';
import Card from '../../../components/card';
import TextBox from '../../../components/TextBox';
import {colors, spacing} from '../../../res/appStyles';
import CheckBox from '../../../components/CheckBox/CheckBox';

const PaymentCard = props => {
  const {key, selected = {}, paymentMethods = []} = props;
  return (
    <Card style={[outstyle.card2]} type="list">
      {paymentMethods.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => props.onPress(item)} //() =>
          style={outstyle.methodRow}>
          <CheckBox
            setCheck={() => props.onPress(item)}
            check={selected.id == item.id}
          />
          <TextBox type="body2" style={{marginLeft: spacing(15), color: colors.grey}}>
            {item.title}
          </TextBox>
        </TouchableOpacity>
      ))}
    </Card>
  );
};
export default PaymentCard;
