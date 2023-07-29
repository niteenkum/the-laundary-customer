import React from 'react';
import { Image } from 'react-native';
import Svg, { Path, Text, TSpan } from 'react-native-svg';
import { colors } from '../../res/appStyles';

export const AboutUs = (props) => {
    const color = props.color ? props.color : colors.white;
  //  const image = color === '#fff' ? require('../../../assets/images/w_white.png') : require('../../../assets/images/w_tint.png')
	return <Image  style={[{height: 30, resizeMode: 'contain', marginRight: -10}, props.style]}/>
}