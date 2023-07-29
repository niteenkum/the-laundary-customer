import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {STORAGES} from '../res/ConstVariable';
import Logo from '../components/logo';
import AsyncStorage from '@react-native-community/async-storage';
import apiService from '../redux/services';
import TextBox from '../components/TextBox';
import messaging from '@react-native-firebase/messaging';
import {setUserProfile} from '../redux/actions/auth.action';
import {connect} from 'react-redux';
class AuthStatus extends Component {
  onNotification = notification => {
    if (!notification) this.props.navigation.navigate('App');
    else {
      const {type, order_id} = notification._data;
      if (type === 'order')
        this.props.navigation.navigate('OrderDetail', {OrderId: order_id});
      else if (type === 'promotion') this.props.navigation.navigate('Offers');
      else this.props.navigation.navigate('App');
    }
  };

  onClickNotification = async () => {
    var notificationOpen = await messaging().getInitialNotification();
    if (notificationOpen) {
      const {notification} = notificationOpen;
      this.onNotification(notification);
    } else this.props.navigation.navigate('App');
  };

  async componentDidMount() {
    this.removeNotificationOpenedListener = messaging().onNotificationOpenedApp(
      notificationOpen => {
        this.onNotification(notificationOpen.notification);
      },
    );
    const value = await AsyncStorage.getItem(STORAGES.USER);
    const User = JSON.parse(value);
    if (User && User.token) {
      apiService.setAuthorizationToken(User.token);
      this.props.setUserProfile(User);
    }
    value ? this.onClickNotification() : this.onCheckFirstTime();
  }

  onCheckFirstTime = async () => {
    const val = await AsyncStorage.getItem(STORAGES.FIRST_TIME);
    if (val) this.props.navigation.navigate('Auth');
    else this.props.navigation.navigate('Onboarding');
  };

  componentWillUnmount() {
    // this.removeNotificationOpenedListener  ;
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <Logo /> */}
        <TextBox>Loading...</TextBox>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingTop: dimensions.statusBar,
  },
});

const mapStateToProps = ({}) => {
  return {};
};

export default connect(mapStateToProps, {setUserProfile})(AuthStatus);
