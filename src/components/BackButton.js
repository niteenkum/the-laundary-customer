import React from 'react'
import {TouchableOpacity} from 'react-native'
import { SvgIcon } from '../utils/Svgicons'

export const BackButton=(props)=>{
    return(<TouchableOpacity onPress={props.onBack} style={{ padding:10,marginTop:10,alignSelf:'flex-start'}}>
       <SvgIcon style={{ width: 20, height: 20 }}type='BACK'/>
      </TouchableOpacity>)
}