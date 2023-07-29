import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Animated,
  SafeAreaView,
} from 'react-native';

import NetInfo from '@react-native-community/netinfo';
const HEIGHT = 20;
const Netoff = 'No Connection';
const NETON = 'Back Online';
export default class NetAlert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Msg: Netoff,
      ht: new Animated.Value(0),
      internet: true,
    };
  }
  onHide = () => {
    Animated.timing(
      // Animate over time
      this.state.ht, // The animated value to drive
      {
        toValue: 0, // Animate to opacity: 1 (opaque)
        duration: 500,
        // useNativeDriver: true, // Make it take a while
      },
    ).start();
  };
  onShow = () => {
    Animated.timing(
      // Animate over time
      this.state.ht, // The animated value to drive
      {
        toValue: HEIGHT, // Animate to opacity: 1 (opaque)
        duration: 500,
        // useNativeDriver: true, // Make it take a while
      },
    ).start();
  };
  componentWillMount() {
    NetInfo.fetch().then(state => {
      this.handleFirstConnectivityChange(state.isConnected);
    });

    const unsubscribe = NetInfo.addEventListener(state => {
      this.handleFirstConnectivityChange(state.isConnected);
    });
  }

  handleFirstConnectivityChange = isConnected => {
    global.isConnected = isConnected;
    if (isConnected)
      this.setState({internet: isConnected, Msg: NETON}, () => this.onHide());
    else
      this.setState({internet: isConnected, Msg: Netoff}, () => this.onShow());
  };

  render() {
    const {internet, Msg, ht} = this.state;
    const bgcolor = internet ? '#2bdf85' : '#ec702a';
    return (
      <Animated.View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: bgcolor,
          height: ht,
        }}>
        <Animated.Text style={{color: '#fff', opacity: ht}}>
          {Msg}
        </Animated.Text>
      </Animated.View>
    );
  }
}
