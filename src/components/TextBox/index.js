import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {colors, fontSize, fonts} from '../../res/appStyles';

const TextBox = props => {
  const type = props.type ? props.type : 'normal';
  const onPress = props.onPress ? props.onPress : () => {};
  const color = props.white
    ? colors.white
    : props.color
    ? colors[props.color]
    : colors.transBlack;
  return (
    <Text
      {...props}
      onPress={props.onPress}
      style={[styles[type], {color}, props.style]}>
      {props.children}
    </Text>
  );
};

export default TextBox;

const styles = StyleSheet.create({
  normal: {},

  Button: {
    fontSize: 20,
    color: colors.red,
  },
  body1: {
    fontSize: fontSize(11),
    color: colors.darkGrey,
    fontFamily: fonts.semibold,
  },
  body2: {
    fontSize: fontSize(13),
    color: colors.darkGrey,
    fontFamily: fonts.semibold,
  },
  body3: {
    //18
    fontSize: fontSize(15),
    color: colors.darkGrey,
    fontFamily: fonts.semibold,
  },
  body4: {
    //18
    fontSize: fontSize(17),
    color: colors.darkGrey,
    fontFamily: fonts.semibold,
  },
  title: {
    fontSize: fontSize(18),
    color: colors.darkGrey,
    fontFamily: fonts.bold,
  },
  title1: {
    fontSize: fontSize(16),
    color: colors.darkGrey,
    fontFamily: fonts.bold,
  },
  title2: {
    fontSize: fontSize(20),
    color: colors.darkGrey,
    fontFamily: fonts.bold,
  },
  heading: {
    fontSize: 20,
    fontWeight: '400',
    color: colors.darkGrey,
  },
  heading2: {
    fontSize: 18,
    fontWeight: '400',
    color: colors.darkGrey,
  },
    caption0: {
    fontSize: fontSize(8),
    color: colors.darkGrey,
    fontFamily: fonts.reguler,
  },
  caption: {
    fontSize: fontSize(10),
    color: colors.darkGrey,
    fontFamily: fonts.reguler,
  },
    caption1: {
    fontSize: fontSize(12),
    color: colors.darkGrey,
    fontFamily: fonts.semibold,
  },
  caption2: {
    fontSize: fontSize(13),
    color: colors.darkGrey,
    fontFamily: fonts.reguler,
  },
  caption3: {
    fontSize: fontSize(16),
    color: colors.darkGrey,
    fontFamily: fonts.reguler,
  },
});
