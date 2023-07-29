import React from 'react';
import TouchableRipple from '../TouchableRipple';
import { colors, dimensions } from '../../res/appStyles';
import { ifIphoneX } from '../../utils/isIphoneX';

const { bottomButtonHeight } = dimensions;
const BottomButton = ({style, children, onPress, disabled}) => (
    <TouchableRipple
        onPress={onPress}
        disabled={disabled}
        rippleColor	= {colors.white}
        style={[{
            backgroundColor: colors.primary,
            height: bottomButtonHeight,
            position: 'absolute',
            width: '100%',
            bottom: 0,
            paddingHorizontal: 10,
            paddingVertical: 8,
            paddingBottom: 10,
           borderColor: colors.white,
            
        }, style
        //  {
        //     ...ifIphoneX({
        //         marginBottom: style.marginBottom ? style.marginBottom + 30 : 30,
        //     },
        //     {
        //         marginBottom: style.marginBottom ? style.marginBottom : 0,
        //     }
         //   ),
    //    }
    ]}
    >
        {children}
    </TouchableRipple>
)

export default BottomButton;