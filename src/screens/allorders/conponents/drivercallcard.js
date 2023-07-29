import React from 'react';
import {View, Linking} from 'react-native';
import Card from '../../../components/card';
import TextBox from '../../../components/TextBox';
import {outstyle} from '../../styles';
import {SIGN} from '../../../res/ConstVariable';
import {colors, spacing} from '../../../res/appStyles';
import {onChangeDateFormate} from '../../../utils/funcations';
import CircleImage from '../../../components/card/Circle';
import Stars from '../../../components/StarRatting';
import Btn from '../../../components/roundBtn';
import PhoneIcon from '../../../res/svgs/phone';
export const DriverCallingCard = props => {
  const {driver = {}, LngCode} = props;

  const onCalling = phone => {
    Linking.openURL(`tel:${phone}`);
  };

  return (
    <Card type="list" style={[{padding: spacing(12)}, props.style]}>
      <TextBox type="body3" color="lightGrey2">
        {LngCode.LABEL_DRIVER_DETAILS} :
      </TextBox>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: spacing(10),
        }}>
        <CircleImage
          style={{backgroundColor: colors.tint}}
          image={driver.image}
          title={`${driver.first_name} ${driver.last_name}`}
          size={60}
        />
        <View style={{flex: 1, marginLeft: 15, justifyContent: 'center'}}>
          <TextBox type="body3">{`${driver.first_name} ${driver.last_name}`}</TextBox>
          <Stars size={spacing(20)} rate={driver.average_rating} />
        </View>
        <Btn onPress={() => onCalling(driver.phone)} type="ICON">
          <PhoneIcon />
        </Btn>
      </View>
    </Card>
  );
};
