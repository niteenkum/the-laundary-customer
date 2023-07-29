import React, {Component} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {colors} from '../../res/appStyles';

const Card = props => {
  const style = props.type ? styles[props.type] : {};
  return (
    <TouchableOpacity
      onPress={props.onPress}
      disabled={!props.onPress}
      style={[styles.container, style, props.style]}>
      {props.children}
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    elevation: 5,
    shadowOffset: {width: 0.5, height: 0.5},
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowRadius: 10,

    padding: 15,
    backgroundColor: colors.white,
    borderRadius: 5,
  },

  list: {
    elevation: 1,
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  EMPTY: {
    elevation: 0,
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  BORDER: {
    elevation: 0,
    shadowOpacity: 0,
    shadowRadius: 0,
    borderWidth: 0.5,
    borderColor: colors.transBlack,
  },
});
