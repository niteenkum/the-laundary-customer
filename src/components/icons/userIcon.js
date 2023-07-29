import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../../res/appStyles';

export default function UserIcon({color}) {
  const fillColor = color || colors.white;
  return (
    <Svg height="55" width="55" viewBox="0 -2 24 28">
      <Path
        d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"
        fill={fillColor}
      />
    </Svg>
  );
}
