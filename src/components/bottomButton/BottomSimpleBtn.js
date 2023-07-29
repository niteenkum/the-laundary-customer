import React from 'react';
import {ActivityIndicator} from 'react-native';
import BottomButton from '../../../src/components/bottomButton';
import {View} from 'react-native';
import TextBox from '../TextBox';
import {colors, dimensions, scales} from '../../res/appStyles';

const {bottomButtonHeight} = dimensions;

const BottomSimpleBtn = ({
  title,
  style,
  btnStyle = {},
  disabled = false,
  onPress,
  loading = false,
}) => (
  <BottomButton
    disabled={disabled || loading}
    onPress={() => onPress()}
    style={[{backgroundColor: colors.tint}, btnStyle]}>
    <View
      style={{
        alignItems: 'center',
        height: bottomButtonHeight,
        justifyContent: 'center',
        paddingBottom: scales(20),
      }}>
      {loading ? (
        <ActivityIndicator size="small" />
      ) : (
        <TextBox type="title" white>
          {title}
        </TextBox>
      )}
    </View>
  </BottomButton>
);

export default BottomSimpleBtn;
