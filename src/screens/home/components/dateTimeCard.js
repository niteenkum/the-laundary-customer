import React from 'react';
import {View, FlatList} from 'react-native';
import {spacing, colors} from '../../../res/appStyles';
import Card from '../../../components/card';
import {outstyle} from '../../styles';
import TextBox from '../../../components/TextBox';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {getFullDate} from '../../../utils/funcations';

export const DateTimeCard = props => {
  const {dateSlot = [], key, loading} = props;
  return (
    <Card style={[outstyle.card2, {marginBottom: spacing(8)}]} type="list">
      <View style={outstyle.head}>
        <TextBox type="body2" style={{color: colors.tint}}>
          {props.title}
        </TextBox>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <FeatherIcon color={colors.lightGrey} name="chevron-left" size={20} />
          <TextBox type="body2">
            {loading ? '...' : getFullDate(props.renderSelected)}
          </TextBox>
          <FeatherIcon
            color={colors.lightGrey}
            name="chevron-right"
            size={20}
          />
        </View>
      </View>
      <View style={outstyle.datesCont}>{props.renderDate}</View>
      <View style={outstyle.head}>
        <TextBox type="body1" style={{color: colors.tint}}>
          {props.timeSlotTitle}
        </TextBox>
      </View>
      <View style={[outstyle.datesCont, {paddingBottom: 10}]}>
        {props.onTimeSlot}
      </View>
    </Card>
  );
};
