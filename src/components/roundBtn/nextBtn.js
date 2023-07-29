import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet,ActivityIndicator } from 'react-native';
import { colors } from '../../res/appStyles';
import RoundBtn from './index';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SvgIcon} from '../../utils/Svgicons'

const NextBtn = (props) => {
    const loading= props.loader?true:false;
    return (
        <RoundBtn disabled={loading} onLongPress={props.onLongPress} onPress={props.onPress} style={[styles.container, props.style]}>
          { loading
             ? <ActivityIndicator  size='small' />
             : <SvgIcon color={colors.white}/>}
        </RoundBtn>
      );
}

export default NextBtn;

const styles = StyleSheet.create({
    container: {
    
    }
})