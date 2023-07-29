import React, { Component,useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, dimensions, scales, fontSize } from '../../res/appStyles';
import TextBox from '../../components/TextBox';

const btnDimensions = dimensions.roundBtnHeight;

const TimerBtton = (props) => {
   const title =  props.value?props.value:""
   const btnstyle= props.disabled?styles.Disabled:styles.container
    return (
        <TouchableOpacity disabled={props.disabled} onLongPress={props.onLongPress} onPress={props.onPress} style={[btnstyle,props.style ]}>
          <TextBox  style={styles.btn}>{title}</TextBox>
        </TouchableOpacity>
      );
}

export default TimerBtton;

const styles = StyleSheet.create({
    container: {
        height:scales(35),
        paddingHorizontal:10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.tint,
       
        borderRadius:  20,
    },
    Disabled: {
        height:scales(35),
        width:scales(70),
        paddingHorizontal:10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.lightGrey,
       
        borderRadius:  20,
    },
    btn:{
        color:colors.white,
        fontSize:fontSize(15)
    }
})