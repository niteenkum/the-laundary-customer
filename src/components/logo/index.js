import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import {scales, spacing} from '../../res/appStyles';
const WinHeigth = Dimensions.get('window').width / 1.5;

class Logo extends Component {
  render() {
    const {Style = {}, logoStyle = {}} = this.props;
    return (
      <View style={[styles.logoCont, Style]}>
        <Image
          resizeMode="contain"
          style={[styles.logoName, logoStyle]}
          source={require('../../../assets/images/logo.png')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logoCont: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    height: WinHeigth,
    width: WinHeigth,
  },
  logoName: {
    height: WinHeigth - spacing(50),
    width: WinHeigth,
  },
});

export default Logo;
