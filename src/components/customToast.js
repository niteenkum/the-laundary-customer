import React, {Component} from 'react';

import {
  StyleSheet,
  View,
  Modal,
  Text,
  Button,
  Platform,
  Animated,
  Dimensions,
} from 'react-native';
const DurationTime = 1000;
const WinWidth = Dimensions.get('window').width;
import PropTypes from 'prop-types';

export default class CustomToast extends Component {
  constructor() {
    super();

    this.animateOpacityValue = new Animated.Value(0);

    this.state = {
      ShowToast: false,
    };

    this.ToastMessage = '';
  }

  componentWillUnmount() {
    this.timerID && clearTimeout(this.timerID);
  }

  ShowToastFunction(
    message = 'Custom React Native Toast',
    duration = DurationTime,
  ) {
    this.ToastMessage = message;

    this.setState({ShowToast: true}, () => {
      Animated.timing(this.animateOpacityValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start(this.HideToastFunction(duration));
    });
  }

  HideToastFunction = duration => {
    this.timerID = setTimeout(() => {
      Animated.timing(this.animateOpacityValue, {
        toValue: 0,
        duration: 3000,
        useNativeDriver: true,
      }).start(() => {
        this.setState({ShowToast: false});
        clearTimeout(this.timerID);
      });
    }, duration);
  };

  render() {
    if (this.state.ShowToast) {
      return (
        <Animated.View
          style={[
            styles.animatedToastView,
            {
              width: WinWidth,
              opacity: this.animateOpacityValue,
              top: this.props.position == 'top' ? '10%' : '80%',
              backgroundColor: 'transparnt',
            },
          ]}>
          <View
            style={{
              padding: 10,
              backgroundColor: '#000000aa',
              borderRadius: 5,
            }}>
            <Text numberOfLines={3} style={[styles.ToastBoxInsideText]}>
              {'  '}
              {this.ToastMessage}
              {'  '}
            </Text>
          </View>
        </Animated.View>
      );
    } else {
      return null;
    }
  }
}
const styles = StyleSheet.create({
  animatedToastView: {
    paddingHorizontal: 25,
    borderRadius: 25,
    zIndex: 9999,
    position: 'absolute',
    justifyContent: 'center',
  },

  ToastBoxInsideText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '400',
    alignSelf: 'auto',
    textAlign: 'center',
  },
});
