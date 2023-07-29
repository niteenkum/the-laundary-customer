import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../../res/appStyles';

export default function RightIcon({color}) {
  const fillColor = color || colors.white;
  return (
    <Svg height="15" width="15" viewBox="0 -2 20 28">
      <Path
        d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"
        fill={fillColor}
      />
    </Svg>
  );
}
