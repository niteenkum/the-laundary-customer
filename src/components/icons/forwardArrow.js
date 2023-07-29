import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../../res/appStyles';

export default function ForwardArrow({color}) {
  const fillColor = color || colors.white;
  return (
    <Svg height="20" width="20" viewBox="0 -5 20 28">
      <Path
        d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"
        fill={fillColor}
      />
    </Svg>
  );
}
