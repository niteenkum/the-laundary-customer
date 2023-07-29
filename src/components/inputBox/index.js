import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from 'react-native';
import {colors} from '../../res/appStyles';
export const InputBox = props => {
  const editable = props.editable === false ? false : true;
  const errorStyle = !props.error ? styles.inputBox : styles.errorStyle;
  const boxStyle = props.boxStyle ? props.boxStyle : {};
  return (
    <View style={props.inputStyle}>
      <TextInput
        numberOfLines={props.numberOfLines}
        multiline={props.multiline}
        style={[
          styles.commanStyle,
          boxStyle,
          errorStyle,
          {color: colors.transBlack},
        ]}
        placeholder={props.placeholder}
        onChangeText={props.onChange}
        onBlur={props.onBlur}
        autoCapitalize={props.autoCapitalize ? props.autoCapitalize : 'none'}
        value={props.value}
        maxLength={props.maxLength}
        keyboardType={
          props.keyboardType !== undefined ? props.keyboardType : 'default'
        }
        placeholderTextColor={colors.lightGrey2}
        secureTextEntry={props.isPassword}
        editable={editable}
      />
      {props.error ? (
        <Text numberOfLines={1} style={{color: colors.orange, fontSize: 10}}>
          {props.errorMge}
        </Text>
      ) : (
        <Text style={{fontSize: 10}} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  commanStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0,
    paddingBottom: 2,
    fontSize: 16,
   
    fontWeight: '300',
    paddingTop: 5,
  },
  inputBox: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.lightGrey,
  },
  errorStyle: {
    borderBottomWidth: 1,
    borderBottomColor: colors.orange,
  },
});
