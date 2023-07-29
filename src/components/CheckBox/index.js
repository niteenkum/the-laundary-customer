import React, { useState } from 'react';
 
import {StyleSheet} from 'react-native';

import {TouchableOpacity, Text} from 'react-native';
import { SvgCss } from 'react-native-svg';
import { scales, colors } from '../../res/appStyles';

export const CheckBoxRigth = (props) => {
const [active,setActive]=useState(false)
  const size = props.size ? props.size : scales(18);
  const color =props.color?props.color:colors.white
  const xml =`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
  <path id="Icon_awesome-check-square" data-name="Icon awesome-check-square" d="M14.286,18.25H1.714A1.714,1.714,0,0,1,0,16.536V3.964A1.714,1.714,0,0,1,1.714,2.25H14.286A1.714,1.714,0,0,1,16,3.964V16.536A1.714,1.714,0,0,1,14.286,18.25Zm-7.31-3.5,2.71-2.71,3.862-3.862a.571.571,0,0,0,0-.808l-.808-.808a.571.571,0,0,0-.808,0L9.143,9.348,6.571,11.919l-2.5-2.5a.571.571,0,0,0-.808,0l-.808.808a.571.571,0,0,0,0,.808s2.584,2.786,3.714,3.714.585.223.808,0Z" transform="translate(0 -2.25)" fill=${colors.primary}/>
</svg>`
  return (
    <TouchableOpacity
      style={[
        {
          width: size,
          height: size,
          borderColor:active? colors.primary :colors.grey,
          borderWidth:active?0:2
        },
        props.style,
      ]}
      onPress={()=>{
        setActive(!active)
        if(props.onPress)
        props.onPress()
      }}
   >
    {active?<SvgCss  xml={xml} width="100%" height="100%" />:null}
    </TouchableOpacity>
  );
};
export default CheckBoxRigth;
