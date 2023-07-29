import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../res/appStyles';

export const CloseIcon = (props) => {
    const color = props.color ? props.color : colors.white;
	return <Svg
		height="40"
		width="30"
		viewBox="0 -40 60 140"
	>
		<Path
			d="M33.596,30.011 L59.899,3.708 L56.307,0.117 L30.004,26.419 L3.592,0.007 L0.000,3.599 L26.413,30.011 L0.110,56.314 L3.701,59.906 L30.004,33.603 L56.417,60.015 L60.008,56.423 L33.596,30.011 Z"
			fill={color}
		/>
	</Svg>
}
