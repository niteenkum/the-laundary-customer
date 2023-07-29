import React, {Component} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {colors, dimensions, fontSize, fonts, scales} from '../../res/appStyles';
import { spring } from 'react-native-reanimated';
 

const btnDimensions = dimensions.roundBtnHeight;

const RoundBtn = props => {
  const typeStyle = props.type ? styles[props.type] : styles.container;
  const textStyle = props.textStyle ?props.textStyle:{}
  return (
    <TouchableOpacity
      disabled={props.disabled || props.loading}
      onLongPress={props.onLongPress}
      onPress={props.onPress}
      style={[typeStyle, props.style]}>
      {props.loading ? (
        <ActivityIndicator color='#fff' size="small" />
      ) : props.title ? (
        <Text style={[styles.text,textStyle]}> {props.title}</Text>
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
};

export default RoundBtn;

const styles = StyleSheet.create({
  text:{color:colors.white,fontSize:fontSize(18),fontFamily:fonts.bold},
  container: {
    width: '100%',
    height: scales(45),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.tint,
    // padding: 20,
    borderRadius: btnDimensions / 2,
  },
  HEADER: {
    height: '100%',
    width: scales(30),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  ICON: {
    marginHorizontal: 5,
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: colors.tint,
    borderWidth: 1,
  },
  HEADERICON: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 10,
  },
});
