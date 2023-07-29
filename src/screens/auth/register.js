import React, {Component} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  Keyboard,
  Text,
} from 'react-native';
import * as Yup from 'yup';
import messaging from '@react-native-firebase/messaging';
import {connect} from 'react-redux';
import {setAsyncStorage} from '../../utils/asyncStorage';
import {STORAGES} from '../../res/ConstVariable';
import apiService from '../../redux/services';
import {registerUser, checkEmailNumber} from '../../redux/actions/auth.action';
import Authbackground from '../../components/background/Authbackground';
import Logo from '../../components/logo';
import TextBox from '../../components/TextBox';
import {InputBox} from '../../components/inputBox';
import {
  dimensions,
  deviceDimensions,
  scales,
  spacing,
} from '../../res/appStyles';
import RoundBtn from '../../components/roundBtn';
import {BackButton} from '../../components/BackButton';
import CheckBox from '../../components/CheckBox';

const schemaEmail = Yup.object().shape({
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match',
  ),
  password: Yup.string().test(
    'len',
    'The password must contain exactly 6 characters',
    val => val.length >= 6,
  ),
  email: Yup.string().email().required('Email required'),

  last_name: Yup.string().required('Surname is required'),
  first_name: Yup.string().required('Name required'),
});
const schemaPhone = Yup.object().shape({
  phone: Yup.string().required('Phone number required'),
  last_name: Yup.string().required('Surname is required'),
  first_name: Yup.string().required('name is required'),
});
class Register extends Component {
  constructor(props) {
    super(props);
    var phone = '';
    var country_code = '';
    const {params} = props.navigation.state;
    if (params) {
      phone = params.phone || '6367316337';
      country_code = params.country_code || '39';
    }

    this.state = {
      check: false,
      loading: false,
      loading2: false,
      keyboardShow: false,
      first_name: '',
      last_name: '',
      phone,
      email: '',
      passwordConfirmation: '',
      password: '',
      errorTo: '',
      errorMge: '',
      device_type: Platform.OS,
      device_id: '',
      acountCreate: false,
      country_code,
    };
    this.setFirbaseToken();
  }

  setFirbaseToken = () => {
    const self = this;
    messaging()
      .getToken()
      .then(device_id => {
        if (device_id) {
          self.setState({device_id});
        } else {
          console.log('firebaseToken', 'Error');
        }
      });
  };

  componentWillReceiveProps(nextProps) {
    const {
      success,
      fail,
      CheckEmailSuccess,
      CheckEmailfail,
      LngCode,
    } = nextProps;

    const {
      first_name,
      last_name,
      phone,
      email,
      password,
      device_id,
      device_type,
      loading,
      loading2,
      country_code,
    } = this.state;

    if (CheckEmailSuccess != this.props.CheckEmailSuccess && loading) {
      if (phone)
        this.setState({
          errorTo: 'phone',
          errorMge: LngCode.ERR_PHONE_EXIST,
          loading: false,
        });
      else
        this.setState({
          errorTo: 'email',
          errorMge: LngCode.ERR_EMAIL_EXIST,
          loading: false,
        });
    }
    if (CheckEmailfail != this.props.CheckEmailfail && loading) {
      this.setState({loading2: true, loading: false}, () => {
        if (phone)
          this.props.registerUser({
            first_name,
            last_name,
            country_code,
            phone: phone.trim(),
            device_id,
            device_type,
            role: 'customer',
          });
        else
          this.props.registerUser({
            first_name,
            last_name,
            email,
            password,
            device_id,
            device_type,
            role: 'customer',
          });
      });
    }
    if (success && success != this.props.success && loading2) {
      this.setState({loading2: false}, () => this.setUserData(success));
    } else if (fail != this.props.fail && loading2) {
      this.setState(
        {
          errorTo: 'email',
          email: '',
          password: '',
          passwordConfirmation: '',
          loading2: false,
        },
        () => global.Toaster(LngCode.ERR_FAIL_REG),
      );
    }
  }

  setUserData = success => {
    const self = this;
    const {LngCode} = self.props;
    const data = success ? success.data : {};
    console.log('data', data);

    if (success.token) {
      const {id} = data;
      const {first_name, last_name, phone, email} = this.state;
      const user = {
        id,
        first_name,
        last_name,
        email,
        phone,
        token: success.token,
        errorTo: '',
      };
      if (!phone) {
        self.setState(
          {
            check: false,
            loading: false,
            keyboardShow: false,
            first_name: '',
            last_name: '',
            phone,
            email: '',
            password: '',
            passwordConfirmation: '',
            errorTo: '',
            errorMge: '',
            device_type: Platform.OS,
            device_id: '',
          },
          () => global.Toaster(LngCode.MSG_CHECK_YOUR_MAIL),
        );
      } else {
        apiService.setAuthorizationToken(user.token);
        setAsyncStorage(STORAGES.USER, JSON.stringify(user))
          .then(res => {
            self.props.navigation.navigate('App');
          })
          .catch(e => {
            console.log('localst', e);
            self.setState({loading: false});
          });
      }
    } else global.Toaster(LngCode.MSG_WRONG);
  };

  onUserFirstNameInput = first_name => {
    this.setState({
      first_name,
    });
  };
  onUserLastNameInput = last_name => {
    this.setState({
      last_name,
    });
  };
  onPhoneInput = phone => {
    this.setState({
      phone,
    });
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
  onRegister = () => {
    const {LngCode} = this.props;
    Keyboard.dismiss();
    this.setState({loading: true, errorTo: ''});

    const {
      check,
      first_name,
      last_name,
      phone,
      email,
      password,
      passwordConfirmation,
    } = this.state;

    if (phone) {
      schemaPhone
        .validate({first_name, last_name, phone})
        .then(res => {
          if (!check) global.Toaster(LngCode.MSG_CHECK_TERM);
          else this.props.checkEmailNumber({name: phone.trim()});
        })
        .catch(res => {
          this.setState({
            loading: false,
            errorTo: res.path,
            errorMge: res.message,
          });
        });
    } else {
      schemaEmail
        .validate({
          first_name,
          last_name,
          email,
          password,
          passwordConfirmation,
        })
        .then(res => {
          // if (!check) global.Toaster(LngCode.MSG_CHECK_TERM);
          this.props.checkEmailNumber({name: email});
        })
        .catch(res => {
          this.setState({
            loading: false,
            errorTo: res.path,
            errorMge: res.message,
          });
        });
    }
  };

  onWebScreen = headerName => {
    this.props.navigation.navigate('webscreen', {headerName});
  };
  render() {
    const {
      loading,

      first_name,
      last_name,
      phone,
      email,
      password,
      errorTo,
      errorMge,
      check,
      passwordConfirmation,
      country_code,
    } = this.state;
    const {LngCode} = this.props;
    return (
      <Authbackground>
        <BackButton onBack={() => this.props.navigation.goBack()} />
        <ScrollView
          keyboardShouldPersistTaps={'handled'}
          showsVerticalScrollIndicator={false}
          style={{paddingBottom: 30, paddingHorizontal: 20}}>
          <Logo />
          <InputBox
            autoCapitalize="sentences"
            errorMge={errorMge}
            error={errorTo === 'first_name'}
            placeholder={LngCode.FIRST_LABEL}
            onChange={text => this.onUserFirstNameInput(text)}
            value={first_name}
            inputStyle={styles.inputBox}
          />
          <InputBox
            errorMge={errorMge}
            autoCapitalize="sentences"
            error={errorTo === 'last_name'}
            placeholder={LngCode.LAST_LABEL}
            onChange={text => this.onUserLastNameInput(text)}
            value={last_name}
            inputStyle={styles.inputBox}
          />
          {phone ? (
            <View>
              <InputBox
                editable={false}
                errorMge={errorMge}
                error={errorTo === 'phone'}
                keyboardType="numeric"
                placeholder={LngCode.MOBILE_LABEL}
                onChange={text => this.onPhoneInput(text)}
                value={phone}
                inputStyle={styles.inputBox}
              />
            </View>
          ) : (
            <View>
              <InputBox
                errorMge={errorMge}
                error={errorTo === 'email'}
                keyboardType="email-address"
                placeholder={LngCode.EMAIL_LABEL}
                onChange={text => this.onEmailInput(text)}
                value={email}
                inputStyle={styles.inputBox}
              />
              <InputBox
                errorMge={errorMge}
                error={errorTo === 'password'}
                placeholder={LngCode.PASSWORD_LABEL}
                onChange={text => this.onPasswordInput(text)}
                isPassword={true}
                inputStyle={styles.inputBox}
                value={password}
              />
              <InputBox
                errorMge={errorMge}
                error={errorTo === 'passwordConfirmation'}
                placeholder={LngCode.CONFIRM_PASS_LABEL}
                onChange={text => this.setState({passwordConfirmation: text})}
                isPassword={true}
                value={passwordConfirmation}
              />
            </View>
          )}
          {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
            }}>
            <CheckBox
              onPress={() => this.setState({check: !check})}
              selected={check}
              size={scales(20)}
            />

            <Text
              style={{flex: 1, marginLeft: spacing(5), fontSize: scales(12)}}>
              {' '}
              {LngCode.AGREE_SERVICE_LABEL}{' '}
              <Text
                style={{fontWeight: 'bold'}}
                onPress={() =>
                  this.onWebScreen({id: 2, name: LngCode.TERM_SERVICE_LABEL})
                }>
                {LngCode.TERM_SERVICE_LABEL}
              </Text>{' '}
              {LngCode.AND_LABEL}{' '}
              <Text
                style={{fontWeight: 'bold'}}
                onPress={() =>
                  this.onWebScreen({id: 1, name: LngCode.PRIVACY_LABEL})
                }>
                {LngCode.PRIVACY_LABEL}
              </Text>
            </Text>
          </View> */}
        </ScrollView>

        <RoundBtn
          title={LngCode.SIGNUP_LABEL}
          loaging={loading}
          style={styles.nextBtn}
          onPress={() => this.onRegister()}
        />

        <TextBox style={{textAlign: 'center', margin: 15}} type="caption2">
          {LngCode.ALREADY_ACCOUNT}
          <TextBox
            type="caption2"
            onPress={() => this.props.navigation.navigate('Login')}
            style={styles.registerTxt}>
            {' '}
            {LngCode.LOGIN_LABEL}
          </TextBox>
        </TextBox>
      </Authbackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {},

  container: {
    flex: 1,
    justifyContent: 'space-between',
  },

  logo: {
    padding: 10,
  },

  login: {
    width: '100%',
    paddingHorizontal: 15,
    flex: 1,
    marginBottom: 30,
    // marginTop: -120
  },

  card: {
    width: '100%',
    paddingVertical: 25,
    paddingBottom: 50,
  },

  inputBox: {
    marginBottom: 20,
  },

  nextBtnCont: {
    position: 'absolute',
    bottom: -dimensions.roundBtnHeight / 2,
    left: deviceDimensions.width / 2 - dimensions.roundBtnHeight / 2,
  },
  nextBtn: {
    width: '80%',
    marginVertical: 10,
    alignSelf: 'center',
  },

  registerTxt: {
    fontWeight: 'bold',
  },
});

const mapStateToProps = ({UserData, LngCode}) => {
  console.log('Register UserData ', UserData);
  const {loading, success, fail, CheckEmailSuccess, CheckEmailfail} = UserData;
  return {
    loading,
    success,
    fail,
    CheckEmailSuccess,
    CheckEmailfail,
    LngCode,
  };
};

export default connect(mapStateToProps, {
  checkEmailNumber,
  registerUser,
})(Register);
