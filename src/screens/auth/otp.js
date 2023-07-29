import React, {Component} from 'react';
import {View, TextInput, ScrollView, Platform, Keyboard} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import * as Yup from 'yup';
import TextBox from '../../components/TextBox';
import {InputBox} from '../../components/inputBox';
import Logo from '../../components/logo';
import {setAsyncStorage} from '../../utils/asyncStorage';
import apiService from '../../redux/services';
import {STORAGES} from '../../res/ConstVariable';
import {connect} from 'react-redux';
import {colors, fontSize, spacing} from '../../res/appStyles';
import CountryPicker from 'react-native-country-picker-modal';
import TimerBtton from './TimerButton';
import {BackButton} from '../../components/BackButton';
import AuthBackground from '../../components/background/Authbackground';
import RoundBtn from '../../components/roundBtn';
import {outstyle} from '../styles';
// import firebase from '@react-native-firebase/app';

import {
  checkEmailNumber,
  onStoreDeviceInfo,
  sendOtp,
  verifyOtp,
} from '../../redux/actions/auth.action';

const MESAGE = 'Please enter valid phone number';

const schema = Yup.object().shape({
  phone: Yup.string().test('len', MESAGE, val => val.length === 10),
  // .matches('[0-9]{7}'),
});

class Otp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autoVarificaiton: '',
      confirmResult: null,
      success: false,
      loading: false,
      loadingOtp: false,
      otpSection: false,
      phone: '',
      errorMge: '',
      errorTo: '',
      code: '',
      cca2: 'IN',
      countryCode: '91',
      time: 30,
      device_type: Platform.OS,
      device_id: '',
    };
    this.setFirbaseToken();
  }
  setFirbaseToken = async() => {
    const self = this;
    // await firebase.messaging().registerDeviceForRemoteMessages()
    await messaging()
      .getToken()
      .then(device_id => {;
        if (device_id) {
          self.setState({device_id});
        } else {
          Token = false;
          console.log('firebaseToken', 'Error');
        }
      });
  };

  componentWillReceiveProps(nextProps) {
    const self = this;
    const {
      CheckEmailSuccess,
      CheckEmailfail,
      success,
      fail,
      loading2,
      otpdata,
      failOtp,
    } = nextProps;
    const {loading, loadingOtp, otpSection} = this.state;

    if (otpdata != this.props.otpdata && otpdata && loading) {
      if (otpSection) {
        if (otpdata.status) this.setUserData(otpdata);
        else
          self.setState({loading: false, success: otpdata}, () =>
            global.Toaster('Invalid otp'),
          );
      } else {
        if (otpdata.status) {
          self.setState({loading: false, otpSection: true}, () =>
            this.onStartTime(),
          );
        } else if (!otpdata.status)
          self.setState({loading: false}, () => global.Toaster(MESAGE));
      }
    }

    if (
      CheckEmailSuccess != this.props.CheckEmailSuccess &&
      CheckEmailSuccess &&
      loadingOtp
    ) {
      console.log(otpdata, 'otpdata.data');
      self.setState({success: otpdata, loadingOtp: false}, () =>
        self.onSendOtp(),
      );
    }
    if (
      CheckEmailfail != this.props.CheckEmailfail &&
      CheckEmailfail &&
      loadingOtp
    ) {
      self.setState({loadingOtp: false, success: false}, () =>
        self.onSendOtp(),
      );
    }

    if (success != this.props.success && success.data) {
      const {CheckEmailSuccess} = this.props;
      console.log('CheckEmailSuccess', CheckEmailSuccess);
      if (CheckEmailSuccess && CheckEmailSuccess.token)
        apiService.setAuthorizationToken(CheckEmailSuccess.token);
      self.props.navigation.navigate('App');
    }

    if (fail != this.props.fail) {
      global.Toaster('device_id not found');
      // self.props.navigation.navigate('App');
    }
  }

  onSendOtp = () => {
    const {countryCode, phone, otpSection} = this.state;
    this.props.sendOtp({
      country_code: countryCode,
      phone_number: phone,
    });
  };

  setUserData = tdata => {
    const {device_id, device_type, countryCode, phone, success} = this.state;
    console.log('this.state.............', tdata);
    if (tdata && tdata.token) {
      const data = tdata ? tdata.data : {};
      const {first_name, last_name, image, id, email = '', tax} = data;
      let user = {
        id,
        // first_name,
        // last_name,
        // email,
        tax,
        phone,
        token: tdata.token,
      };
      if (image) user.image = image;
      apiService.setAuthorizationToken(tdata.token);
      setAsyncStorage(STORAGES.USER, JSON.stringify(user))
        .then(res => {
          this.props.onStoreDeviceInfo({device_type, device_id});
        })
        .catch(e => {
          this.setState({loading: false});
        });
    } else if (tdata.data) {
      const {data} = tdata;
      if (data.message) global.Toaster(data.message);
      // } else if (!success) {
      //   this.props.navigation.navigate('Register', {
      //     phone: phone,
      //     country_code: countryCode,
      //   });
      return;
    }
  };

  onVerifyOtp = () => {
    const {code, countryCode, phone, device_id} = this.state;
    // if (!device_id) {
    //   return;
    // }
    if (code.length === 4) {
      this.props.verifyOtp({
        country_code: countryCode,
        phone_number: phone,
        verification_code: code,
      });
    } else {
      this.setState({loading: false}, () =>
        global.Toaster(`Please enter 4 digits`),
      );
    }
  };
  onPressLogin = () => {
    Keyboard.dismiss();
    const {phone, code, otpSection, countryCode} = this.state;
    const fullNumber = `${countryCode}${phone}`;
    this.setState({loading: true});
    if (!otpSection) {
      schema
        .validate({phone})
        .then(res => {
          this.setState(
            {loading: true, loadingOtp: true, success: false},
            //  () =>
            // this.props.checkEmailNumber({name: phone}),
            () => this.onSendOtp(),
          );
        })
        .catch(res => {
          global.Toaster(res.message);
          this.setState({
            loading: false,
            errorTo: res.path,
            errorMge: res.message,
          });
        });
    } else this.onVerifyOtp();
  };

  onSelected = ({cca2, callingCode}) => {
    console.log('cca2', cca2, callingCode);
    this.setState({countryCode: callingCode[0], cca2});
  };

  onStartTime = () => {
    var time = 30;
    const timer = setInterval(() => {
      if (time <= 0) {
        clearInterval(timer);
        this.setState({time});
      } else
        this.setState({time}, () => {
          time--;
        });
    }, 1000);
  };

  render() {
    const {
      time = '',
      countryCode,
      phone,
      errorTo,
      errorMge,
      loading,
      code,
      otpSection,
      cca2,
    } = this.state;
    const {LngCode} = this.props;
    return (
      <AuthBackground style={{justifyContent: 'space-around'}}>
        <BackButton onBack={() => this.props.navigation.goBack()} />
        <ScrollView keyboardShouldPersistTaps={'handled'}>
          {!otpSection ? <Logo /> : null}
          <View
            style={{
              padding: spacing(20),
              marginHorizontal: spacing(15),
              backgroundColor: !otpSection ? colors.white : colors.bgGrey,
            }}>
            <View style={{width: '100%', alignItems: 'center'}}>
              <TextBox
                type="title2"
                style={{marginBottom: 30, textAlign: 'center'}}>
                {!otpSection
                  ? LngCode.MOBILE_HEADER
                  : `${LngCode.OTP_HEADER} ${phone}`}
              </TextBox>

              {!otpSection ? (
                <View style={{width: '100%'}}>
                  <View style={outstyle.phonePicker}>
                    <CountryPicker
                      withCallingCodeButton={countryCode}
                      ref={ref => (this.contrycode = ref)}
                      countryCode={cca2}
                      withFilter={true}
                      onSelect={this.onSelected}
                    />
                    <TextInput
                      keyboardType="numeric"
                      placeholder={LngCode.MOBILE_LABEL}
                      placeholderTextColor={colors.lightGrey2}
                      maxLength={10}
                      onChangeText={text =>
                        this.setState({
                          phone: text.replace(/[^0-9]/g, ''),
                        })
                      }
                      value={phone}
                      style={{
                        fontSize: fontSize(20),
                        marginLeft: spacing(15),
                        color: colors.grey,
                      }}
                    />
                  </View>
                </View>
              ) : (
                <View style={{width: '100%', alignItems: 'center'}}>
                  <InputBox
                    placeholder="OTP"
                    boxStyle={{textAlign: 'center'}}
                    inputStyle={{width: spacing(100)}}
                    errorMge={errorMge}
                    keyboardType="phone-pad"
                    error={errorTo === 'code'}
                    maxLength={6}
                    onChange={text => this.setState({code: text})}
                    isPassword={true}
                    value={code}
                  />
                </View>
              )}

              {this.state.otpSection ? (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    marginVertical: 20,
                    paddingTop: 20,
                  }}>
                  <TimerBtton
                    disabled={time > 0}
                    value={time > 0 ? time : LngCode.RESET_LABEL}
                    onPress={() => this.onSendOtp()}
                  />
                </View>
              ) : null}
            </View>

            <RoundBtn
              loading={loading}
              onPress={this.onPressLogin}
              style={{width: '80%', marginVertical: 20, alignSelf: 'center'}}
              title={otpSection ? LngCode.VERFIY_LABEL : LngCode.NEXT_LABEL}
            />
          </View>
        </ScrollView>
      </AuthBackground>
    );
  }
}

const mapStateToProps = ({UserData, LngCode}) => {
  const {
    loading,
    CheckEmailSuccess,
    CheckEmailfail,
    success,
    fail,
    loading2,
    otpdata,
    failOtp,
  } = UserData;
  console.log('UserData???????', success, otpdata);
  return {
    loading,
    CheckEmailSuccess,
    CheckEmailfail,
    success,
    fail,
    LngCode,
    otpdata,
    loading2,
    failOtp,
  };
};
export default connect(mapStateToProps, {
  onStoreDeviceInfo,
  checkEmailNumber,
  sendOtp,
  verifyOtp,
})(Otp);
