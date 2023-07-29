import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../res/appStyles';

export const MenuIcon = (props) => {
    const color = props.color ? props.color : colors.white;
	return <Svg
		height="50"
		width="50"
		viewBox="0 -40 60 140"
	>
		<Path
			d="M-0.000,6.000 L-0.000,-0.000 L72.000,-0.000 L72.000,6.000 L-0.000,6.000 ZM52.000,24.000 L-0.000,24.000 L-0.000,18.000 L52.000,18.000 L52.000,24.000 ZM32.000,42.000 L-0.000,42.000 L-0.000,36.000 L32.000,36.000 L32.000,42.000 ZM52.000,60.000 L-0.000,60.000 L-0.000,54.000 L52.000,54.000 L52.000,60.000 Z"
			fill={color}
		/>
	</Svg>
}