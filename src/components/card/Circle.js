import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet,Image} from 'react-native';
import {colors} from '../../res/appStyles';
import TextBox from '../TextBox';
import { getFirstLastUpperCase } from '../../utils/funcations';

const CircleImage = props => {
  var title =''
  const size = props.size ? props.size : 100;
  const radius =props.radius ?props.radius :size / 2
  const enable =props.onPress ?false:true
  if(props.title) 
  title =getFirstLastUpperCase(props.title)
  return (
    <TouchableOpacity 
    disabled={enable} 
    onPress={props.onPress}
      style={[
        styles.container,
        {width: size, height: size, borderRadius: radius},
         props.style 
      ]}>
      {props.image ? (
        <Image
          source={{uri:  props.image}}
          style={{
            width:size,
            height: size,
          }}
        />
        ) : <TextBox color='white' type='body3' style={{alignSelf:'center'}}>{ title}</TextBox>}
      {props.children}
    </TouchableOpacity>
  );
};

export default CircleImage;

const styles = StyleSheet.create({
  container: {
    borderColor: colors.white,
    borderWidth:1,
    elevation: 5,
    overflow:'hidden',
    shadowColor: 'grey',
    justifyContent:'center',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    backgroundColor: colors.white,
    
  },
});
