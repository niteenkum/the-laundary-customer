import React from 'react';
import BottomButton from './index';
import {View} from 'react-native';
import TextBox from '../TextBox';
import {colors} from '../../res/appStyles';

const BottomBasketBtn = ({
  title,
  SingleTitile,
  subTitle,
  amount,
  style,
  btnStyle = {},
  onPress,
  disabled,
  code = false,
}) => (

  (
    <BottomButton disabled={disabled} onPress={onPress} style={btnStyle}>
      {SingleTitile ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <TextBox
            type="title"
            style={{color: colors.white, textAlign: 'center'}}>
            {title}
          </TextBox>
        </View>
      ) : (
        <View
          style={[
            {flexDirection: 'row', justifyContent: 'space-between'},
            style,
          ]}>
          <View style={{height: '100%'}}>
            <TextBox type="title" style={{color: colors.white}}>
              {title}
            </TextBox>
            {subTitle ? (
              <TextBox type="caption2" style={{color: colors.white}}>
                {subTitle}
              </TextBox>
            ) : null}
          </View>
          <View style={{justifyContent: 'center'}}>
            <TextBox type="title" style={{color: colors.white}}>
              {amount}
            </TextBox>
            {code ? (
              <TextBox type="caption2" style={{color: colors.white}}>
                {code}
              </TextBox>
            ) : null}
          </View>
        </View>
      )}
    </BottomButton>
  )
);

export default BottomBasketBtn;
