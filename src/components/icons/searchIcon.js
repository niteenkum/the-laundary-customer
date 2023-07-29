import React from 'react';
import {TouchableOpacity} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../../res/appStyles';

export const SearchIcon = props => {
  const color = props.color ? props.color : colors.white;
  const size = props.size ? props.size : 30;
  return (
    <TouchableOpacity disabled={props.desable} onPress={props.onPress}>
      <Svg height={`${size}`} width={`${size}`} viewBox="0 -40 60 140">
        <Path
          d="M70.310,70.313 C69.186,71.438 67.709,72.000 66.232,72.000 C64.755,72.000 63.278,71.438 62.154,70.313 C62.154,70.313 62.154,70.313 62.154,70.313 L42.129,50.288 C41.569,49.728 41.569,48.819 42.129,48.259 L44.179,46.209 L41.096,43.126 C36.731,47.015 30.982,49.382 24.690,49.382 C11.076,49.382 -0.000,38.306 -0.000,24.691 C-0.000,11.076 11.076,-0.000 24.690,-0.000 C38.304,-0.000 49.380,11.076 49.380,24.691 C49.380,30.983 47.013,36.733 43.124,41.097 L46.207,44.181 L48.257,42.131 C48.818,41.570 49.726,41.570 50.286,42.131 L70.311,62.156 C71.400,63.246 72.000,64.694 72.000,66.235 C72.000,67.775 71.400,69.224 70.310,70.313 ZM46.512,24.691 C46.512,12.658 36.723,2.869 24.690,2.869 C12.658,2.869 2.868,12.658 2.868,24.691 C2.868,36.724 12.658,46.514 24.690,46.514 C36.723,46.514 46.512,36.724 46.512,24.691 ZM68.282,64.185 L49.272,45.173 L45.172,49.273 L64.182,68.285 L64.182,68.285 C65.313,69.415 67.152,69.415 68.282,68.285 C68.830,67.737 69.131,67.009 69.131,66.235 C69.131,65.460 68.830,64.732 68.282,64.185 ZM24.690,44.075 C17.369,44.075 10.751,40.022 7.419,33.499 C7.058,32.793 7.338,31.929 8.043,31.569 C8.749,31.208 9.613,31.488 9.973,32.194 C12.813,37.753 18.453,41.207 24.690,41.207 C25.482,41.207 26.124,41.849 26.124,42.641 C26.124,43.433 25.482,44.075 24.690,44.075 ZM6.845,27.106 C6.819,27.108 6.793,27.108 6.766,27.108 C6.010,27.108 5.377,26.516 5.335,25.751 C5.316,25.401 5.307,25.044 5.307,24.691 C5.307,23.899 5.949,23.257 6.741,23.257 C7.533,23.257 8.175,23.899 8.175,24.691 C8.175,24.992 8.184,25.297 8.200,25.597 C8.242,26.388 7.636,27.064 6.845,27.106 Z"
          fill={color}
        />
      </Svg>
    </TouchableOpacity>
  );
};
