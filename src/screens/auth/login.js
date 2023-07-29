import React, {Component} from 'react';
import {View, StyleSheet, Keyboard, Platform, ScrollView} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';

import {setAsyncStorage} from '../../utils/asyncStorage';
import apiService from '../../redux/services';

import * as Yup from 'yup';
import Logo from '../../components/logo';
import Card from '../../components/card';
import TextBox from '../../components/TextBox';
import {InputBox} from '../../components/inputBox';
import {colors, dimensions, deviceDimensions, isIos} from '../../res/appStyles';
import {STORAGES} from '../../res/ConstVariable';
import {loginUser} from '../../redux/actions/auth.action';
import {connect} from 'react-redux';
import {BackButton} from '../../components/BackButton';
import AuthBackground from '../../components/background/Authbackground';
import RoundBtn from '../../components/roundBtn';

const schema = Yup.object().shape({
  password: Yup.string().required("E 'password required"),
  email: Yup.string()
    .email("L'must be a valid email")
    .required('Email required'),
});

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingPage: false,
      email: '',
      password: '',
      errorMge: '',
      device_type: Platform.OS,
      device_id: '',
    };
    this.setFirbaseToken();
  }

  setFirbaseToken = async() => {
    const self = this;

    isIos?  await firebase.messaging().registerDeviceForRemoteMessages(): null;
    await messaging()
      .getToken()
      .then(device_id => {
        if (device_id) {
          console.log('device_id', device_id);
          self.setState({device_id});
        } else {
          Token = false;
        }
      });
  };

  componentWillReceiveProps(nextProps) {
    const {success, loading, fail, LngCode} = nextProps;
    if (success != this.props.success && this.state.loadingPage) {
      if (success.status && success.data) this.setUserData(success);
      else {
        global.Toaster(LngCode.MSG_WRONG);
        this.setState({errorTo: 'email', password: '', loadingPage: false});
      }
    }

    if (fail && this.state.loadingPage) {
      console.log('LngCode.MSG_WRONG', fail);
      if (fail.data) this.setUserData(fail.data);
      else {
        global.Toaster(LngCode.MSG_WRONG);
        this.setState({errorTo: 'error', password: '', loadingPage: false});
      }
    }
  }

  setUserData = success => {
    const {email, password} = this.state;
    const data = success ? success.data : {};
    if (success.token) {
      const {first_name, last_name, phone, image, id} = data;
      let user = {
        id,
        first_name,
        last_name,
        email,
        phone,
        token: success.token,
      };
      if (image) user.image = image;
      apiService.setAuthorizationToken(success.token);
      setAsyncStorage(STORAGES.USER, JSON.stringify(user))
        .then(res => {
          this.props.navigation.navigate('App');
        })
        .catch(e => {
          this.setState({loadingPage: false});
        });
    } else if (success.msg) {
      this.setState({
        errorTo: 'error',
        errorMge: success.msg,
        password: '',
        loadingPage: false,
      });
    }
  };

  onEmailInput = email => {
    this.setState({
      email,
    });
  };

  onPasswordInput = password => {
    this.setState({
      password,
    });
  };

  onPressLogin = () => {
    Keyboard.dismiss();
    this.setState({loadingPage: true, errorTo: ''});
    const {email, password, device_id, device_type} = this.state;

    schema
      .validate({email, password})
      .then(res => {
        var payload = {
          email,
          password,
          device_id,
          device_type,
          role: 'customer',
        };
        this.props.loginUser(payload);
      })
      .catch(res => {
        this.setState({
          loadingPage: false,
          errorTo: res.path,
          errorMge: res.message,
        });
      });
  };

  render() {
    const {email, password, errorTo, loadingPage, errorMge} = this.state;
    const {LngCode} = this.props;

    return (
      <AuthBackground>
        <BackButton onBack={() => this.props.navigation.goBack()} />
        <ScrollView keyboardShouldPersistTaps={'handled'}>
          <Logo />
          <View style={{padding: 20, flex: 1, justifyContent: 'center'}}>
            <InputBox
              errorMge={errorMge}
              error={errorTo === 'email'}
              keyboardType="email-address"
              placeholder={LngCode.EMAIL_LABEL}
              onChange={text => this.onEmailInput(text)}
              value={email}
              inputStyle={{marginBottom: 30}}
            />
            <InputBox
              errorMge={errorMge}
              error={errorTo === 'password'}
              placeholder={LngCode.PASSWORD_LABEL}
              onChange={text => this.onPasswordInput(text)}
              isPassword={true}
              inputStyle={{marginBottom: 10}}
              value={password}
            />
            {errorTo === 'error' ? (
              <TextBox
                type="caption2"
                style={{textAlign: 'center', color: colors.red}}>
                {errorMge}
              </TextBox>
            ) : null}
            <TextBox
              type="caption2"
              onPress={() => this.props.navigation.navigate('ForgetPassword')}
              style={styles.forgotPassword}>
              {LngCode.FORGET_PASS_LABEL}
            </TextBox>
            <RoundBtn
              loading={loadingPage}
              onPress={this.onPressLogin}
              style={{width: '80%', alignSelf: 'center'}}
              title={LngCode.LOGIN_LABEL}
            />
          </View>
          <TextBox style={{textAlign: 'center', margin: 15}} type="caption">
            {LngCode.NO_ACCOUNT_TXT}
            <TextBox
              type="body3"
              onPress={() => this.props.navigation.navigate('Register')}>
              &nbsp; {LngCode.REGIDTER_TXT}
            </TextBox>
          </TextBox>
        </ScrollView>
      </AuthBackground>
    );
  }
}

const mapStateToProps = ({UserData, LngCode}) => {
  const {socialLoginLoading, loading, success, fail, FcmToken} = UserData;
  return {
    loading,
    success,
    fail,
    socialLoginLoading,
    FcmToken,
    LngCode,
  };
};

export default connect(mapStateToProps, {
  loginUser,
})(Login);

const styles = StyleSheet.create({
  background: {},

  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingBottom: 20,
  },

  login: {
    width: '100%',
    paddingHorizontal: 15,
    marginTop: -50,
  },

  card: {
    minHeight: 250,
    paddingVertical: 25,
    paddingBottom: 50,
    justifyContent: 'center',
  },

  inputBox: {
    marginBottom: 5,
  },

  forgotPassword: {
    width: '80%',
    alignSelf: 'flex-end',
    paddingVertical: 5,
    textAlign: 'right',
    marginBottom: 20,
    fontWeight: '300',
    color: colors.lightGrey,
  },

  nextBtn: {
    zIndex: 999,
    position: 'absolute',
    elevation: 5,
    bottom: -dimensions.roundBtnHeight / 2,
    left: deviceDimensions.width / 2 - dimensions.roundBtnHeight / 2,
  },
});
